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
@Table(name = "MonAn")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoMonAn")
    private Long MaSoMonAn;

    @Column(nullable = false)
    private String Ten;
    @Column(nullable = false)
    private Long Gia;
    @Column(nullable = false)
    private String MoTa;
    // @Column(nullable = false)
    private String TrangThai;

    @ManyToOne
    @JoinColumn(name = "MaSoAnh")
    private RestaurantImage MaSoAnh;

    @ManyToOne
    @JoinColumn(name = "MaSoDanhMuc")
    private Category DanhMuc;

    @OneToMany(mappedBy = "MonAn")
    private Set<OrderTableHasFood> danhSachDonDatBanCoMonAn;
    @OneToMany(mappedBy = "MonAn")
    private Set<ComboAvailableHasFood> danhSachComboCoSanCoMonan;
}
