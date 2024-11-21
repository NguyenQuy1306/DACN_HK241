package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.OrderTable;

import java.util.List;

@Repository
public interface OrderTableRepository extends JpaRepository<OrderTable, Long> {
    @Query("SELECT DISTINCT o FROM OrderTable o WHERE o.KhachHang.MaSoNguoiDung = :customerId")
    List<OrderTable> findByMaSoKhachHang(@Param("customerId") Long customerId);

}
