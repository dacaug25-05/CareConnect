package com.careconnect.beneficiary.service;

import com.careconnect.beneficiary.dto.request.RequestCreateDto;
import com.careconnect.beneficiary.dto.response.RequestResponseDto;
import java.util.List;

public interface RequestService {
    RequestResponseDto createRequest(Integer beneficiaryId, RequestCreateDto dto);
    List<RequestResponseDto> getRequestsByBeneficiary(Integer beneficiaryId);
    List<RequestResponseDto> getRequestsByStatus(String status);


    void approveRequest(Integer requestId);
    void rejectRequest(Integer requestId);
    RequestResponseDto getRequestById(Integer requestId);
    List<RequestResponseDto> getPendingRequests();
    List<RequestResponseDto> getAllRequests();
}
