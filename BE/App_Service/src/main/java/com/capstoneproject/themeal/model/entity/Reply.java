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
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "PhanHoi")
public class Reply {
    @Id
    @OneToOne
    @JoinColumn(name = "MaSoDanhGia")
    private Rate MaSoDanhGia;

    @ManyToOne
    @JoinColumn(name = "MaSoPhanHoi", referencedColumnName = "MaSoDanhGia")
    private Rate PhanHoi;

}
