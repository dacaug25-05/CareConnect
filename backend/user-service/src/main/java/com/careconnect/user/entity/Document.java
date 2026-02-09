package com.careconnect.user.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "doc_type", nullable = false)
    private String docType;

    @Column(name = "uploaded_at", insertable = false, updatable = false)
    private LocalDateTime uploadedAt;
}
