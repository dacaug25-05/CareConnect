package com.careconnect.user.service.impl;

import com.careconnect.user.dto.request.OrganizationDonorRequest;
import com.careconnect.user.dto.response.OrganizationDonorResponse;
import com.careconnect.user.entity.OrganizationDonor;
import com.careconnect.user.mapper.OrganizationDonorMapper;
import com.careconnect.user.repository.OrganizationDonorRepository;
import com.careconnect.user.repository.UserRepository;
import com.careconnect.user.service.OrganizationDonorService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizationDonorServiceImpl implements OrganizationDonorService {

    private final OrganizationDonorRepository orgRepository;
    private final UserRepository userRepository;
    private final OrganizationDonorMapper orgMapper;

    @Override
    public OrganizationDonorResponse createOrUpdate(Integer userId, OrganizationDonorRequest request) {
        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        OrganizationDonor org = orgMapper.toEntity(request);
        org.setOrgId(userId);

        return orgMapper.toResponse(orgRepository.save(org));
    }

    @Override
    public OrganizationDonorResponse getByUserId(Integer userId) {
        return orgRepository.findById(userId)
                .map(orgMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Organization not found"));
    }

    @Override
    @Transactional
    public void deleteByUserId(Integer userId) {
        OrganizationDonor org = orgRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Organization donor profile not found"));
        orgRepository.delete(org);
    }
}
