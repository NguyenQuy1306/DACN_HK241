package com.capstoneproject.themeal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.model.entity.ComboAvailable;
import com.capstoneproject.themeal.model.entity.ComboAvailableHasFood;
import com.capstoneproject.themeal.model.entity.ComboAvailableHasFoodId;
import com.capstoneproject.themeal.model.entity.Food;
import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.entity.OrderTableHasComboAvailable;
import com.capstoneproject.themeal.model.entity.OrderTableHasComboAvailableId;
import com.capstoneproject.themeal.model.entity.OrderTableHasFood;
import com.capstoneproject.themeal.model.entity.OrderTableHasFoodId;
import com.capstoneproject.themeal.model.entity.PaymentMethod;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.TableAvailable;
import com.capstoneproject.themeal.model.entity.TableAvailableId;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.mapper.OrderTableMapper;
import com.capstoneproject.themeal.model.request.ComboRequest;
import com.capstoneproject.themeal.model.request.FoodOrderRequest;
import com.capstoneproject.themeal.model.response.ComboAvailableHasFoodResponse;
import com.capstoneproject.themeal.model.response.FoodResponse;
import com.capstoneproject.themeal.model.response.OrderTableResponse;
import com.capstoneproject.themeal.repository.ComboAvailableRepository;
import com.capstoneproject.themeal.repository.FoodRepository;
import com.capstoneproject.themeal.repository.OrderTableHasComboAvailableRepository;
import com.capstoneproject.themeal.repository.OrderTableHasFoodRepository;
import com.capstoneproject.themeal.repository.OrderTableRepository;
import com.capstoneproject.themeal.repository.TableAvailableRepository;
import com.capstoneproject.themeal.service.OrderTableService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderTableServiceImpl implements OrderTableService {
        @Autowired
        private OrderTableRepository orderTableRepository;
        @Autowired
        private TableAvailableRepository tableAvailableRepository;
        @Autowired
        private ComboAvailableRepository comboAvailableRepository;
        @Autowired
        private OrderTableHasComboAvailableRepository orderTableHasComboAvailableRepository;
        @Autowired
        private FoodRepository foodRepository;
        @Autowired
        private OrderTableHasFoodRepository orderTableHasFoodRepository;

        @Override
        public List<OrderTableResponse> getOrderTableByCustomerId(Long customerId) {
                List<OrderTable> orderTables = orderTableRepository.findByMaSoKhachHang(customerId);
                return orderTables.stream().map(OrderTableMapper.INSTANCE::toOrderTableResponse)
                                .collect(Collectors.toList());
        }

        @Override
        public OrderTable saveOrderTable(User user, PaymentMethod paymentMethod, Restaurant restaurant, Short tableId) {
                TableAvailableId tableAvailableId = new TableAvailableId(restaurant.getMaSoNhaHang(), tableId);
                TableAvailable tableAvailable = tableAvailableRepository.findById(tableAvailableId)
                                .orElseThrow(() -> new NotFoundException("Table not found"));
                ;
                OrderTable orderTable = OrderTable.builder()
                                .SoKhach(tableAvailable.getSoNguoi())
                                .Ngay(tableAvailable.getNgay())
                                .Gio(tableAvailable.getGio())
                                .TrangThai("Hoàn thành")
                                .KhachHang(user)
                                .NhaHang(restaurant)
                                .build();
                orderTableRepository.save(orderTable);
                return orderTable;
        }

        @Override
        public void saveOrderTableHasComboAvailable(Long comboId, OrderTable orderTable) {
                ComboAvailable comboAvailable = comboAvailableRepository.findById(comboId)
                                .orElseThrow(() -> new NotFoundException("Combo not found"));
                OrderTableHasComboAvailableId orderTableHasComboAvailableId = new OrderTableHasComboAvailableId(
                                orderTable.getMaSoDatBan(), comboId);
                OrderTableHasComboAvailable orderTableHasComboAvailable = OrderTableHasComboAvailable.builder()
                                .DonDatBan(orderTable)
                                .MaSo(orderTableHasComboAvailableId)
                                .ComboCoSan(comboAvailable)
                                .build();
                orderTableHasComboAvailableRepository.save(orderTableHasComboAvailable);
        }

        @Override
        public OrderTableResponse mapping(OrderTable orderTable) {
                OrderTableMapper mapper = OrderTableMapper.INSTANCE;
                return mapper.toOrderTableResponse(orderTable);

        }

        @Override
        public void saveOrderTableHasFood(OrderTable orderTable, FoodOrderRequest foodOrderRequests) {
                Food food = foodRepository.findById(foodOrderRequests.getMaSoMonAn())
                                .orElseThrow(() -> new NotFoundException("Food not found"));
                OrderTableHasFoodId orderTableHasFoodId = new OrderTableHasFoodId(orderTable.getMaSoDatBan(),
                                foodOrderRequests.getMaSoMonAn());
                OrderTableHasFood orderTableHasFood = OrderTableHasFood.builder()
                                .DonDatBan(orderTable)
                                .MaSo(orderTableHasFoodId)
                                .MonAn(food)
                                .SoLuong(foodOrderRequests.getSoLuong())
                                .build();
                orderTableHasFoodRepository.save(orderTableHasFood);
        }

        // @Override
        // public OrderTableHasFood createCombo(Long maSoNhaHang, ComboRequest
        // comboRequest) {
        // ComboAvailableHasFoodResponse comboAvailableHasFoodResponses = new
        // ComboAvailableHasFoodResponse();
        // ComboAvailable comboAvailable = ComboAvailable.builder()
        // .Ten(comboRequest.getTen())
        // .Gia(comboRequest.getGia())
        // .ThoiGianTao(comboRequest.getThoiGianTao()).build();
        // ComboAvailable comboAvailable2 =
        // comboAvailableRepository.save(comboAvailable);
        // List<Long> listIdFood = new ArrayList<Long>();

        // listIdFood = comboRequest.getFoods().stream().map(FoodResponse::getMaSoMonAn)
        // .collect(Collectors.toList());
        // ComboAvailableHasFoodId comboAvailableHasFoodId = new
        // ComboAvailableHasFoodId();
        // List<ComboAvailableHasFood> comboAvailableHasFoods = listIdFood.stream()
        // .map(id -> {
        // ComboAvailableHasFoodId comboId = new ComboAvailableHasFoodId(
        // comboAvailable2.getMaSoComBoCoSan(),
        // id);
        // Food food = foodRepository.findById(id).orElse(null);
        // return new ComboAvailableHasFood(comboId, comboAvailable2, food);
        // })
        // .collect(Collectors.toList());
        // comboAvailableHasFoodRepository.saveAll(comboAvailableHasFoods);
        // return comboAvailableHasFoodResponses;

        // }
}
