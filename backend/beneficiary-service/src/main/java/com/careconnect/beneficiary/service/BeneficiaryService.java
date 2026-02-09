package com.careconnect.beneficiary.service;

import com.careconnect.beneficiary.dto.request.BeneficiaryCreateDto;
import com.careconnect.beneficiary.dto.response.BeneficiaryResponseDto;

public interface BeneficiaryService {

    BeneficiaryResponseDto createBeneficiary(
            Integer userId,
            BeneficiaryCreateDto dto
    );

    BeneficiaryResponseDto getBeneficiaryById(Integer beneficiaryId);
}
