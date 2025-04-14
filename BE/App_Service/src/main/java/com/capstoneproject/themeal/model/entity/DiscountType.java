package com.capstoneproject.themeal.model.entity;

public enum DiscountType {
    BYPERSON,
    BYTIME,
    BYFOOD;

    public static class Type {
        public static final String BYPERSON = "P";
        public static final String BYTIME = "T";
        public static final String BYFOOD = "F";
    }
}
