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
 * @interface GraphIndividualThreatGraph
 */
export interface GraphIndividualThreatGraph {
    /**
     * 
     * @type {Array<Array<string>>}
     * @memberof GraphIndividualThreatGraph
     */
    attack_path?: Array<Array<string>> | null;
    /**
     * 
     * @type {string}
     * @memberof GraphIndividualThreatGraph
     */
    cve_attack_vector?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof GraphIndividualThreatGraph
     */
    cve_id?: Array<string> | null;
    /**
     * 
     * @type {Array<any>}
     * @memberof GraphIndividualThreatGraph
     */
    ports?: Array<any> | null;
}

/**
 * Check if a given object implements the GraphIndividualThreatGraph interface.
 */
export function instanceOfGraphIndividualThreatGraph(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GraphIndividualThreatGraphFromJSON(json: any): GraphIndividualThreatGraph {
    return GraphIndividualThreatGraphFromJSONTyped(json, false);
}

export function GraphIndividualThreatGraphFromJSONTyped(json: any, ignoreDiscriminator: boolean): GraphIndividualThreatGraph {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'attack_path': !exists(json, 'attack_path') ? undefined : json['attack_path'],
        'cve_attack_vector': !exists(json, 'cve_attack_vector') ? undefined : json['cve_attack_vector'],
        'cve_id': !exists(json, 'cve_id') ? undefined : json['cve_id'],
        'ports': !exists(json, 'ports') ? undefined : json['ports'],
    };
}

export function GraphIndividualThreatGraphToJSON(value?: GraphIndividualThreatGraph | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'attack_path': value.attack_path,
        'cve_attack_vector': value.cve_attack_vector,
        'cve_id': value.cve_id,
        'ports': value.ports,
    };
}

