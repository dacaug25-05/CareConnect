package com.careconnect.beneficiary.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VerificationCreateDto {

    @NotBlank
    private String entityType;

    @NotNull
    private Integer entityId;

    @NotBlank
    private String status;
}