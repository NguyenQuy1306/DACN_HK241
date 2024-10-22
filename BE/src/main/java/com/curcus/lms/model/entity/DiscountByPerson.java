package com.curcus.lms.model.entity;

import jakarta.persistence.*;
import lombok.*;
import com.curcus.lms.model.entity.DiscountType.Type;

@Setter
@Getter

@Entity
@DiscriminatorValue(value = Type.BYPERSON)
@Table(name = "GiamGiaTheoNguoi")
@PrimaryKeyJoinColumn(name = "MaSoGiamGiaTheoNguoi", referencedColumnName = "MaSoGiamGia")
public class DiscountByPerson extends Discount {

}
