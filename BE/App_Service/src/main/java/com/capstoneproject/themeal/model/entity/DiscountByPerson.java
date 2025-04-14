package com.capstoneproject.themeal.model.entity;

import com.capstoneproject.themeal.model.entity.DiscountType.Type;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter

@Entity
@DiscriminatorValue(value = Type.BYPERSON)
@Table(name = "GiamGiaTheoNguoi")
@PrimaryKeyJoinColumn(name = "MaSoGiamGiaTheoNguoi", referencedColumnName = "MaSoGiamGia")
public class DiscountByPerson extends Discount {

}
