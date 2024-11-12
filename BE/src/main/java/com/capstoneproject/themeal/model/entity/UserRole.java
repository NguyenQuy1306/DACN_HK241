package com.capstoneproject.themeal.model.entity;

public enum UserRole {
    CUSTOMER,
    OWNER,
    ADMIN;

    public static class Role {
        public static final String CUSTOMER = "C";
        public static final String OWNER = "O";
        public static final String ADMIN = "A";
    }
}
