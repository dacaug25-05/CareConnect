package com.careconnect.beneficiary.controller;

import com.careconnect.beneficiary.dto.request.RequestCreateDto;
import com.careconnect.beneficiary.dto.response.RequestResponseDto;
import com.careconnect.beneficiary.service.RequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;



    // Public: get all APPROVED requests (for landing page)
    @GetMapping("/approved")
    public List<RequestResponseDto> getApprovedRequests() {
        return requestService.getRequestsByStatus("APPROVED");
    }



    // Beneficiary creates a request
    @PostMapping("/{beneficiaryId}")
    public RequestResponseDto createRequest(
            @PathVariable Integer beneficiaryId,
            @Valid @RequestBody RequestCreateDto dto
    ) {
        return requestService.createRequest(beneficiaryId, dto);
    }

    // Beneficiary views own requests
    @GetMapping("/beneficiary/{beneficiaryId}")
    public List<RequestResponseDto> getByBeneficiary(
            @PathVariable Integer beneficiaryId
    ) {
        return requestService.getRequestsByBeneficiary(beneficiaryId);
    }


    // Admin views requests by status
    @GetMapping("/status/{status}")
    public List<RequestResponseDto> getByStatus(@PathVariable String status) {
        return requestService.getRequestsByStatus(status);
    }

    @PutMapping("/{requestId}/approve")
    public String approveRequest(@PathVariable Integer requestId) {
        requestService.approveRequest(requestId);
        return "Request approved successfully";
    }

    @PutMapping("/{requestId}/reject")
    public String rejectRequest(@PathVariable Integer requestId) {
        requestService.rejectRequest(requestId);
        return "Request rejected successfully";
    }

    @GetMapping("/{requestId}")
    public RequestResponseDto getRequestById(@PathVariable Integer requestId) {
        return requestService.getRequestById(requestId);
    }

    @GetMapping("/pending")
    public List<RequestResponseDto> getPendingRequests() {
        return requestService.getPendingRequests();
    }

    @GetMapping
    public List<RequestResponseDto> getAllRequests() {
        return requestService.getAllRequests();
    }
}
