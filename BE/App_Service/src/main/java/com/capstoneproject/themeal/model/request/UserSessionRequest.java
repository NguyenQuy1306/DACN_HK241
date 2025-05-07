package com.capstoneproject.themeal.model.request;

import java.io.Serializable;
import java.util.Set;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSessionRequest implements Serializable {
    private Long userId;
    private String email;
    private String fullName;
    private Set<String> roles;
    private LocalDateTime loginTime;
}
