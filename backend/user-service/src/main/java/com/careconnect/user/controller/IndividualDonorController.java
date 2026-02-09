package com.careconnect.user.controller;

import com.careconnect.user.dto.request.IndividualDonorRequest;
import com.careconnect.user.dto.response.IndividualDonorResponse;
import com.careconnect.user.service.IndividualDonorService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/donors/individual")
@RequiredArgsConstructor
public class IndividualDonorController {

    private final IndividualDonorService donorService;

    // POST /donors/individual
    @PostMapping
    public IndividualDonorResponse createOrUpdate(
            HttpServletRequest request,
            @RequestBody IndividualDonorRequest donorRequest) {

        Integer userId = (Integer) request.getAttribute("userId");
        return donorService.createOrUpdate(userId, donorRequest);
    }

    // GET /donors/individual/me
    @GetMapping("/me")
    public IndividualDonorResponse getMyDonorProfile(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        return donorService.getByUserId(userId);
    }

    // DELETE /donors/individual/me
    @DeleteMapping("/me")
    public String deleteMyDonorProfile(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        donorService.deleteByUserId(userId);
        return "Individual donor profile deleted successfully";
    }

}
