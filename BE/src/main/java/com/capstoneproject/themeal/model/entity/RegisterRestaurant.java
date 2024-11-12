package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

@Data
@Setter
@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@Table(name = "dangkynhahang")
public class RegisterRestaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MaSoYeuCau;
    private String HoTenDem;
    private String Ten;
    private String SDT;
    private String Email;
    private String TenNhaHang;
    private String DiaChi;
    private String KhoangGia;
}
