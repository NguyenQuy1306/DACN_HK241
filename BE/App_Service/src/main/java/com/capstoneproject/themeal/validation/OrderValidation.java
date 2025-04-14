// package com.capstoneproject.themeal.validation;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Component;
// import org.springframework.validation.Errors;
// import org.springframework.validation.ValidationUtils;
// import org.springframework.validation.Validator;

// import com.capstoneproject.themeal.model.entity.ComboAvailable;
// import com.capstoneproject.themeal.model.request.CreateOrderRequest;
// import com.capstoneproject.themeal.repository.CustomerRepository;
// import com.capstoneproject.themeal.repository.RestaurantRepository;
// import com.capstoneproject.themeal.repository.TableAvailableRepository;
// import com.capstoneproject.themeal.repository.UserRepository;

// @Component
// public class OrderValidation implements Validator {
// @Autowired
// private RestaurantRepository restaurantRepository;
// @Autowired
// private TableAvailableRepository tableAvailableRepository;
// @Autowired
// private ComboAvailable comboAvailable;
// @Autowired
// private UserRepository userRepository;

// @Override
// public boolean supports(Class<?> clazz) {
// return CreateOrderRequest.class.equals(clazz);
// }

// @Override
// public void validate(Object target, Errors errors) {
// CreateOrderRequest createOrderRequest = (CreateOrderRequest) target;

// // Kiểm tra xem customer có tồn tại không
// if (!userRepository.existsById(createOrderRequest.getCustomerID())) {
// errors.rejectValue("customerId", "NotFound", " User không tồn tại");
// }

// // Kiểm tra xem restaurant có tồn tại không
// if (!restaurantRepository.existsById(createOrderRequest.getRestaurantId())) {
// errors.rejectValue("restaurantId", "NotFound", "Nhà hàng không tồn tại");
// }

// // Kiểm tra danh sách món ăn có rỗng không
// ValidationUtils.rejectIfEmpty(errors, "foodcreateOrderRequest", "NotEmpty",
// "Danh sách món ăn không được trống");

// }
// }
