package com.careconnect.user.mapper;

import com.careconnect.user.dto.request.IndividualDonorRequest;
import com.careconnect.user.dto.response.IndividualDonorResponse;
import com.careconnect.user.entity.IndividualDonor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IndividualDonorMapper {

    IndividualDonor toEntity(IndividualDonorRequest request);

    IndividualDonorResponse toResponse(IndividualDonor donor);
}