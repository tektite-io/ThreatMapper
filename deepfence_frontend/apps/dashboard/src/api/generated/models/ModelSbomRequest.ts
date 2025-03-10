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
 * @interface ModelSbomRequest
 */
export interface ModelSbomRequest {
    /**
     * 
     * @type {string}
     * @memberof ModelSbomRequest
     */
    scan_id: string;
}

/**
 * Check if a given object implements the ModelSbomRequest interface.
 */
export function instanceOfModelSbomRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "scan_id" in value;

    return isInstance;
}

export function ModelSbomRequestFromJSON(json: any): ModelSbomRequest {
    return ModelSbomRequestFromJSONTyped(json, false);
}

export function ModelSbomRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelSbomRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'scan_id': json['scan_id'],
    };
}

export function ModelSbomRequestToJSON(value?: ModelSbomRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'scan_id': value.scan_id,
    };
}

