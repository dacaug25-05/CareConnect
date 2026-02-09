package com.careconnect.user.service;

import com.careconnect.user.dto.request.OrganizationDonorRequest;
import com.careconnect.user.dto.response.OrganizationDonorResponse;

public interface OrganizationDonorService {
    OrganizationDonorResponse createOrUpdate(Integer userId, OrganizationDonorRequest request);
    OrganizationDonorResponse getByUserId(Integer userId);

    void deleteByUserId(Integer userId);
}
