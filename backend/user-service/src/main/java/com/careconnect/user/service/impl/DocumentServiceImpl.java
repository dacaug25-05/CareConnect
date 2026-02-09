package com.careconnect.user.service.impl;

import com.careconnect.user.dto.response.DocumentResponse;
import com.careconnect.user.entity.Document;
import com.careconnect.user.entity.User;
import com.careconnect.user.mapper.DocumentMapper;
import com.careconnect.user.repository.DocumentRepository;
import com.careconnect.user.repository.UserRepository;
import com.careconnect.user.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private static final String UPLOAD_DIR = "uploads";

    private final DocumentRepository documentRepository;
    private final DocumentMapper documentMapper;
    private final UserRepository userRepository;

    @Override
    public DocumentResponse upload(Integer userId, MultipartFile file, String docType) {
        try {
            // Validation
            if (file == null || file.isEmpty()) {
                throw new RuntimeException("File is empty");
            }
            if (docType == null || docType.isBlank()) {
                throw new RuntimeException("Document type is required");
            }

            // 1. Fetch User
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found: " + userId));

            // 2. File upload logic
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String safeName = file.getOriginalFilename() == null ? "file" :
                    file.getOriginalFilename().replaceAll("\\s+", "_");
            String fileName = System.currentTimeMillis() + "_" + safeName;
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // 3. Save Document
            String fileUrl = "/" + UPLOAD_DIR + "/" + fileName;
            Document doc = new Document();
            doc.setUser(user);
            doc.setFileUrl(fileUrl);
            doc.setDocType(docType);

            return documentMapper.toResponse(documentRepository.save(doc));

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        } catch (Exception e) {
            throw new RuntimeException("Upload failed", e);
        }
    }

    @Override
    public List<DocumentResponse> getMyDocuments(Integer userId) {
        return documentRepository.findByUser_Id(userId)
                .stream()
                .map(documentMapper::toResponse)
                .collect(Collectors.toList());
    }
}
