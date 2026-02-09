package com.careconnect.beneficiary.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "verification_log")
public class VerificationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Integer logId;

    @Column(name = "entity_type", nullable = false)
    private String entityType;

    @Column(name = "entity_id", nullable = false)
    private Integer entityId;

    @Column(name = "status", columnDefinition = "ENUM('PENDING','VERIFIED','REJECTED')")
    private String status;

    @Column(name = "verified_by", nullable = false)
    private Integer verifiedBy;

    @Column(name = "verified_on", updatable = false)
    private LocalDateTime verifiedOn;

    @PrePersist
    void onVerify() {
        this.verifiedOn = LocalDateTime.now();
    }
}
