package com.careconnect.beneficiary.repository;

import com.careconnect.beneficiary.entity.VerificationLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VerificationLogRepository extends JpaRepository<VerificationLog, Integer> {

    List<VerificationLog> findByEntityTypeAndEntityId(String entityType, Integer entityId);

    List<VerificationLog> findByStatus(String status);
}
