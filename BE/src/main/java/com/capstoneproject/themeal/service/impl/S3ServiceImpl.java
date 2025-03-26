package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.config.ApplicationConfig;
import com.capstoneproject.themeal.exception.ApplicationException;
import com.capstoneproject.themeal.service.S3Service;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectAclRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.ResponseInputStream;
import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.util.List;

@Service
public class S3ServiceImpl implements S3Service {

    private final ApplicationConfig applicationConfig;
    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    public S3ServiceImpl(S3Client s3Client, S3Presigner s3Presigner, ApplicationConfig applicationConfig) {
        this.s3Client = s3Client;
        this.s3Presigner = s3Presigner;
        this.applicationConfig = applicationConfig;
    }

    @Override
    public void putObject(String bucketName, String key, byte[] file) {
        try {
            System.out.println("Attempting to upload to bucket: " + bucketName);

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.putObject(request, RequestBody.fromBytes(file));
        } catch (Exception e) {
            System.err.println("Upload failed with error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to upload to S3" + e);
        }
    }

    @Override
    public byte[] getObject(String bucketName, String key) {
        GetObjectRequest objectRequest = GetObjectRequest.builder().bucket(bucketName).key(key).build();
        ResponseInputStream<GetObjectResponse> getObjectResponse = s3Client.getObject(objectRequest);

        try {
            return getObjectResponse.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String generatePresignedUrl(String bucketName, String key) {
        GetObjectRequest objectRequest = GetObjectRequest.builder().bucket(bucketName).key(key).build();
        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(10))
                .getObjectRequest(objectRequest)
                .build();

        return s3Presigner.presignGetObject(presignRequest).url().toString();

    }

    @Override
    public void deleteObject(String bucketName, List<String> imageUrls, Long restaurantId) {

        try {
            for (String fileName : imageUrls) {
                if (!fileName.startsWith("http")) {
                    System.out.println("Deleting: " + fileName);
                    System.out.println("restaurantId: " + restaurantId);
                    s3Client.deleteObject(DeleteObjectRequest.builder()
                            .bucket(bucketName)
                            .key(fileName)
                            .build());
                }
            }

        } catch (Exception e) {
            throw new ApplicationException(e.getMessage());
        }
    }

}
