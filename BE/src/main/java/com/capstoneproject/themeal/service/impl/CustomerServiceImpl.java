package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.RestaurantMongoDB;
import com.capstoneproject.themeal.model.entity.UserBehaviorLog;
import com.capstoneproject.themeal.model.request.ClickEvent;
import com.capstoneproject.themeal.repository.RestaurantMongoDbRepository;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import com.capstoneproject.themeal.repository.UserBehaviorLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstoneproject.themeal.model.entity.Customer;
import com.capstoneproject.themeal.model.mapper.CustomerMapper;
import com.capstoneproject.themeal.model.response.CustomerResponse;
import com.capstoneproject.themeal.repository.CustomerRepository;
import com.capstoneproject.themeal.service.CustomerService;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantMongoDbRepository restaurantMongoDbRepository;
    @Autowired
    private UserBehaviorLogRepository userBehaviorLogRepository;

    @Override
    public Optional<CustomerResponse> getCustomerById(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            System.out.println(customer);
            System.out.println(customer.map(CustomerMapper.INSTANCE::toCustomerResponse));
        }

        return customer.map(CustomerMapper.INSTANCE::toCustomerResponse);
    }

    @Override
    public void trackUserBehavior(ClickEvent event) {
        Restaurant restaurant = restaurantRepository.findById(event.getRestaurantId())
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));
        System.out.println("restaurant1");
        RestaurantMongoDB restaurantMongo = new RestaurantMongoDB();
        restaurantMongo.setMaSoNhaHang(restaurant.getMaSoNhaHang());
        restaurantMongo.setTen(restaurant.getTen());
        restaurantMongo.setDiaChi(restaurant.getDiaChi());
        restaurantMongo.setLoaiHinh(restaurant.getLoaiHinh());
        restaurantMongo.setPhuHop(restaurant.getPhuHop());
        restaurantMongo.setMonDacSac(restaurant.getMonDacSac());
        restaurantMongo.setMoTaKhongGian(restaurant.getMoTaKhongGian());
        restaurantMongo.setDiemDacTrung(restaurant.getDiemDacTrung());
        System.out.println("restaurant2");
        UserBehaviorLog log = new UserBehaviorLog();
        log.setUserId(event.getUserId());
        log.setTimestamp(event.getTimestamp());
        log.setRestaurant(restaurantMongo);
        System.out.println("restaurant3");
        userBehaviorLogRepository.save(log);
        System.out.println("restaurant4");
    }

}
