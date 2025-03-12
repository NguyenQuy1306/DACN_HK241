package com.capstoneproject.themeal.service;

public interface S3Service {
    public void putObject(String bucketName, String key, byte[] file);

    public byte[] getObject(String bucketName, String key);
}
