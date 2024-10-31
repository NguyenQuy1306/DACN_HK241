package com.curcus.lms.model.entity;

import jakarta.persistence.*;
import lombok.*;
import com.curcus.lms.model.entity.UserRole.Role;

@Setter
@Getter

@Entity
@DiscriminatorValue(value = Role.ADMIN)
@Table(name = "Admin")
@PrimaryKeyJoinColumn(name = "MaSoAdmin", referencedColumnName = "MaSoNguoiDung")
public class Admin extends User {

}
