package com.capstoneproject.themeal.model.entity;

import com.capstoneproject.themeal.model.entity.UserRole.Role;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue(value = Role.CUSTOMER)
@Table(name = "KhachHang")
@PrimaryKeyJoinColumn(name = "MaSoKhachHang", referencedColumnName = "MaSoNguoiDung")
public class Customer extends User {
    // @Column(nullable = false)
    private Long DiemTichLuy;
}
