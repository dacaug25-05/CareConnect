package com.careconnect.beneficiary.mapper;

import com.careconnect.beneficiary.dto.request.RequestCreateDto;
import com.careconnect.beneficiary.dto.response.RequestResponseDto;
import com.careconnect.beneficiary.entity.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RequestMapper {

    @Mapping(target = "requestId", ignore = true)
    @Mapping(target = "status", constant = "OPEN")
    @Mapping(target = "approvedByAdmin", constant = "false")
    @Mapping(target = "beneficiaryId", ignore = true)
    Request toEntity(RequestCreateDto dto);

    RequestResponseDto toDto(Request entity);
}
