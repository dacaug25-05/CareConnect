package com.careconnect.user.dto.request;

import lombok.Data;

@Data
public class IndividualDonorRequest {

    private String firstName;
    private String lastName;
    private String addressLine;
    private String city;
    private String state;
    private String pincode;
}
