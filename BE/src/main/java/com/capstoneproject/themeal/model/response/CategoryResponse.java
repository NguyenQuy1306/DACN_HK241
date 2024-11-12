package com.capstoneproject.themeal.model.response;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponse implements Serializable {
    private Long MaSoDanhMuc;
    private String Ten;
    // Getters and Setters
}
