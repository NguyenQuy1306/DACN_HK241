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
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "NguoiDung_Thich_DanhGia")
public class UserLikeRate {
    @EmbeddedId
    private UserLikeRateId MaSo;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoDanhGia")
    @JoinColumn(name = "MaSoDanhGia")
    private Rate DanhGia;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoNguoiDung")
    @JoinColumn(name = "MaSoNguoiDung")
    private User NguoiDung;

    @Column(nullable = false)
    private LocalDateTime ThoiGian;

}
