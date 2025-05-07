package com.capstoneproject.themeal.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class RegisterRequest {
    @NotEmpty(message = "Role is mandatory")
    private String userRole;
    @NotEmpty(message = "HoTen is mandatory")
    private String hoTen;
    @NotEmpty(message = "SDT is mandatory")
    private String sdt;
    @NotEmpty(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;
    @NotEmpty(message = "Password is mandatory")
    private String matKhau;

}