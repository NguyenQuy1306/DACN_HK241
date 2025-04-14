package com.capstoneproject.themeal.model.entity;

import com.capstoneproject.themeal.model.entity.DiscountType.Type;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter

@Entity
@DiscriminatorValue(value = Type.BYTIME)
@Table(name = "GiamGiaTheoKhungGio")
@PrimaryKeyJoinColumn(name = "MaSoGiamGiaTheoKhungGio", referencedColumnName = "MaSoGiamGia")
public class DiscountByTime extends Discount {

}
