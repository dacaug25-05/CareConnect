package com.careconnect.user.service.impl;

import com.careconnect.user.dto.response.UserProfileResponse;
import com.careconnect.user.entity.User;
import com.careconnect.user.mapper.UserMapper;
import com.careconnect.user.repository.UserRepository;
import com.careconnect.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserProfileResponse getCurrentActiveUserByEmail(String email) {
        User user = userRepository
                .findByEmailAndApprovedTrueAndActiveTrue(email)
                .orElseThrow(() -> new RuntimeException("User not found or disabled"));

        return userMapper.toResponse(user);
    }


}
