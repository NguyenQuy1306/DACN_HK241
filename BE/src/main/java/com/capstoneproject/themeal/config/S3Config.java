package com.capstoneproject.themeal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.model.GetObjectAclRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadBucketRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.GetCallerIdentityRequest;
import software.amazon.awssdk.services.sts.model.GetCallerIdentityResponse;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.nio.file.Paths;

@Configuration
public class S3Config {
    private static final Logger logger = LoggerFactory.getLogger(S3Config.class);
    private static final String BUCKET_NAME = "themealbucket1"; // Change to your bucket name
    private static final Region AWS_REGION = Region.AP_SOUTHEAST_1; // Set your AWS region

    @Bean
    public static S3Client s3Client() {
        DefaultCredentialsProvider credentialsProvider = DefaultCredentialsProvider.create();

        // Verify AWS credentials by retrieving the caller identity
        verifyAwsIdentity(credentialsProvider);

        // Use default virtual-hosted-style access (Fixes SSL issue)
        S3Client s3Client = S3Client.builder()
                .region(Region.AP_SOUTHEAST_1)
                .endpointOverride(URI.create("http://themealbucket1.s3.ap-southeast-1.amazonaws.com")) // Add a dot, //
                                                                                                       // not a hyphen
                .forcePathStyle(true) // Force
                .build();

        // // Define request using default endpoint
        // GetObjectRequest getObjectRequest = GetObjectRequest.builder()
        // .bucket("themealbucket1")
        // .key("text.txt")
        // .build();

        // // Download the object
        // System.out.println("success afterget ");
        // s3Client.getObject(getObjectRequest, Paths.get("text.txt"));
        // System.out.println("success afterget 232");
        return s3Client;
    }

    private static void verifyAwsIdentity(DefaultCredentialsProvider credentialsProvider) {
        try (StsClient stsClient = StsClient.builder()
                .credentialsProvider(credentialsProvider)
                .region(AWS_REGION)
                .build()) {

            GetCallerIdentityResponse identityResponse = stsClient
                    .getCallerIdentity(GetCallerIdentityRequest.builder().build());

            logger.info("✅ AWS Identity ARN: {}", identityResponse.arn());
            logger.info("✅ AWS Account ID: {}", identityResponse.account());
            logger.info("✅ AWS User ID: {}", identityResponse.userId());
        } catch (Exception e) {
            logger.error("❌ Failed to retrieve AWS identity. Check your credentials!", e);
        }
    }

    private static void verifyS3Bucket(S3Client s3Client, String bucketName) {
        try {
            s3Client.headBucket(HeadBucketRequest.builder().bucket(bucketName).build());
            logger.info("✅ S3 Bucket '{}' exists and is accessible.", bucketName);
        } catch (S3Exception e) {
            logger.error("❌ S3 Bucket '{}' does not exist or is not accessible! Error: {}", bucketName,
                    e.awsErrorDetails().errorMessage());
        }
    }
}
