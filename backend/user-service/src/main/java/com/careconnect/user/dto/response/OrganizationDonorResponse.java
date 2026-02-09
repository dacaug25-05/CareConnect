package com.careconnect.user.dto.response;

import lombok.Data;

@Data
public class OrganizationDonorResponse {

    private String orgName;
    private String orgType;
    private String regNo;
    private String contactPerson;
    private String addressLine;
    private String city;
    private String state;
    private String pincode;
    private String certificateUrl;
}
