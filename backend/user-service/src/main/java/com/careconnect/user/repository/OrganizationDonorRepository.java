package com.careconnect.user.repository;

import com.careconnect.user.entity.OrganizationDonor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationDonorRepository
        extends JpaRepository<OrganizationDonor, Integer> {
}
