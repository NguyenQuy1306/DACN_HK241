package com.capstoneproject.themeal.model.entity;

import com.capstoneproject.themeal.model.entity.UserRole.Role;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter

@Entity
@DiscriminatorValue(value = Role.ADMIN)
@Table(name = "Admin")
@PrimaryKeyJoinColumn(name = "MaSoAdmin", referencedColumnName = "MaSoNguoiDung")
public class Admin extends User {

}
