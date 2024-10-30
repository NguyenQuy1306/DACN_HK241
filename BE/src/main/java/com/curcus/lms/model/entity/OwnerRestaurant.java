package com.curcus.lms.model.entity;

import jakarta.persistence.*;
import lombok.*;
import com.curcus.lms.model.entity.UserRole.Role;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue(value = Role.OWNER)
@Table(name = "ChuNhaHang")
@PrimaryKeyJoinColumn(name = "MaSoChuNhaHang", referencedColumnName = "MaSoNguoiDung")
public class OwnerRestaurant extends User {
    @Column(nullable = false)
    private String CCCD;
}
