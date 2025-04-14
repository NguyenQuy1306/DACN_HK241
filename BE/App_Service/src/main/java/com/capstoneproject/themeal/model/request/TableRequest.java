package com.capstoneproject.themeal.model.request;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TableRequest implements Serializable {

    private Long maSoNhaHang;
    @JsonProperty("SoNguoi")
    private Byte SoNguoi;

    @JsonProperty("Ngay")
    private LocalDate Ngay;

    @JsonProperty("Gio")
    private LocalTime Gio;

    private Long soLuong;

}
