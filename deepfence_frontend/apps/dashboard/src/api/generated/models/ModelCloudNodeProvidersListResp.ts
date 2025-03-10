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
import type { ModelPostureProvider } from './ModelPostureProvider';
import {
    ModelPostureProviderFromJSON,
    ModelPostureProviderFromJSONTyped,
    ModelPostureProviderToJSON,
} from './ModelPostureProvider';

/**
 * 
 * @export
 * @interface ModelCloudNodeProvidersListResp
 */
export interface ModelCloudNodeProvidersListResp {
    /**
     * 
     * @type {Array<ModelPostureProvider>}
     * @memberof ModelCloudNodeProvidersListResp
     */
    providers: Array<ModelPostureProvider> | null;
}

/**
 * Check if a given object implements the ModelCloudNodeProvidersListResp interface.
 */
export function instanceOfModelCloudNodeProvidersListResp(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "providers" in value;

    return isInstance;
}

export function ModelCloudNodeProvidersListRespFromJSON(json: any): ModelCloudNodeProvidersListResp {
    return ModelCloudNodeProvidersListRespFromJSONTyped(json, false);
}

export function ModelCloudNodeProvidersListRespFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelCloudNodeProvidersListResp {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'providers': (json['providers'] === null ? null : (json['providers'] as Array<any>).map(ModelPostureProviderFromJSON)),
    };
}

export function ModelCloudNodeProvidersListRespToJSON(value?: ModelCloudNodeProvidersListResp | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'providers': (value.providers === null ? null : (value.providers as Array<any>).map(ModelPostureProviderToJSON)),
    };
}

