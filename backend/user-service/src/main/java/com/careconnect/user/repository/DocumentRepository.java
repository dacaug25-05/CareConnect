package com.careconnect.user.repository;

import com.careconnect.user.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Integer> {

    List<Document> findByUser_Id(Integer userId);


}
