package com.capstoneproject.themeal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.Email = :email")
    Optional<User> timEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.HoTen = :HoTen")
    Optional<User> timHoTen(@Param("HoTen") String HoTen);

    @Query("SELECT u FROM User u WHERE u.Email = :Email")
    Optional<User> findByEmail(@Param("Email") String Email);
}
