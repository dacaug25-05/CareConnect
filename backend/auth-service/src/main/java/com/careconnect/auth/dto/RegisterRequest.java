package com.careconnect.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String mobile;

    @NotBlank
    private String password;

    @NotBlank
    private String role;

}
