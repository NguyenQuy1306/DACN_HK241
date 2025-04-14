package com.capstoneproject.themeal.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.capstoneproject.themeal.repository.TableAvailableRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.ColumnDefault;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "DatCoc")
public class Deposit {

    @EmbeddedId
    private DepositId MaSo;

    @JsonIgnore
    @OneToOne
    @MapsId("MaSoNhaHang")
    @JoinColumn(name = "MaSoNhaHang")
    private Restaurant NhaHang;

    @Column(nullable = false)
    private Long DatCocToiThieu;
    @Column(nullable = false)
    private Long NguongApDungDatCocTheoPhanTram;
    @Column(nullable = false)
    private Double PhanTramCoc;
    @Column(nullable = false)
    private Byte KhoangThoiGianHoanCocToanBo;
    @Column(nullable = false)
    private Byte KhoangThoiGianHoanCocKhongToanBo;
    @Column(nullable = false)
    private Double PhanTramGiamCoc;
}
