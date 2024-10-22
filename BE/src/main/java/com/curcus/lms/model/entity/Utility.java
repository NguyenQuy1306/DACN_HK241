package com.curcus.lms.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "TienIch")
public class Utility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoTienIch")
    private Long MaSoTienIch;

    @Column(nullable = false, unique = true)
    private String Ten;
    @Column(nullable = false)
    private String MoTa;

    @OneToMany(mappedBy = "TienIch")
    private Set<RestaurantHasUtility> danhSachNhahangCoTienIch;
    // @OneToMany(mappedBy = "NhaHang")
    // private Set<FavoriteListRestaurant> favoriteListRestaurants;

    // @ManyToOne
    // @JoinColumn(name = "MaSoChuNhaHang", referencedColumnName = "MaSoNguoiDung")
    // private User ChuNhaHang;

}
