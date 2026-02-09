package com.careconnect.auth.controller;


import com.careconnect.auth.dto.AuthResponse;
import com.careconnect.auth.dto.LoginRequest;
import com.careconnect.auth.dto.RegisterRequest;
import com.careconnect.auth.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private  final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) throws AccessDeniedException {
        return authService.login(request);
    }
}
