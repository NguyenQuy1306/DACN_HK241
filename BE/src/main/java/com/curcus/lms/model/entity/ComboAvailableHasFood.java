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
@Table(name = "ComboCoSan_Co_MonAn")
public class ComboAvailableHasFood {
    @EmbeddedId
    private ComboAvailableHasFoodId MaSo;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoComBoCoSan")
    @JoinColumn(name = "MaSoComBoCoSan")
    private ComboAvailable ComboCoSan;

    @JsonIgnore
    @ManyToOne
    @MapsId("MaSoMonAn")
    @JoinColumn(name = "MaSoMonAn")
    private Food MonAn;

}
