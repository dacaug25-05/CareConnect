package com.careconnect.beneficiary.service;

import com.careconnect.beneficiary.dto.request.VerificationCreateDto;
import com.careconnect.beneficiary.dto.response.VerificationResponseDto;

import java.util.List;

public interface VerificationService {

    VerificationResponseDto verifyEntity(
            Integer adminId,
            VerificationCreateDto dto
    );

    List<VerificationResponseDto> getVerificationLogs(
            String entityType,
            Integer entityId
    );
}
