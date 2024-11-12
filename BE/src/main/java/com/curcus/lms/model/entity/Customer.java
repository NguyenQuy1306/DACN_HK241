package com.curcus.lms.model.entity;

import jakarta.persistence.*;
import lombok.*;
import com.curcus.lms.model.entity.UserRole.Role;

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
