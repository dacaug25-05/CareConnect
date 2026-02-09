package com.careconnect.user.controller;

import com.careconnect.user.dto.response.UserProfileResponse;
import com.careconnect.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // GET /users/me
    @GetMapping("/me")
    public UserProfileResponse getMyProfile(
            @AuthenticationPrincipal String email
    ) {
        return userService.getCurrentActiveUserByEmail(email);
    }
}
