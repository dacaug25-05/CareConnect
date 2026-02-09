package com.careconnect.user.mapper;

import com.careconnect.user.dto.response.UserProfileResponse;
import com.careconnect.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "role.name", target = "role")
    UserProfileResponse toResponse(User user);
}
