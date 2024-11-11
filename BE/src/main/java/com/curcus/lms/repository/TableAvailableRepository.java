package com.curcus.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.curcus.lms.model.entity.Food;
import com.curcus.lms.model.entity.TableAvailable;
import com.curcus.lms.model.entity.TableAvailableId;

import java.util.List;
import org.springframework.data.domain.Pageable;

@Repository
public interface TableAvailableRepository extends JpaRepository<TableAvailable, TableAvailableId> {
    @Query("SELECT COALESCE(MAX(t.id.ThuTuBan), 0) FROM TableAvailable t WHERE t.id.MaSoNhaHang = :maSoNhaHang")
    Short findMaxThuTuBanForRestaurant(@Param("maSoNhaHang") Long maSoNhaHang);

    @Query("SELECT t FROM TableAvailable t WHERE t.id.MaSoNhaHang = :maSoNhaHang")
    List<TableAvailable> findAllTableForRestaurant(@Param("maSoNhaHang") Long maSoNhaHang);
}
