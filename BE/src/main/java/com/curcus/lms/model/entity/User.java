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
import java.util.List;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "NguoiDung")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "VaiTro", discriminatorType = DiscriminatorType.STRING)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MaSoNguoiDung;

    @Column(nullable = false, unique = true)
    private String Email;
    @Column(nullable = false)
    private String HoTen;

    @Column(nullable = true, unique = true)
    private String SDT;
    @Column(nullable = true)
    private Date NgaySinh;

    @Column(nullable = true)
    private String GioiTinh;

    @OneToMany(mappedBy = "NguoiDung")
    private Set<UserLikeRate> danhSachNguoiDungThichDanhGia;

    @Transient
    public String getDiscriminatorValue() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }
}
