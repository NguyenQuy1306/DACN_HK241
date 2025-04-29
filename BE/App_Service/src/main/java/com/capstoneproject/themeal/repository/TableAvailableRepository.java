package com.capstoneproject.themeal.repository;

import ch.qos.logback.core.pattern.color.BoldYellowCompositeConverter;
import com.capstoneproject.themeal.model.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.entity.TableAvailable;
import com.capstoneproject.themeal.model.entity.TableAvailableId;

import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

@Repository
public interface TableAvailableRepository extends JpaRepository<TableAvailable, TableAvailableId> {
    @Query("SELECT COALESCE(MAX(t.id.ThuTuBan), 0) FROM TableAvailable t WHERE t.id.MaSoNhaHang = :maSoNhaHang")
    Short findMaxThuTuBanForRestaurant(@Param("maSoNhaHang") Long maSoNhaHang);

    @Query("SELECT t FROM TableAvailable t WHERE t.id.MaSoNhaHang = :maSoNhaHang")
    List<TableAvailable> findAllTableForRestaurant(@Param("maSoNhaHang") Long maSoNhaHang);

    @Query("SELECT t FROM TableAvailable t " +
            "WHERE t.NhaHang.MaSoNhaHang = :maSoNhaHang " +
            "AND t.Ngay IN :ngayList " +
            "AND t.Gio IN :gioList " +
            "AND t.SoNguoi IN :soNguoiList"
    )
    List<TableAvailable> findExistingTables(
            @Param("maSoNhaHang") Long maSoNhaHang,
            @Param("ngayList") List<LocalDate> ngayList,
            @Param("gioList") List<LocalTime> gioList,
            @Param("soNguoiList") List<Byte> soNguoiList
    );


//    @Query("SELECT t.MaSo.thuTuBan FROM TableAvailable t WHERE t.NhaHang.MaSoNhaHang = :maSoNhaHang ORDER BY t.MaSo DESC LIMIT 1")
//    Optional<Short> findMaxThuTuBan(@Param("maSoNhaHang") Long maSoNhaHang);
}
