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
@Table(name = "DonDatBan_Co_ComboCoSan")
public class OrderTableHasComboAvailable {
    @EmbeddedId
    private OrderTableHasComboAvailableId MaSo;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoComboCoSan")
    @JoinColumn(name = "MaSoComBoCoSan")
    private ComboAvailable ComboCoSan;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoDatBan")
    @JoinColumn(name = "MaSoDatBan")
    private OrderTable DonDatBan;

}
