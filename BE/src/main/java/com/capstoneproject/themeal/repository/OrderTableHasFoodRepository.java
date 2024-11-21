package com.capstoneproject.themeal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.entity.OrderTableHasComboAvailable;
import com.capstoneproject.themeal.model.entity.OrderTableHasComboAvailableId;
import com.capstoneproject.themeal.model.entity.OrderTableHasFood;
import com.capstoneproject.themeal.model.entity.OrderTableHasFoodId;

import java.util.List;

@Repository
public interface OrderTableHasFoodRepository
        extends JpaRepository<OrderTableHasFood, OrderTableHasFoodId> {

}
