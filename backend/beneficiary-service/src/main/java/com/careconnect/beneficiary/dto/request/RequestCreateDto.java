package com.careconnect.beneficiary.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestCreateDto {

    @NotBlank
    private String requestType;

    private String description;

    @NotNull
    private Integer quantity;
}