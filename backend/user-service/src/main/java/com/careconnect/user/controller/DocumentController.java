package com.careconnect.user.controller;

import com.careconnect.user.dto.response.DocumentResponse;
import com.careconnect.user.service.DocumentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    // POST /documents/upload
    @PostMapping("/upload")
    public DocumentResponse upload(
            HttpServletRequest request,
            @RequestParam("file") MultipartFile file,
            @RequestParam("docType") String docType) {

        Integer userId = (Integer) request.getAttribute("userId");
        return documentService.upload(userId, file, docType);
    }

    // GET /documents/me
    @GetMapping("/me")
    public List<DocumentResponse> getMyDocuments(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        return documentService.getMyDocuments(userId);
    }
}
