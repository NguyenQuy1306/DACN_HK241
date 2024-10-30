package com.curcus.lms.model.entity;

import jakarta.persistence.*;
import lombok.*;
import com.curcus.lms.model.entity.DiscountType.Type;

@Setter
@Getter

@Entity
@DiscriminatorValue(value = Type.BYTIME)
@Table(name = "GiamGiaTheoKhungGio")
@PrimaryKeyJoinColumn(name = "MaSoGiamGiaTheoKhungGio", referencedColumnName = "MaSoGiamGia")
public class DiscountByTime extends Discount {

}
