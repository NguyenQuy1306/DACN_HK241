package com.curcus.lms.model.entity;

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
@Table(name = "DanhSachYeuThich")
public class FavoriteList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoDanhSachYeuThich")
    private Long MaSoDanhSachYeuThich;

    @Column(nullable = false)
    private String Ten;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaSoKhachHang", referencedColumnName = "MaSoNguoiDung")
    private User KhachHang; // Correctly reflects a single user association

    @OneToMany(mappedBy = "DanhSachYeuThich")
    private Set<FavoriteListRestaurant> favoriteListRestaurants;
    // @Override
    // public String toString() {
    // return "Course [courseId=" + courseId + ", title=" + title + ", description="
    // + description + ", price=" + price
    // + ", instructor=" + instructor.getUserId() + ", category=" + category + ",
    // enrollment=" + enrollment
    // + "]";
    // }

}
