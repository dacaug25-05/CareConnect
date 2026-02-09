package com.careconnect.beneficiary.dto.response;

import lombok.Data;

@Data
public class BeneficiaryResponseDto {

    private Integer beneficiaryId;
    private String type;
    private String name;
    private String regNo;
    private String contactPerson;
    private String mobile;
    private String email;

    private String city;
    private String state;
    private String pincode;

    private Boolean verified;
}