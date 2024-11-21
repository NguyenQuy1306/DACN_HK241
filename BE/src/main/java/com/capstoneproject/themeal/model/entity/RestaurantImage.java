package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "AnhNhaHang")
public class RestaurantImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoAnh")
    private Long MaSoAnh;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RestaurantImageType KieuAnh;

    @ManyToOne
    @JoinColumn(name = "MaSoNhaHang", referencedColumnName = "MaSoNhaHang")
    private Restaurant NhaHang;

    @ManyToOne
    @JoinColumn(name = "MaSoDanhGia", referencedColumnName = "MaSoDanhGia")
    private Rate DanhGia;

    @Column(nullable = false, columnDefinition = "VARCHAR")
    private String URL;

}
