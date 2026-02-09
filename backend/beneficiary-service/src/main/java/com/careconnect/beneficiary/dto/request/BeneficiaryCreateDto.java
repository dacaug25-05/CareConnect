package com.careconnect.beneficiary.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BeneficiaryCreateDto {

    @NotBlank
    private String type;

    @NotBlank
    private String name;

    private String regNo;

    @NotBlank
    private String contactPerson;

    @NotBlank
    private String mobile;

    private String email;

    private String addressLine;
    private String city;
    private String state;
    private String pincode;

    private String certificateUrl;
}