package com.careconnect.beneficiary.repository;

import com.careconnect.beneficiary.entity.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Integer> {

    Optional<Beneficiary> findByEmail(String email);

    Optional<Beneficiary> findByMobile(String mobile);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);
}
