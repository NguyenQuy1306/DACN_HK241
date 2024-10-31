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
@Table(name = "DanhSachYeuThich_NhaHang")
public class FavoriteListRestaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MaSo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaSoDanhSachYeuThich")
    private FavoriteList DanhSachYeuThich;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaSoNhaHang")
    private Restaurant NhaHang;

    // @Override
    // public String toString() {
    // return "Course [courseId=" + courseId + ", title=" + title + ", description="
    // + description + ", price=" + price
    // + ", instructor=" + instructor.getUserId() + ", category=" + category + ",
    // enrollment=" + enrollment
    // + "]";
    // }

}
