package com.capstoneproject.themeal.service;

import java.util.List;

public interface S3Service {
    public void putObject(String bucketName, String key, byte[] file);

    public byte[] getObject(String bucketName, String key);

    public String generatePresignedUrl(String bucketName, String key);

    public void deleteObject(String bucketName, List<String> imageUrls, Long restaurantId);

}
