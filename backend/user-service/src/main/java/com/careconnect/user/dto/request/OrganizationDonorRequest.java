package com.careconnect.user.dto.request;

import lombok.Data;

@Data
public class OrganizationDonorRequest {

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
