package com.careconnect.beneficiary.mapper;

import com.careconnect.beneficiary.dto.request.VerificationCreateDto;
import com.careconnect.beneficiary.dto.response.VerificationResponseDto;
import com.careconnect.beneficiary.entity.VerificationLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VerificationMapper {

    @Mapping(target = "logId", ignore = true)
    @Mapping(target = "verifiedOn", ignore = true)
    @Mapping(target = "verifiedBy", ignore = true)
    VerificationLog toEntity(VerificationCreateDto dto);

    VerificationResponseDto toDto(VerificationLog entity);
}
