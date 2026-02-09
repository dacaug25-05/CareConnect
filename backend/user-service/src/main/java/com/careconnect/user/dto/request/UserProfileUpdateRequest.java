package com.careconnect.user.dto.request;

import lombok.Data;

@Data
public class UserProfileUpdateRequest {
    private Boolean approved;
    private Boolean active;
}
