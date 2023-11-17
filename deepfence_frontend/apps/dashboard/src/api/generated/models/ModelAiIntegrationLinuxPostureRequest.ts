/* tslint:disable */
/* eslint-disable */
/**
 * Deepfence ThreatMapper
 * Deepfence Runtime API provides programmatic control over Deepfence microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.
 *
 * The version of the OpenAPI document: 2.0.0
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
 * @interface ModelAiIntegrationLinuxPostureRequest
 */
export interface ModelAiIntegrationLinuxPostureRequest {
    /**
     * 
     * @type {string}
     * @memberof ModelAiIntegrationLinuxPostureRequest
     */
    compliance_check_type: string;
    /**
     * 
     * @type {string}
     * @memberof ModelAiIntegrationLinuxPostureRequest
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof ModelAiIntegrationLinuxPostureRequest
     */
    integration_type?: ModelAiIntegrationLinuxPostureRequestIntegrationTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof ModelAiIntegrationLinuxPostureRequest
     */
    query_type: ModelAiIntegrationLinuxPostureRequestQueryTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof ModelAiIntegrationLinuxPostureRequest
     */
    remediation_format: ModelAiIntegrationLinuxPostureRequestRemediationFormatEnum;
    /**
     * 
     * @type {string}
     * @memberof ModelAiIntegrationLinuxPostureRequest
     */
    test_number: string;
}


/**
 * @export
 */
export const ModelAiIntegrationLinuxPostureRequestIntegrationTypeEnum = {
    Openai: 'openai'
} as const;
export type ModelAiIntegrationLinuxPostureRequestIntegrationTypeEnum = typeof ModelAiIntegrationLinuxPostureRequestIntegrationTypeEnum[keyof typeof ModelAiIntegrationLinuxPostureRequestIntegrationTypeEnum];

/**
 * @export
 */
export const ModelAiIntegrationLinuxPostureRequestQueryTypeEnum = {
    Remediation: 'remediation'
} as const;
export type ModelAiIntegrationLinuxPostureRequestQueryTypeEnum = typeof ModelAiIntegrationLinuxPostureRequestQueryTypeEnum[keyof typeof ModelAiIntegrationLinuxPostureRequestQueryTypeEnum];

/**
 * @export
 */
export const ModelAiIntegrationLinuxPostureRequestRemediationFormatEnum = {
    All: 'all',
    Cli: 'cli',
    Pulumi: 'pulumi',
    Terraform: 'terraform'
} as const;
export type ModelAiIntegrationLinuxPostureRequestRemediationFormatEnum = typeof ModelAiIntegrationLinuxPostureRequestRemediationFormatEnum[keyof typeof ModelAiIntegrationLinuxPostureRequestRemediationFormatEnum];


/**
 * Check if a given object implements the ModelAiIntegrationLinuxPostureRequest interface.
 */
export function instanceOfModelAiIntegrationLinuxPostureRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "compliance_check_type" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "query_type" in value;
    isInstance = isInstance && "remediation_format" in value;
    isInstance = isInstance && "test_number" in value;

    return isInstance;
}

export function ModelAiIntegrationLinuxPostureRequestFromJSON(json: any): ModelAiIntegrationLinuxPostureRequest {
    return ModelAiIntegrationLinuxPostureRequestFromJSONTyped(json, false);
}

export function ModelAiIntegrationLinuxPostureRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelAiIntegrationLinuxPostureRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'compliance_check_type': json['compliance_check_type'],
        'description': json['description'],
        'integration_type': !exists(json, 'integration_type') ? undefined : json['integration_type'],
        'query_type': json['query_type'],
        'remediation_format': json['remediation_format'],
        'test_number': json['test_number'],
    };
}

export function ModelAiIntegrationLinuxPostureRequestToJSON(value?: ModelAiIntegrationLinuxPostureRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'compliance_check_type': value.compliance_check_type,
        'description': value.description,
        'integration_type': value.integration_type,
        'query_type': value.query_type,
        'remediation_format': value.remediation_format,
        'test_number': value.test_number,
    };
}
