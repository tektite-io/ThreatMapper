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
import type { DetailedConnectionSummary } from './DetailedConnectionSummary';
import {
    DetailedConnectionSummaryFromJSON,
    DetailedConnectionSummaryFromJSONTyped,
    DetailedConnectionSummaryToJSON,
} from './DetailedConnectionSummary';
import type { DetailedNodeSummary } from './DetailedNodeSummary';
import {
    DetailedNodeSummaryFromJSON,
    DetailedNodeSummaryFromJSONTyped,
    DetailedNodeSummaryToJSON,
} from './DetailedNodeSummary';

/**
 * 
 * @export
 * @interface ModelGraphResult
 */
export interface ModelGraphResult {
    /**
     * 
     * @type {{ [key: string]: DetailedConnectionSummary; }}
     * @memberof ModelGraphResult
     */
    edges: { [key: string]: DetailedConnectionSummary; };
    /**
     * 
     * @type {{ [key: string]: DetailedNodeSummary; }}
     * @memberof ModelGraphResult
     */
    nodes: { [key: string]: DetailedNodeSummary; };
}

/**
 * Check if a given object implements the ModelGraphResult interface.
 */
export function instanceOfModelGraphResult(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "edges" in value;
    isInstance = isInstance && "nodes" in value;

    return isInstance;
}

export function ModelGraphResultFromJSON(json: any): ModelGraphResult {
    return ModelGraphResultFromJSONTyped(json, false);
}

export function ModelGraphResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelGraphResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'edges': (mapValues(json['edges'], DetailedConnectionSummaryFromJSON)),
        'nodes': (mapValues(json['nodes'], DetailedNodeSummaryFromJSON)),
    };
}

export function ModelGraphResultToJSON(value?: ModelGraphResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'edges': (mapValues(value.edges, DetailedConnectionSummaryToJSON)),
        'nodes': (mapValues(value.nodes, DetailedNodeSummaryToJSON)),
    };
}

