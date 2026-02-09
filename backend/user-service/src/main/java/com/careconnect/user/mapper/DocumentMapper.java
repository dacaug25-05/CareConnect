package com.careconnect.user.mapper;

import com.careconnect.user.dto.response.DocumentResponse;
import com.careconnect.user.entity.Document;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DocumentMapper {

    DocumentResponse toResponse(Document document);
}


