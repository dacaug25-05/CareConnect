package com.careconnect.beneficiary.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "requests")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Integer requestId;

    @Column(name = "beneficiary_id", nullable = false)
    private Integer beneficiaryId;

    @Column(name = "request_type", nullable = false)
    private String requestType;

    @Column(name = "description")
    private String description;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "status", columnDefinition = "ENUM('APPROVED','REJECTED','FULFILLED')")
//    private String status = "APPROVED";
    private String status;

    @Column(name = "approved_by_admin")
    private Boolean approvedByAdmin = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
