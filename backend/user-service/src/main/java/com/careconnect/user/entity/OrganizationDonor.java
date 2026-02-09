package com.careconnect.user.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "organization_donor")
public class OrganizationDonor {

    @Id
    @Column(name = "org_id")
    private Integer orgId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "org_id")
    private User user;

    @Column(name = "org_name", nullable = false)
    private String orgName;

    @Column(name = "org_type", nullable = false)
    private String orgType;

    @Column(name = "reg_no", unique = true)
    private String regNo;

    @Column(name = "contact_person", nullable = false)
    private String contactPerson;

    @Column(name = "address_line")
    private String addressLine;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String pincode;

    @Column(name = "certificate_url")
    private String certificateUrl;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
