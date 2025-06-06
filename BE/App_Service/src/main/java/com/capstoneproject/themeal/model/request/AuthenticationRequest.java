package com.capstoneproject.themeal.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    @NotEmpty(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String Email;

    @NotEmpty(message = "Password is mandatory")
    private String MatKhau;
}