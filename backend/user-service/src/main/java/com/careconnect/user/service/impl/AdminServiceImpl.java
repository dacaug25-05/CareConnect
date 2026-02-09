package com.careconnect.user.service.impl;

import com.careconnect.user.dto.response.UserProfileResponse;
import com.careconnect.user.entity.User;
import com.careconnect.user.mapper.AdminMapper;
import com.careconnect.user.repository.UserRepository;
import com.careconnect.user.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final AdminMapper adminMapper;

    @Override
    public void approveUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setApproved(true);
        userRepository.save(user);
    }

    @Override
    public List<UserProfileResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(adminMapper::toProfileResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserProfileResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return adminMapper.toProfileResponse(user);
    }

    @Override
    public void disableUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setApproved(false);
        user.setActive(false);
        userRepository.save(user);
    }





}
