package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import jakarta.persistence.PostLoad;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Document(indexName = "restaurants")
public class RestaurantElasticsearch {
    @Id
    private Long MaSoNhaHang;

    @Field(type = FieldType.Text, name = "Ten")
    private String Ten;

    @Field(type = FieldType.Text, name = "DiaChi")
    private String DiaChi;

    @Field(type = FieldType.Text, name = "Quan") // New field for District
    private String Quan;

    @Field(type = FieldType.Text, name = "LoaiHinh")
    private String LoaiHinh;

    @Field(type = FieldType.Text, name = "PhuHop")
    private String PhuHop;

    @Field(type = FieldType.Text, name = "MonDacSac")
    private String MonDacSac;

    @Field(type = FieldType.Text, name = "MoTaKhongGian")
    private String MoTaKhongGian;

    @Field(type = FieldType.Text, name = "DiemDacTrung")
    private String DiemDacTrung;

    @Field(type = FieldType.Double, name = "KinhDo")
    private Double KinhDo;

    @Field(type = FieldType.Double, name = "ViDo")
    private Double ViDo;

    @Field(type = FieldType.Text, name = "location")
    private String location; // Lưu geo_point dưới dạng String

    @PostLoad
    public void updateLocation() {
        if (KinhDo != null && ViDo != null) {
            this.location = ViDo + "," + KinhDo;
        }
    }

    // Method to extract District from address
    private String extractDistrictFromAddress(String address) {
        if (address != null) {
            Pattern pattern = Pattern.compile("Q\\.?\\s*(\\d+)");
            Matcher matcher = pattern.matcher(address);
            if (matcher.find()) {
                return "quận " + matcher.group(1); // Extracts district number
            }
        }
        return null;
    }

    // Getters and Setters
    public Long getMaSoNhaHang() {
        return MaSoNhaHang;
    }

    public void setMaSoNhaHang(Long maSoNhaHang) {
        MaSoNhaHang = maSoNhaHang;
    }

    public String getTen() {
        return Ten;
    }

    public void setTen(String ten) {
        Ten = ten;
    }

    public String getDiaChi() {
        return DiaChi;
    }

    public void setDiaChi(String diaChi) {
        DiaChi = diaChi;
        this.Quan = extractDistrictFromAddress(diaChi); // Extract and store district
    }

    public String getQuan() {
        return Quan;
    }

    public void setQuan(String quan) {
        this.Quan = quan;
    }

    public String getLoaiHinh() {
        return LoaiHinh;
    }

    public void setLoaiHinh(String loaiHinh) {
        LoaiHinh = loaiHinh;
    }

    public String getPhuHop() {
        return PhuHop;
    }

    public void setPhuHop(String phuHop) {
        PhuHop = phuHop;
    }

    public String getMonDacSac() {
        return MonDacSac;
    }

    public void setMonDacSac(String monDacSac) {
        MonDacSac = monDacSac;
    }

    public String getMoTaKhongGian() {
        return MoTaKhongGian;
    }

    public void setMoTaKhongGian(String moTaKhongGian) {
        MoTaKhongGian = moTaKhongGian;
    }

    public String getDiemDacTrung() {
        return DiemDacTrung;
    }

    public void setDiemDacTrung(String diemDacTrung) {
        DiemDacTrung = diemDacTrung;
    }

    public Double getKinhDo() {
        return KinhDo;
    }

    public void setKinhDo(Double kinhDo) {
        this.KinhDo = kinhDo;
        updateLocation();
    }

    public Double getViDo() {
        return ViDo;
    }

    public void setViDo(Double viDo) {
        this.ViDo = viDo;
        updateLocation();
    }

    public String getLocation() {
        return location;
    }
}
