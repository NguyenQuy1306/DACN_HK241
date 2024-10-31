package com.curcus.lms.model.entity;

import jakarta.persistence.*;
import lombok.*;
import com.curcus.lms.model.entity.DiscountType.Type;

@Setter
@Getter

@Entity
@DiscriminatorValue(value = Type.BYFOOD)
@Table(name = "GiamGiaTheoMonAn")
@PrimaryKeyJoinColumn(name = "MaSoGiamGiaTheoMonAn", referencedColumnName = "MaSoGiamGia")
public class DiscountByFood extends Discount {

}
