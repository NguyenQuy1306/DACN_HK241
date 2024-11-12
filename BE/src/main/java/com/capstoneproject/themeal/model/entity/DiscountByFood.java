package com.capstoneproject.themeal.model.entity;

import com.capstoneproject.themeal.model.entity.DiscountType.Type;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter

@Entity
@DiscriminatorValue(value = Type.BYFOOD)
@Table(name = "GiamGiaTheoMonAn")
@PrimaryKeyJoinColumn(name = "MaSoGiamGiaTheoMonAn", referencedColumnName = "MaSoGiamGia")
public class DiscountByFood extends Discount {

}
