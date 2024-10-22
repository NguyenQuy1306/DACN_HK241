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
@Table(name = "PhuongThucThanhToan")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSoPhuongThucThanhToan")
    private Long MaSoPhuongThucThanhToan;

    @Column(nullable = false)
    private String Ten;

    @OneToMany(mappedBy = "PhuongThucThanhToan")
    private Set<RestaurantHasPaymentMethod> danhSachNhaHangCoPhuongThucThanhToan;
}
