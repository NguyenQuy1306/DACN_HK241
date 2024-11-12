package com.capstoneproject.themeal.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.Role;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.entity.UserDetailsImpl;
import com.capstoneproject.themeal.model.entity.UserRole;
import com.capstoneproject.themeal.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.timEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email:" + email));
        // Role role = user.getDiscriminatorValue().equals(UserRole.Role.STUDENT) ?
        // Role.STUDENT : Role.INSTRUCTOR;

        Role role = switch (user.getDiscriminatorValue()) {
            case UserRole.Role.CUSTOMER -> Role.CUSTOMER;
            case UserRole.Role.ADMIN -> Role.ADMIN;
            case UserRole.Role.OWNER -> Role.OWNER;
            default -> throw new IllegalArgumentException("Invalid user role");
        };

        return new UserDetailsImpl(user, role);
    }
}