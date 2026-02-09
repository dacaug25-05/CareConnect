package com.careconnect.user.service;

import com.careconnect.user.dto.response.UserProfileResponse;

import java.util.List;

public interface AdminService {
    void approveUserByEmail(String email);

    List<UserProfileResponse> getAllUsers();

    UserProfileResponse getUserByEmail(String email);

    void disableUser(String email);


}
