package com.careconnect.user.controller;

import com.careconnect.user.dto.request.OrganizationDonorRequest;
import com.careconnect.user.dto.response.OrganizationDonorResponse;
import com.careconnect.user.service.OrganizationDonorService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/donors/organization")
@RequiredArgsConstructor
public class OrganizationDonorController {

    private final OrganizationDonorService orgService;


    // GET /donors/organization/me
    @GetMapping("/me")
    public OrganizationDonorResponse getMyOrgProfile(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        return orgService.getByUserId(userId);
    }


    // POST /donors/organization
    @PostMapping
    public OrganizationDonorResponse createOrUpdate(
            HttpServletRequest request,
            @RequestBody OrganizationDonorRequest orgRequest) {

        Integer userId = (Integer) request.getAttribute("userId");
        return orgService.createOrUpdate(userId, orgRequest);
    }


    @DeleteMapping("/me")
    public String deleteMyOrgProfile(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        orgService.deleteByUserId(userId);
        return "Organization donor profile deleted successfully";
    }
}
