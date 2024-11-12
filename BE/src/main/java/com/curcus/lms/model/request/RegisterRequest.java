package com.curcus.lms.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class RegisterRequest {
    @NotEmpty(message = "Role is mandatory")
    private String UserRole;
    @NotEmpty(message = "HoTen is mandatory")
    private String HoTen;
    @NotEmpty(message = "SDT is mandatory")
    private String SDT;
    @NotEmpty(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String Email;
    @NotEmpty(message = "Password is mandatory")
    private String MatKhau;

}