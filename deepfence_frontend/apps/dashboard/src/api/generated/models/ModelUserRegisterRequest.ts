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
 * @interface ModelUserRegisterRequest
 */
export interface ModelUserRegisterRequest {
    /**
     * 
     * @type {string}
     * @memberof ModelUserRegisterRequest
     */
    company: string;
    /**
     * 
     * @type {string}
     * @memberof ModelUserRegisterRequest
     */
    console_url: string;
    /**
     * 
     * @type {string}
     * @memberof ModelUserRegisterRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof ModelUserRegisterRequest
     */
    first_name: string;
    /**
     * 
     * @type {boolean}
     * @memberof ModelUserRegisterRequest
     */
    is_temporary_password?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ModelUserRegisterRequest
     */
    last_name: string;
    /**
     * 
     * @type {string}
     * @memberof ModelUserRegisterRequest
     */
    password: string;
}

/**
 * Check if a given object implements the ModelUserRegisterRequest interface.
 */
export function instanceOfModelUserRegisterRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "company" in value;
    isInstance = isInstance && "console_url" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "first_name" in value;
    isInstance = isInstance && "last_name" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function ModelUserRegisterRequestFromJSON(json: any): ModelUserRegisterRequest {
    return ModelUserRegisterRequestFromJSONTyped(json, false);
}

export function ModelUserRegisterRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelUserRegisterRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'company': json['company'],
        'console_url': json['console_url'],
        'email': json['email'],
        'first_name': json['first_name'],
        'is_temporary_password': !exists(json, 'is_temporary_password') ? undefined : json['is_temporary_password'],
        'last_name': json['last_name'],
        'password': json['password'],
    };
}

export function ModelUserRegisterRequestToJSON(value?: ModelUserRegisterRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'company': value.company,
        'console_url': value.console_url,
        'email': value.email,
        'first_name': value.first_name,
        'is_temporary_password': value.is_temporary_password,
        'last_name': value.last_name,
        'password': value.password,
    };
}

