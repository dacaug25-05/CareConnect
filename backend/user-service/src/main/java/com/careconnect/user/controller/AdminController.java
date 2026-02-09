package com.careconnect.user.controller;

import com.careconnect.user.dto.response.UserProfileResponse;
import com.careconnect.user.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;


    @PutMapping("/approve")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String approveUser(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        adminService.approveUserByEmail(email);
        return "User approved successfully";
    }

    // GET /api/admin/users - List ALL users
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<UserProfileResponse> getAllUsers() {
        return adminService.getAllUsers();
    }

    // GET /api/admin/users/{email} - Get single user
    @GetMapping("/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public UserProfileResponse getUser(@PathVariable String email) {
        return adminService.getUserByEmail(email);
    }

    @DeleteMapping("/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteUser(@PathVariable String email) {
        adminService.disableUser(email);
        return "User deleted successfully";
    }


}
