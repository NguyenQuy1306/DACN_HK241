package com.capstoneproject.themeal.model.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;

@Setter
@Getter
public class UserInformationRequest {
    private String fullName;
    private String email;
    private String phoneNumber;
    private Date birthDate;
    private String address;
    private Long id;
}
