package com.curcus.lms.model.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.curcus.lms.model.entity.Restaurant;
import com.curcus.lms.model.entity.TableAvailableId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TableAvailableResponse implements Serializable {
    private TableAvailableId MaSo;
    private Byte SoNguoi;
    private LocalDate Ngay;
    private LocalTime Gio;
}
