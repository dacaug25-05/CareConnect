package com.careconnect.user.service;

import com.careconnect.user.dto.response.DocumentResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface DocumentService {
    DocumentResponse upload(Integer userId, MultipartFile file, String docType);
    List<DocumentResponse> getMyDocuments(Integer userId);
}
