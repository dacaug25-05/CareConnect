package com.careconnect.user.service;

import com.careconnect.user.dto.request.IndividualDonorRequest;
import com.careconnect.user.dto.response.IndividualDonorResponse;

public interface IndividualDonorService {
    IndividualDonorResponse createOrUpdate(Integer userId, IndividualDonorRequest request);
    IndividualDonorResponse getByUserId(Integer userId);

    void deleteByUserId(Integer userId);
}
