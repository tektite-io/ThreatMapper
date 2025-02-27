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
import type { ModelCloudNodeAccountInfo } from './ModelCloudNodeAccountInfo';
import {
    ModelCloudNodeAccountInfoFromJSON,
    ModelCloudNodeAccountInfoFromJSONTyped,
    ModelCloudNodeAccountInfoToJSON,
} from './ModelCloudNodeAccountInfo';

/**
 * 
 * @export
 * @interface ModelCloudNodeAccountsListResp
 */
export interface ModelCloudNodeAccountsListResp {
    /**
     * 
     * @type {Array<ModelCloudNodeAccountInfo>}
     * @memberof ModelCloudNodeAccountsListResp
     */
    cloud_node_accounts_info: Array<ModelCloudNodeAccountInfo> | null;
    /**
     * 
     * @type {number}
     * @memberof ModelCloudNodeAccountsListResp
     */
    total: number;
}

/**
 * Check if a given object implements the ModelCloudNodeAccountsListResp interface.
 */
export function instanceOfModelCloudNodeAccountsListResp(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "cloud_node_accounts_info" in value;
    isInstance = isInstance && "total" in value;

    return isInstance;
}

export function ModelCloudNodeAccountsListRespFromJSON(json: any): ModelCloudNodeAccountsListResp {
    return ModelCloudNodeAccountsListRespFromJSONTyped(json, false);
}

export function ModelCloudNodeAccountsListRespFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelCloudNodeAccountsListResp {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cloud_node_accounts_info': (json['cloud_node_accounts_info'] === null ? null : (json['cloud_node_accounts_info'] as Array<any>).map(ModelCloudNodeAccountInfoFromJSON)),
        'total': json['total'],
    };
}

export function ModelCloudNodeAccountsListRespToJSON(value?: ModelCloudNodeAccountsListResp | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cloud_node_accounts_info': (value.cloud_node_accounts_info === null ? null : (value.cloud_node_accounts_info as Array<any>).map(ModelCloudNodeAccountInfoToJSON)),
        'total': value.total,
    };
}

