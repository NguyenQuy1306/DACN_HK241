package com.capstoneproject.themeal.model.mapper;

import com.capstoneproject.themeal.repository.FoodImageRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import com.capstoneproject.themeal.model.entity.ComboAvailable;
import com.capstoneproject.themeal.model.entity.ComboAvailableHasFood;
import com.capstoneproject.themeal.model.entity.Customer;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.RestaurantImage;
import com.capstoneproject.themeal.model.request.ComboRequest;
import com.capstoneproject.themeal.model.response.ComboAvailableHasFoodResponse;
import com.capstoneproject.themeal.model.response.CustomerResponse;
import com.capstoneproject.themeal.model.response.FoodResponse;
import com.capstoneproject.themeal.model.response.RestaurantInMapsResponse;

import java.util.Map;
import java.util.List;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class ComboAvailableMapper {

        @Autowired
        private FoodMapper foodMapper;


    public List<ComboAvailableHasFoodResponse> toComboAvailableHasFoodFinalResponse(
                        List<ComboAvailableHasFood> comboAvailableHasFoodList) {

                if (comboAvailableHasFoodList == null || comboAvailableHasFoodList.isEmpty()) {
                        return List.of(); // Return an empty list instead of null for better handling in consumers of
                                          // this
                                          // method
                }

                // Group foods by ComboAvailable ID
                Map<Long, List<FoodResponse>> groupedByCombo = comboAvailableHasFoodList.stream()
                                .collect(Collectors.groupingBy(
                                                combo -> combo.getComboCoSan().getMaSoComBoCoSan(),
                                                Collectors.mapping(
                                                                combo -> foodMapper.toFoodResponse(combo.getMonAn()),
                                                                Collectors.toList())));

                // Convert the map entries into ComboAvailableHasFoodResponse objects
                return groupedByCombo.entrySet().stream()
                                .map(entry -> {
                                        Long comboId = entry.getKey();
                                        List<FoodResponse> foodResponses = entry.getValue();

                                        // Get a representative ComboAvailableHasFood to extract ComboAvailable details
                                        // Đầu tiên trong danh sách map, ta duyệt qua từng cặp <Long,
                                        // List<FoodResponse>, mỗi lần lặp tới cặp nào thì
                                        // tạo đại diện 1 combo có id = với comboId trong Map
                                        // khi tạo được thực thể combo + list food đã có sẵn trong map.
                                        // ta tạo danh sách trả về theo kiểu response
                                        ComboAvailableHasFood representative = comboAvailableHasFoodList.stream()
                                                        .filter(combo -> combo.getComboCoSan().getMaSoComBoCoSan()
                                                                        .equals(comboId))
                                                        .findFirst()
                                                        .orElseThrow(() -> new IllegalStateException(
                                                                        "No matching combo found for ID " + comboId));

                                        return new ComboAvailableHasFoodResponse(
                                                        representative.getComboCoSan().getMaSoComBoCoSan(),
                                                        representative.getComboCoSan().getTen(),
                                                        representative.getComboCoSan().getGia(),
                                                        representative.getComboCoSan().getThoiGianTao(),
                                                        foodResponses);
                                })
                                .collect(Collectors.toList());
        }

        // @Mapping(source = "maSoNguoiDung", target = "maSoKhachHang")
        // @Mapping(source = "hoTen", target = "hoTen")
        // @Mapping(source = "email", target = "email")
        // @Mapping(source = "SDT", target = "SDT")
        // @Mapping(source = "gioiTinh", target = "gioiTinh")
        // @Mapping(source = "ngaySinh", target = "ngaySinh")
        // @Mapping(source = "diaChi", target = "diaChi")
        // ComboAvailable toComboAvailable(ComboRequest comboRequest)
}
