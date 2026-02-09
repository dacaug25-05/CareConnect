package com.careconnect.beneficiary.service.impl;

import com.careconnect.beneficiary.dto.request.RequestCreateDto;
import com.careconnect.beneficiary.dto.response.RequestResponseDto;
import com.careconnect.beneficiary.entity.Request;
import com.careconnect.beneficiary.mapper.RequestMapper;
import com.careconnect.beneficiary.repository.RequestRepository;
import com.careconnect.beneficiary.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;

    @Override
    public RequestResponseDto createRequest(Integer beneficiaryId, RequestCreateDto dto) {
        Request request = requestMapper.toEntity(dto);
        request.setBeneficiaryId(beneficiaryId);


        request.setStatus("APPROVED");

        Request saved = requestRepository.save(request);
        return requestMapper.toDto(saved);
    }

    @Override
    public List<RequestResponseDto> getRequestsByBeneficiary(Integer beneficiaryId) {
        return requestRepository.findByBeneficiaryId(beneficiaryId)
                .stream()
                .map(requestMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestResponseDto> getRequestsByStatus(String status) {
        return requestRepository.findByStatus(status)
                .stream()
                .map(requestMapper::toDto)
                .collect(Collectors.toList());
    }

    // =====================
    // ADMIN ACTIONS
    // =====================

    @Override
    @Transactional
    public void approveRequest(Integer requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus("APPROVED");
        requestRepository.save(request);
    }

    @Override
    @Transactional
    public void rejectRequest(Integer requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus("REJECTED");
        requestRepository.save(request);
    }

    @Override
    public RequestResponseDto getRequestById(Integer requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        return requestMapper.toDto(request);
    }

    @Override
    public List<RequestResponseDto> getPendingRequests() {

        return requestRepository.findByStatus("OPEN")
                .stream()
                .map(requestMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestResponseDto> getAllRequests() {
        return requestRepository.findAll()
                .stream()
                .map(requestMapper::toDto)
                .collect(Collectors.toList());
    }
}
