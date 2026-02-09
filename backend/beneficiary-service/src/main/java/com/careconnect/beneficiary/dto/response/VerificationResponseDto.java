package com.careconnect.beneficiary.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VerificationResponseDto {

    private Integer logId;
    private String entityType;
    private Integer entityId;

    private String status;
    private Integer verifiedBy;

    private LocalDateTime verifiedOn;
}