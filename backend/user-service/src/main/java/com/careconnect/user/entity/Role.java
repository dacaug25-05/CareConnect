package com.careconnect.user.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rid")
    private Integer id;

    @Column(name = "rname", nullable = false, unique = true)
    private String name;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
