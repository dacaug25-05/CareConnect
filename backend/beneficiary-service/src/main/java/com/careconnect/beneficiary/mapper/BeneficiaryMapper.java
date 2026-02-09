package com.careconnect.beneficiary.mapper;

import com.careconnect.beneficiary.dto.request.BeneficiaryCreateDto;
import com.careconnect.beneficiary.dto.response.BeneficiaryResponseDto;
import com.careconnect.beneficiary.entity.Beneficiary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BeneficiaryMapper {

    @Mapping(target = "beneficiaryId", ignore = true)
    @Mapping(target = "verified", constant = "false")
    Beneficiary toEntity(BeneficiaryCreateDto dto);

    BeneficiaryResponseDto toDto(Beneficiary entity);
}
