package com.careconnect.beneficiary.controller;

import com.careconnect.beneficiary.dto.request.VerificationCreateDto;
import com.careconnect.beneficiary.dto.response.VerificationResponseDto;
import com.careconnect.beneficiary.service.VerificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/verifications")
@RequiredArgsConstructor
public class VerificationController {

    private final VerificationService verificationService;

    // Admin verifies entity
    @PostMapping("/{adminId}")
    public VerificationResponseDto verify(
            @PathVariable Integer adminId,
            @Valid @RequestBody VerificationCreateDto dto
    ) {
        return verificationService.verifyEntity(adminId, dto);
    }

    // Get verification history
    @GetMapping("/{entityType}/{entityId}")
    public List<VerificationResponseDto> getLogs(
            @PathVariable String entityType,
            @PathVariable Integer entityId
    ) {
        return verificationService.getVerificationLogs(entityType, entityId);
    }
}
