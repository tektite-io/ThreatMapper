/* tslint:disable */
/* eslint-disable */
/**
 * Deepfence ThreatMapper
 * Deepfence Runtime API provides programmatic control over Deepfence microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.
 *
 * The version of the OpenAPI document: v2.5.3
 * Contact: community@deepfence.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ApiDocsFailureResponse
 */
export interface ApiDocsFailureResponse {
    /**
     * 
     * @type {string}
     * @memberof ApiDocsFailureResponse
     */
    message?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ApiDocsFailureResponse
     */
    success?: boolean;
}

/**
 * Check if a given object implements the ApiDocsFailureResponse interface.
 */
export function instanceOfApiDocsFailureResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ApiDocsFailureResponseFromJSON(json: any): ApiDocsFailureResponse {
    return ApiDocsFailureResponseFromJSONTyped(json, false);
}

export function ApiDocsFailureResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiDocsFailureResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': !exists(json, 'message') ? undefined : json['message'],
        'success': !exists(json, 'success') ? undefined : json['success'],
    };
}

export function ApiDocsFailureResponseToJSON(value?: ApiDocsFailureResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
        'success': value.success,
    };
}

