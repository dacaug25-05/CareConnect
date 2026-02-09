package com.careconnect.user.service.impl;

import com.careconnect.user.dto.request.IndividualDonorRequest;
import com.careconnect.user.dto.response.IndividualDonorResponse;
import com.careconnect.user.entity.IndividualDonor;
import com.careconnect.user.mapper.IndividualDonorMapper;
import com.careconnect.user.repository.IndividualDonorRepository;
import com.careconnect.user.repository.UserRepository;
import com.careconnect.user.service.IndividualDonorService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IndividualDonorServiceImpl implements IndividualDonorService {

    private final IndividualDonorRepository donorRepository;
    private final UserRepository userRepository;
    private final IndividualDonorMapper donorMapper;

    @Override
    public IndividualDonorResponse createOrUpdate(Integer userId, IndividualDonorRequest request) {
        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        IndividualDonor donor = donorMapper.toEntity(request);
        donor.setDonorId(userId);

        return donorMapper.toResponse(donorRepository.save(donor));
    }

    @Override
    public IndividualDonorResponse getByUserId(Integer userId) {
        return donorRepository.findById(userId)
                .map(donorMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Donor not found"));
    }

    @Override
    @Transactional
    public void deleteByUserId(Integer userId) {
        IndividualDonor donor = donorRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Individual donor profile not found"));
        donorRepository.delete(donor);
    }

}
