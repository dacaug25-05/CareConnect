package com.careconnect.beneficiary.controller;

import com.careconnect.beneficiary.dto.request.BeneficiaryCreateDto;
import com.careconnect.beneficiary.dto.response.BeneficiaryResponseDto;
import com.careconnect.beneficiary.service.BeneficiaryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/beneficiaries")
@RequiredArgsConstructor
public class BeneficiaryController {

    private final BeneficiaryService beneficiaryService;

    // Create beneficiary profile (after auth)
    @PostMapping("/{userId}")
    public BeneficiaryResponseDto createBeneficiary(
            @PathVariable Integer userId,
            @Valid @RequestBody BeneficiaryCreateDto dto
    ) {
        return beneficiaryService.createBeneficiary(userId, dto);
    }

    // Get beneficiary profile
    @GetMapping("/{beneficiaryId}")
    public BeneficiaryResponseDto getBeneficiary(
            @PathVariable Integer beneficiaryId
    ) {
        return beneficiaryService.getBeneficiaryById(beneficiaryId);
    }
}
