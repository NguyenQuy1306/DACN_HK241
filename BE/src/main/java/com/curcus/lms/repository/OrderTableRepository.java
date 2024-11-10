package com.curcus.lms.repository;

import com.curcus.lms.model.entity.OrderTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderTableRepository extends JpaRepository<OrderTable, Long> {
    @Query("SELECT DISTINCT o FROM OrderTable o WHERE o.KhachHang.maSoNguoiDung = :customerId")
    List<OrderTable> findByMaSoKhachHang(@Param("customerId") Long customerId);

}
