package com.careconnect.user.mapper;

import com.careconnect.user.dto.request.OrganizationDonorRequest;
import com.careconnect.user.dto.response.OrganizationDonorResponse;
import com.careconnect.user.entity.OrganizationDonor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrganizationDonorMapper {

    OrganizationDonor toEntity(OrganizationDonorRequest request);

    OrganizationDonorResponse toResponse(OrganizationDonor donor);
}
