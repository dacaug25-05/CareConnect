package com.careconnect.user.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DocumentResponse {

    private Integer id;
    private String fileUrl;
    private String docType;
    private LocalDateTime uploadedAt;
}
