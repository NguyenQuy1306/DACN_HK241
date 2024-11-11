package com.curcus.lms.model.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name="DanhMucNhaHang")
public class RestaurantCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="MaSoDanhMucNhaHang")
    private Long maSoDanhMucNhaHang;

    @Column(nullable = false)
    private String ten;

    @Column(nullable = false)
    private String linkAnh;

    public Long getMaSoDanhMucNhaHang() {
        return maSoDanhMucNhaHang;
    }

    public void setMaSoDanhMucNhaHang(Long maSoDanhMucNhaHang) {
        this.maSoDanhMucNhaHang = maSoDanhMucNhaHang;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getLinkAnh() {
        return linkAnh;
    }

    public void setLinkAnh(String linkAnh) {
        this.linkAnh = linkAnh;
    }
}
