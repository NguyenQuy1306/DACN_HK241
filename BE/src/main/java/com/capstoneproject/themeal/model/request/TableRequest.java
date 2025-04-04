package com.capstoneproject.themeal.model.request;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

import com.capstoneproject.themeal.config.LocalTimeDeserializer;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.TableAvailableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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
