package com.careconnect.user.service;

import com.careconnect.user.dto.response.UserProfileResponse;

public interface UserService {
    UserProfileResponse getCurrentActiveUserByEmail(String email);

}
