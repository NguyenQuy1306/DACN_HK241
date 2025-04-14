package com.capstoneproject.themeal.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.capstoneproject.themeal.model.entity.Admin;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.response.*;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class UserMapper {
    @Mapping(target = "userRole", expression = "java(getUserRoleById(user))")
    public abstract UserResponse toUserResponse(User user);

    protected String getUserRoleById(User user) {
        return user.getDiscriminatorValue();
    }
}