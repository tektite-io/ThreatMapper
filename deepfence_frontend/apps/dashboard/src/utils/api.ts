import { redirect } from 'react-router-dom';

import { getAuthenticationApiClient } from '@/api/api';
import { ModelResponseAccessToken, ResponseError } from '@/api/generated';
import storage from '@/utils/storage';
import { sleep } from '@/utils/timers';

export class ApiError<T> {
  private _value: T;
  constructor(value: T) {
    this._value = value;
  }
  set(value: T): ApiError<T> {
    this._value = value;
    return this;
  }
  value() {
    return this._value;
  }
  static isApiError<T>(error: unknown): error is ApiError<T> {
    return error instanceof ApiError;
  }
}

type GenericPromiseFunction<T> = (...args: any[]) => Promise<T>;
interface MakeRequestOptions<F, V> {
  apiFunction: F extends GenericPromiseFunction<any> ? F : never;
  apiArgs: F extends GenericPromiseFunction<any> ? Parameters<F> : never;
  // Only handle errors for specific error codes
  errorHandler?: (resp: Response) => ApiError<V> | Promise<ApiError<V> | void> | void;
}

export const isResponse = (response: unknown): response is Response => {
  return response instanceof Response;
};

export const isResponseError = (
  responseError: unknown,
): responseError is ResponseError => {
  return responseError instanceof ResponseError;
};

// makeRequest is a wrapper for the api functions generated by
// openapi codegen.
export async function makeRequest<F, V = void>(
  options: MakeRequestOptions<F, V>,
): Promise<(F extends GenericPromiseFunction<infer U> ? U : never) | ApiError<V>> {
  try {
    const response = await options.apiFunction(...options.apiArgs);
    return response;
  } catch (e: unknown) {
    if (isResponseError(e) && options.errorHandler) {
      const errorHandlerResponse = await options.errorHandler(e.response);
      if (errorHandlerResponse) return errorHandlerResponse;
    }
    if (isResponseError(e) && e.response.status === 401) {
      if (await refreshAccessTokenIfPossible()) return makeRequest(options);
    }
    console.error(e);
    throw e;
  }
}

// global promise object
let refreshTokenPromise: Promise<ModelResponseAccessToken> | null = null;

async function refreshAccessTokenIfPossible(): Promise<boolean> {
  function cleanup() {
    refreshTokenPromise = null;
  }
  const auth = storage.getAuth();
  if (!auth?.refreshToken?.length) {
    storage.clearAuth();
    throw redirectToLogin();
  }
  try {
    if (!refreshTokenPromise) {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${auth.refreshToken}`);
      refreshTokenPromise = getAuthenticationApiClient().refreshAccessToken({
        headers,
      });
    }
    const response = await refreshTokenPromise;
    if (response.access_token && response.refresh_token) {
      storage.setAuth({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      });
    } else {
      throw new Error('Failed to refresh access token');
    }
  } catch (e: unknown) {
    if (isResponseError(e) && e.response.status === 401) {
      storage.clearAuth();
      cleanup();
      throw redirectToLogin();
    }
    console.error('Unknown error while refreshing accessToken');
    console.error(e);
  }
  cleanup();
  return true;
}

export function redirectToLogin() {
  const searchParams = new URLSearchParams();
  const url = new URL(window.location.href);
  searchParams.append('redirectTo', `${url.pathname}${url.search}`);
  return redirect(`/auth/login?${searchParams.toString()}`);
}

export async function requireLogin() {
  const auth = storage.getAuth();
  if (auth) return;
  storage.clearAuth();
  throw redirectToLogin();
}

export function validateRedirectToUrl(redirectTo: string) {
  if (!redirectTo) return true;
  if (!redirectTo.startsWith('/')) return false;
  return true;
}

type Result<T, E> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: E;
    };

type Func<T extends any[], R> = (...a: T) => R;

export function apiWrapper<F extends Func<any[], any>>({
  fn,
  options,
}: {
  fn: F;
  options?: {
    handleAuthError?: boolean;
  };
}): Func<Parameters<F>, Promise<Result<Awaited<ReturnType<F>>, ResponseError>>> {
  return async (...args: Parameters<F>) => {
    try {
      const value = await fn(...args);
      return { ok: true, value: value };
    } catch (error) {
      if (isResponseError(error)) {
        if (error.response.status === 401 && options?.handleAuthError !== false) {
          if (await refreshAccessTokenIfPossible()) {
            return apiWrapper({ fn, options })(...args);
          }
        }
        return { ok: false, error };
      }

      console.error(`unknown error while calling ${fn.name}`);
      console.error(error);
      throw error;
    }
  };
}

export const retryUntilResponseHasValue = async <F extends Func<any[], any>>(
  fn: F,
  fnParams: Parameters<F>,
  checkResponseHasValue: (response: Awaited<ReturnType<F>>) => Promise<boolean>,
): Promise<ReturnType<F>> => {
  const response = await fn(...fnParams);
  const isPresent = await checkResponseHasValue(response);
  if (!isPresent) {
    await sleep(3000);
    return retryUntilResponseHasValue(fn, fnParams, checkResponseHasValue);
  }
  return response;
};