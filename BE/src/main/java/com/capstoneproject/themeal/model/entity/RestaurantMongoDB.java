package com.capstoneproject.themeal.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.web.bind.annotation.GetMapping;

@Document(collection = "restaurant")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantMongoDB {
    @Id
    private Long MaSoNhaHang;

    @Field(targetType = FieldType.STRING, name = "Ten")
    private String Ten;

    @Field(targetType = FieldType.STRING, name = "DiaChi")
    private String DiaChi;

    @Field(targetType = FieldType.STRING, name = "Quan") // New field for District
    private String Quan;

    @Field(targetType = FieldType.STRING, name = "LoaiHinh")
    private String LoaiHinh;

    @Field(targetType = FieldType.STRING, name = "PhuHop")
    private String PhuHop;

    @Field(targetType = FieldType.STRING, name = "MonDacSac")
    private String MonDacSac;

    @Field(targetType = FieldType.STRING, name = "MoTaKhongGian")
    private String MoTaKhongGian;

    @Field(targetType = FieldType.STRING, name = "DiemDacTrung")
    private String DiemDacTrung;


}
