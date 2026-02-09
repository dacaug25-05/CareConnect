package com.careconnect.user.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @Column(name = "admin_id")
    private Integer adminId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "admin_id")
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(name = "admin_role", nullable = false)
    private String adminRole;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
