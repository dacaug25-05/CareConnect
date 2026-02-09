package com.careconnect.beneficiary.repository;

import com.careconnect.beneficiary.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    List<Request> findByBeneficiaryId(Integer beneficiaryId);
    List<Request> findByStatus(String status);
    // getPendingRequests() uses existing findByStatus("PENDING")
}
