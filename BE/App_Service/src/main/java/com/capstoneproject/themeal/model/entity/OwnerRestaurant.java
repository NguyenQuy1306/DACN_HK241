package com.capstoneproject.themeal.model.entity;

import com.capstoneproject.themeal.model.entity.UserRole.Role;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue(value = Role.OWNER)
@Table(name = "ChuNhaHang")
@PrimaryKeyJoinColumn(name = "MaSoChuNhaHang", referencedColumnName = "MaSoNguoiDung")
public class OwnerRestaurant extends User {
    // @Column(nullable = false)
    private String CCCD;
}
