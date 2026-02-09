package com.careconnect.user.dto.response;

import lombok.Data;

@Data
public class IndividualDonorResponse {

    private String firstName;
    private String lastName;
    private String addressLine;
    private String city;
    private String state;
    private String pincode;
}
