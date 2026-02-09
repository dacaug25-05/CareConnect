package com.careconnect.user.repository;

import com.careconnect.user.entity.IndividualDonor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndividualDonorRepository
        extends JpaRepository<IndividualDonor, Integer> {
}
