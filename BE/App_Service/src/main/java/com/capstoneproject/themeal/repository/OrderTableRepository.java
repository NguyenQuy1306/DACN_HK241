package com.capstoneproject.themeal.repository;

import com.capstoneproject.themeal.model.entity.OrderTableStatus;
import com.capstoneproject.themeal.model.response.FinalOrderTableResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.OrderTable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface OrderTableRepository extends JpaRepository<OrderTable, Long> {
        @Query("SELECT DISTINCT o FROM OrderTable o WHERE o.KhachHang.MaSoNguoiDung = :customerId")
        List<OrderTable> findByMaSoKhachHang(@Param("customerId") Long customerId);

        @Query("SELECT DISTINCT o FROM OrderTable o WHERE o.NhaHang.MaSoNhaHang = :restaurantId")
        List<OrderTable> findByRestaurantId(@Param("restaurantId") Long restaurantId);

        @Query("SELECT new com.capstoneproject.themeal.model.response.FinalOrderTableResponse("
                        + "o.MaSoDatBan, o.SoKhach, o.Ngay, o.Gio, o.TrangThai, kh.HoTen, "
                        + "o.TienDatCoc, o.TongTienThanhToan, o.orderAt, o.PercentNoShow) "
                        + "FROM OrderTable o JOIN o.KhachHang kh "
                        + "WHERE o.NhaHang.MaSoNhaHang = :restaurantId")
        List<FinalOrderTableResponse> findAllByRestaurantId(@Param("restaurantId") Long restaurantId);

        @Query("""
                          SELECT COUNT(o)
                          FROM OrderTable o
                          WHERE o.KhachHang.MaSoNguoiDung = :customerId
                            AND o.isArrival = :isArrival
                        """)
        Long countByCustomerAndStatus(
                        @Param("customerId") Long customerId,
                        @Param("isArrival") Boolean isArrival);

        @Query("""
                            SELECT o FROM OrderTable o
                            WHERE o.Ngay = :currentDate
                              AND o.Gio  <= :oneHourLater
                              AND o.Gio > :now
                        """)
        List<OrderTable> findBookingsToConfirmByCancelRate(
                        @Param("currentDate") LocalDate currentDate,
                        @Param("now") LocalTime now,
                        @Param("oneHourLater") LocalTime oneHourLater);

        @Query("""
                          SELECT COUNT(o)
                          FROM OrderTable o
                          WHERE o.TrangThai= :statusOrder
                            AND o.isArrival = :isArrival
                        """)
        Long countByStatusOrderAndIsArrival(
                        @Param("statusOrder") OrderTableStatus statusOrder,
                        @Param("isArrival") Boolean isArrival);

        @Query(value = "SELECT COUNT(*) FROM \"dondatban\" o " +
                        "WHERE o.\"masonhahang\" = :restaurantId " +
                        "AND EXTRACT(DOW FROM o.\"ngay\") = :dayOfWeek " +
                        "AND o.\"gio\" >= :startTime " +
                        "AND o.\"gio\" < :endTime", nativeQuery = true)
        Long countOrdersByWeekdayAndTimeSlot(
                        @Param("restaurantId") Long restaurantId,
                        @Param("dayOfWeek") int dayOfWeek,
                        @Param("startTime") LocalTime startTime,
                        @Param("endTime") LocalTime endTime);

        @Query(value = "SELECT COUNT(*) FROM \"dondatban\" o " +
                        "WHERE o.\"masonhahang\" = :restaurantId " +
                        "AND EXTRACT(DOW FROM o.\"ngay\") = :dayOfWeek " +
                        "AND o.\"gio\" >= :startTime AND o.\"gio\" < :endTime " +
                        "AND (o.\"isarrival\" = false AND o.\"trangthai\" = 'CANCELLED_REFUNDED')", nativeQuery = true)
        Long countCanceledOrNoShowOrdersByWeekdayAndTimeSlot(
                        @Param("restaurantId") Long restaurantId,
                        @Param("dayOfWeek") int dayOfWeek,
                        @Param("startTime") LocalTime startTime,
                        @Param("endTime") LocalTime endTime);

        @Query(value = "SELECT COUNT(*) FROM \"dondatban\" o " +
                        "WHERE o.\"masonhahang\" = :restaurantId " +
                        "AND o.\"ngay\" = :date " +
                        "AND (o.\"isarrival\" = false AND o.\"trangthai\" = 'CANCELLED_REFUNDED')", nativeQuery = true)
        Long countCanceledOrNoShowOrdersByDateAndTimeSlot(
                        @Param("restaurantId") Long restaurantId,
                        @Param("date") LocalDate date

        );

}
