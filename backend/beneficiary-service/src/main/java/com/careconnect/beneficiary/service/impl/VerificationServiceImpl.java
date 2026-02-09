package com.careconnect.beneficiary.service.impl;

import com.careconnect.beneficiary.dto.request.VerificationCreateDto;
import com.careconnect.beneficiary.dto.response.VerificationResponseDto;
import com.careconnect.beneficiary.entity.VerificationLog;
import com.careconnect.beneficiary.mapper.VerificationMapper;
import com.careconnect.beneficiary.repository.VerificationLogRepository;
import com.careconnect.beneficiary.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VerificationServiceImpl implements VerificationService {

    private final VerificationLogRepository verificationLogRepository;
    private final VerificationMapper verificationMapper;

    @Override
    public VerificationResponseDto verifyEntity(Integer adminId,
                                                VerificationCreateDto dto) {

        VerificationLog log = verificationMapper.toEntity(dto);
        log.setVerifiedBy(adminId);

        VerificationLog saved = verificationLogRepository.save(log);
        return verificationMapper.toDto(saved);
    }

    @Override
    public List<VerificationResponseDto> getVerificationLogs(String entityType,
                                                             Integer entityId) {

        return verificationLogRepository
                .findByEntityTypeAndEntityId(entityType, entityId)
                .stream()
                .map(verificationMapper::toDto)
                .collect(Collectors.toList());
    }
}
