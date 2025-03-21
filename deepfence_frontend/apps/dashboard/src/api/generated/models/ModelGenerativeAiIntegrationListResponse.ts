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
 * @interface ModelGenerativeAiIntegrationListResponse
 */
export interface ModelGenerativeAiIntegrationListResponse {
    /**
     * 
     * @type {boolean}
     * @memberof ModelGenerativeAiIntegrationListResponse
     */
    default_integration?: boolean;
    /**
     * 
     * @type {number}
     * @memberof ModelGenerativeAiIntegrationListResponse
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ModelGenerativeAiIntegrationListResponse
     */
    integration_type?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelGenerativeAiIntegrationListResponse
     */
    label?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelGenerativeAiIntegrationListResponse
     */
    last_error_msg?: string;
}

/**
 * Check if a given object implements the ModelGenerativeAiIntegrationListResponse interface.
 */
export function instanceOfModelGenerativeAiIntegrationListResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ModelGenerativeAiIntegrationListResponseFromJSON(json: any): ModelGenerativeAiIntegrationListResponse {
    return ModelGenerativeAiIntegrationListResponseFromJSONTyped(json, false);
}

export function ModelGenerativeAiIntegrationListResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelGenerativeAiIntegrationListResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'default_integration': !exists(json, 'default_integration') ? undefined : json['default_integration'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'integration_type': !exists(json, 'integration_type') ? undefined : json['integration_type'],
        'label': !exists(json, 'label') ? undefined : json['label'],
        'last_error_msg': !exists(json, 'last_error_msg') ? undefined : json['last_error_msg'],
    };
}

export function ModelGenerativeAiIntegrationListResponseToJSON(value?: ModelGenerativeAiIntegrationListResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'default_integration': value.default_integration,
        'id': value.id,
        'integration_type': value.integration_type,
        'label': value.label,
        'last_error_msg': value.last_error_msg,
    };
}

