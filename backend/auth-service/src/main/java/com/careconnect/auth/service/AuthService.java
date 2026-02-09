package com.careconnect.auth.service;

import com.careconnect.auth.dto.AuthResponse;
import com.careconnect.auth.dto.LoginRequest;
import com.careconnect.auth.dto.RegisterRequest;

import java.nio.file.AccessDeniedException;

public interface AuthService {

    //This method:
    //Takes → RegisterRequest (user input data)
    //Returns → AuthResponse (JWT + user info)

    AuthResponse login(LoginRequest request) throws AccessDeniedException;

    //This method:
    //Takes → LoginRequest (email + password)
    //Returns → AuthResponse (JWT token if valid)

    AuthResponse register(RegisterRequest request);

}
