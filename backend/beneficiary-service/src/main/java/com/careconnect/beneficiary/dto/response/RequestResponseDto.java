package com.careconnect.beneficiary.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequestResponseDto {

    private Integer requestId;
    private Integer beneficiaryId;

    private String requestType;
    private String description;
    private Integer quantity;

    private String status;
    private Boolean approvedByAdmin;

    private LocalDateTime createdAt;
}
