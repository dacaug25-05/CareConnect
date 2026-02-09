package com.careconnect.beneficiary.service.impl;

import com.careconnect.beneficiary.dto.request.BeneficiaryCreateDto;
import com.careconnect.beneficiary.dto.response.BeneficiaryResponseDto;
import com.careconnect.beneficiary.entity.Beneficiary;
import com.careconnect.beneficiary.mapper.BeneficiaryMapper;
import com.careconnect.beneficiary.repository.BeneficiaryRepository;
import com.careconnect.beneficiary.service.BeneficiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BeneficiaryServiceImpl implements BeneficiaryService {

    private final BeneficiaryRepository beneficiaryRepository;
    private final BeneficiaryMapper beneficiaryMapper;

    @Override
    public BeneficiaryResponseDto createBeneficiary(Integer userId,
                                                    BeneficiaryCreateDto dto) {

        Beneficiary beneficiary = beneficiaryMapper.toEntity(dto);
        beneficiary.setBeneficiaryId(userId);

        Beneficiary saved = beneficiaryRepository.save(beneficiary);
        return beneficiaryMapper.toDto(saved);
    }

    @Override
    public BeneficiaryResponseDto getBeneficiaryById(Integer beneficiaryId) {
        return beneficiaryRepository.findById(beneficiaryId)
                .map(beneficiaryMapper::toDto)
                .orElse(null);
    }
}
