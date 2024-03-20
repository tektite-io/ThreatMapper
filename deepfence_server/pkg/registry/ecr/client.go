package ecr

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/credentials/stscreds"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/deepfence/ThreatMapper/deepfence_server/model"
)

func listIAMImages(awsRegion, awsAccountID, targetAccountRoleARN string, isPublic bool) ([]model.IngestedContainerImage, error) {
	// Create session with default credentials provider chain
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(awsRegion),
	})
	if err != nil {
		return nil, fmt.Errorf("error creating session: %v", err)
	}

	awsConfig := aws.Config{
		Region: aws.String(awsRegion),
	}

	// if targetRoleARN is empty, that means
	// it is not a crossaccount ecr, no need to use stscreds
	if targetAccountRoleARN != "" {
		if awsAccountID == "" {
			return nil, fmt.Errorf("for cross account ECR, account ID is mandatory")
		}
		creds := stscreds.NewCredentials(sess, targetAccountRoleARN)
		awsConfig.Credentials = creds
	}
	// in case of single account, fetch accountid if not provided
	if awsAccountID == "" {
		awsAccountID, err = getAWSAccountID()
		if err != nil {
			return nil, fmt.Errorf("error getting AWS account ID: make sure IAMRole has instance profile ARN attached: %v", err)
		}
	}

	if isPublic {
		return listIAMPublicImages(sess, awsConfig, awsAccountID)
	}
	return listIAMPrivateImages(sess, awsConfig, awsAccountID)
}

func listNonIAMImages(awsAccessKey, awsSecretKey, awsAccountID, awsRegion string, isPublic bool) ([]model.IngestedContainerImage, error) {
	// Set up AWS session with access key ID and secret access key
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(awsRegion),
		Credentials: credentials.NewStaticCredentials(awsAccessKey, awsSecretKey, ""),
	})
	if err != nil {
		return nil, fmt.Errorf("error creating session: %v", err)
	}

	if isPublic {
		return listNonIAMPublicImages(sess, awsAccountID)
	}
	return listNonIAMPrivateImages(sess, awsAccountID)
}

func getAWSAccountID() (string, error) {
	imdsVersion, err := getIMDSVersion()
	if err != nil {
		return "", fmt.Errorf("error getting IMDS version: %s", err.Error())
	}
	if imdsVersion == "v2" {
		return getIMDSv2AWSAccountID()
	} else {
		return getIMDSv1AWSAccountID()
	}
}

func getIMDSv1AWSAccountID() (string, error) {
	// Send a GET request to the instance metadata service to retrieve the AWS Account ID
	resp, err := http.Get("http://169.254.169.254/latest/dynamic/instance-identity/document")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var awsSelfQuery AWSSelfQuery
	err = json.Unmarshal(body, &awsSelfQuery)
	if err != nil {
		return "", err
	}

	return awsSelfQuery.AccountID, nil
}

func getIMDSv2AWSAccountID() (string, error) {
	token, err := getIMDSv2Token()
	if err != nil {
		return "", fmt.Errorf("error fetching token for IMDS v2: %s", err.Error())
	}
	req, err := http.NewRequest("GET", "http://169.254.169.254/latest/dynamic/instance-identity/document", nil)
	if err != nil {
		return "", fmt.Errorf("error creating IMDSv2 identity document request: %s", err.Error())
	}
	req.Header.Set("X-aws-ec2-metadata-token", token)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("error getting IMDSv2 identity document: %s", err.Error())
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("error reading IMDSv2 identity document: %s", err.Error())
	}

	var awsSelfQuery AWSSelfQuery
	err = json.Unmarshal(body, &awsSelfQuery)
	if err != nil {
		return "", fmt.Errorf("error unmarshalling IMDSv2 identity document: %s", err.Error())
	}
	return awsSelfQuery.AccountID, nil
}

func getIMDSv2Token() (string, error) {
	// Send a PUT request to the instance metadata service to get the token
	req, err := http.NewRequest("PUT", "http://169.254.169.254/latest/api/token", nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("X-aws-ec2-metadata-token-ttl-seconds", "60")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

func getIMDSVersion() (string, error) {
	// Send a GET request to the instance metadata service to check the IMDS version(v1 or v2)
	resp, err := http.Get("http://169.254.169.254/")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Read the response status
	if resp.StatusCode == http.StatusUnauthorized {
		return "v2", nil
	} else if resp.StatusCode == http.StatusOK {
		return "v1", nil
	} else {
		return "", fmt.Errorf("error getting IMDS version")
	}
}
