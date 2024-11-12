package com.curcus.lms.model.mapper;

import com.curcus.lms.model.entity.Admin;

import com.curcus.lms.model.entity.User;
import com.curcus.lms.model.response.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class UserMapper {
    @Mapping(target = "userRole", expression = "java(getUserRoleById(user))")
    public abstract UserResponse toUserResponse(User user);

    protected String getUserRoleById(User user) {
        return user.getDiscriminatorValue();
    }
}