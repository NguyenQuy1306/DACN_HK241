package com.capstoneproject.themeal.config;

import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.GetCallerIdentityRequest;
import software.amazon.awssdk.services.sts.model.GetCallerIdentityResponse;

public class TestAWSIdentity {
    public static void main(String[] args) {
        StsClient stsClient = StsClient.create();
        GetCallerIdentityResponse response = stsClient.getCallerIdentity(GetCallerIdentityRequest.builder().build());

        System.out.println("AWS Identity: " + response.arn());
    }
}
