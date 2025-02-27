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
 * @interface GraphNodeInfo
 */
export interface GraphNodeInfo {
    /**
     * 
     * @type {number}
     * @memberof GraphNodeInfo
     */
    cloud_compliance_count: number;
    /**
     * 
     * @type {number}
     * @memberof GraphNodeInfo
     */
    cloud_warn_alarm_count: number;
    /**
     * 
     * @type {number}
     * @memberof GraphNodeInfo
     */
    compliance_count: number;
    /**
     * 
     * @type {number}
     * @memberof GraphNodeInfo
     */
    exploitable_secrets_count: number;
    /**
     * 
     * @type {number}
     * @memberof GraphNodeInfo
     */
    exploitable_vulnerabilities_count: number;
    /**
     * 
     * @type {string}
     * @memberof GraphNodeInfo
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof GraphNodeInfo
     */
    node_id: string;
    /**
     * 
     * @type {number}
     * @memberof GraphNodeInfo
     */
    secrets_count: number;
    /**
     * 
     * @type {number}
     * @memberof GraphNodeInfo
     */
    vulnerability_count: number;
    /**
     * 
     * @type {number}
     * @memberof GraphNodeInfo
     */
    warn_alarm_count: number;
}

/**
 * Check if a given object implements the GraphNodeInfo interface.
 */
export function instanceOfGraphNodeInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "cloud_compliance_count" in value;
    isInstance = isInstance && "cloud_warn_alarm_count" in value;
    isInstance = isInstance && "compliance_count" in value;
    isInstance = isInstance && "exploitable_secrets_count" in value;
    isInstance = isInstance && "exploitable_vulnerabilities_count" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "node_id" in value;
    isInstance = isInstance && "secrets_count" in value;
    isInstance = isInstance && "vulnerability_count" in value;
    isInstance = isInstance && "warn_alarm_count" in value;

    return isInstance;
}

export function GraphNodeInfoFromJSON(json: any): GraphNodeInfo {
    return GraphNodeInfoFromJSONTyped(json, false);
}

export function GraphNodeInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): GraphNodeInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cloud_compliance_count': json['cloud_compliance_count'],
        'cloud_warn_alarm_count': json['cloud_warn_alarm_count'],
        'compliance_count': json['compliance_count'],
        'exploitable_secrets_count': json['exploitable_secrets_count'],
        'exploitable_vulnerabilities_count': json['exploitable_vulnerabilities_count'],
        'name': json['name'],
        'node_id': json['node_id'],
        'secrets_count': json['secrets_count'],
        'vulnerability_count': json['vulnerability_count'],
        'warn_alarm_count': json['warn_alarm_count'],
    };
}

export function GraphNodeInfoToJSON(value?: GraphNodeInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cloud_compliance_count': value.cloud_compliance_count,
        'cloud_warn_alarm_count': value.cloud_warn_alarm_count,
        'compliance_count': value.compliance_count,
        'exploitable_secrets_count': value.exploitable_secrets_count,
        'exploitable_vulnerabilities_count': value.exploitable_vulnerabilities_count,
        'name': value.name,
        'node_id': value.node_id,
        'secrets_count': value.secrets_count,
        'vulnerability_count': value.vulnerability_count,
        'warn_alarm_count': value.warn_alarm_count,
    };
}

