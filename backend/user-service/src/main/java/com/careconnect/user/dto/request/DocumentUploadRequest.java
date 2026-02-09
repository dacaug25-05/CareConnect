package com.careconnect.user.dto.request;

import lombok.Data;

@Data
public class DocumentUploadRequest {

    private String fileUrl;
    private String docType;
}
