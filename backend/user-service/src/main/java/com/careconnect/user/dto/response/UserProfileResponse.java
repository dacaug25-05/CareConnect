package com.careconnect.user.dto.response;

import lombok.Data;

@Data
public class UserProfileResponse {

    private Integer userId;
    private String email;
    private String mobile;
    private String role;
    private Boolean approved;
    private Boolean active;
}
