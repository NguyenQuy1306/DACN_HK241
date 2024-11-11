package com.curcus.lms.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "DonDatBan_Co_MonAn")
public class OrderTableHasFood {
    @EmbeddedId
    private OrderTableHasFoodId MaSo;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoDatBan")
    @JoinColumn(name = "MaSoDatBan")
    private OrderTable DonDatBan;
    @Column(nullable = false)
    private Short SoLuong;
    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoMonAn")
    @JoinColumn(name = "MaSoMonAn")
    private Food MonAn;

}
