import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/util";

const API = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Có thể dispatch action để logout hoặc refresh token
      import("./store").then(({ store }) => {
        import("./features/authenticationSlice").then(({ logout }) => {
          store.dispatch(logout());
        });
      });

      toast.error("Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại");
      setTimeout(() => {
        window.location.href = "/Home";
      }, 2000);
    }
    return Promise.reject(error);
  }
);

// Restaurants APIs
export const getRestaurants = () => API.get(`api/restaurants`);

export const getRestaurantsInMaps = async (params) => {
  try {
    const response = await API.get(`api/restaurants/list-in-boundary`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//Order history

export const getOrderHistory = async ({ userId }) => {
  try {
    const response = await API.get(`api/orders/customer/${userId}/history`);
    console.log(" RAW Order history:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//favorite APIs

export const addNewList = async ({ userId }) => {
  try {
    const response = await API.post(`api/favorite-list/add-new-card/${userId}`);
    console.log(" RAW Order history:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getList = async ({ userId }) => {
  try {
    const response = await API.get(`api/favorite-list/${userId}`);
    console.log(" RAW Order history:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Food APIs
export const getFood = async (params) => {
  try {
    const response = await API.get(`api/food`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getFoodById = async (restaurantId, foodId) => {
  try {
    const response = await API.get(`api/food/${foodId}`, {
      params: { restaurantId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteFood = async (params) => {
  try {
    const response = await API.delete(`api/food`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const duplicateFood = async (params) => {
  try {
    const response = await API.post(`api/food/duplicate`, null, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const searchFood = async (params) => {
  try {
    const response = await API.get(`api/food/search`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getFoodByCategory = async (params) => {
  try {
    const response = await API.get(`api/food/category`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Combo APIs
export const getComboAvailable = async (params) => {
  try {
    const response = await API.get(`api/combo`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createComboByUser = async (params) => {
  try {
    const response = await API.post(`api/combo`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Table APIs
export const getTableForRestaurant = async (params) => {
  try {
    console.log(
      "params in al ",
      await API.get(`api/table/restaurant`, { params })
    );
    const response = await API.get(`api/table/restaurant`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const getTableForRestaurantByOwner = async (params) => {
  try {
    console.log(
      "params in al ",
      await API.get(`api/table/restaurant`, { params })
    );
    const response = await API.get(`api/table/restaurant`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// Authentication APIs
export const register = async (params) => {
  try {
    const response = await API.post(`/api/v1/auth/register`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const login = async (params) => {
  try {
    const response = await API.post(`/api/v1/auth/authenticate`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logoutAPI = async () => {
  try {
    const response = await API.post(`/api/v1/auth/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const checkSession = async () => {
  try {
    const response = await API.get(`/api/v1/auth/session-info`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createOrder = async ({ request, totalAmount, deposit }) => {
  try {
    const queryParams = `?totalAmount=${totalAmount}&deposit=${deposit}`;
    console.log("queryParams", queryParams);
    const response = await API.post(
      `api/orders${queryParams}`,
      request // Gửi request body đúng cách
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const getOrdersByRestaurantId = async ({ restaurantId }) => {
  try {
    const response = await API.get(
      `api/orders/all/${restaurantId}` // Gửi request body đúng cách, // Gửi request body đúng cách
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createPayment = async (params) => {
  try {
    console.log("params createPayment", params);
    const response = await API.post(
      `api/payments?paymentAmount=${params.paymentAmount}&maSoThanhToan=${params.maSoThanhToan}&maSoDatBan=${params.maSoDatBan}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await API.get(`api/orders/all`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getRateInRestaurant = async (params) => {
  try {
    const response = await API.get(
      `/api/rate/restaurant/${params.restaurantId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getKeywords = async (params) => {
  try {
    const response = await API.get(`/elas/searchByKeyword`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const searchByKeyword = async (params) => {
  try {
    const response = await API.get(`/elas/searchWithKeyword`, { params });
    return response.data;
  } catch (error) {
    return error.response?.data || error;
  }
};

export const createPaymentLink = async ({ deposit, request, RETURN_URL }) => {
  try {
    const queryParams = deposit ? `?deposit=${deposit}` : "";
    const queryParams2 = RETURN_URL
      ? `&returnUrl=${encodeURIComponent(RETURN_URL)}`
      : "";
    console.log("requestrequest", request, "deposit", deposit);

    const response = await API.post(
      `api/payments/create-payment-link${queryParams}${queryParams2}`,
      request // Gửi request body đúng cách
    );
    console.log("data from payment controller: ", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getOrder = async (params) => {
  try {
    const response = await API.get(`/api/payments/getOrderById`, { params });
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const cancelOrder = async ({ orderId }) => {
  try {
    const response = await API.get(`/api/orders/${orderId}/cancel-arrival`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const paymentCallback = async (params) => {
  try {
    console.log("paymentCallback", params);
    const response = await API.post(`/api/payments/payment-callback`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDepositPolicy = async (params) => {
  try {
    const response = await API.get(`/api/payments/deposit`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//Restaurant APIs

export const getRateOfRestaurant = async ({ restaurantId }) => {
  try {
    const response = await API.get(`/api/rate/${restaurantId}/restaurant`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const getAllRestaurant = async () => {
  try {
    const response = await API.get(`/api/restaurants/all`);
    // console.log("=============================", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//FoodImage APIs

export const getFoodImage = async (params) => {
  try {
    const response = await API.post(`/api/foodImage`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteFoodImage = async (params) => {
  try {
    const response = await API.delete(`/api/foodImage`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const uploadFoodImage = async ({
  restaurantId,
  categoryId,
  foodId,
  file,
}) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await API.post(
      `/api/food/restaurants/${restaurantId}/categories/${categoryId}/foods/${foodId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//Category APIs
export const getAllCategory = async (params) => {
  try {
    const response = await API.get(`/api/category`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const searchCategory = async (params) => {
  try {
    const response = await API.get(`/api/category/search`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createCategory = async ({ restaurantId }) => {
  try {
    const response = await API.post(
      `/api/category/add?restaurantId=${restaurantId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const deleteCategory = async (params) => {
  try {
    const response = await API.delete(`/api/category`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const updateCategory = async (categoryId, params) => {
  try {
    const response = await API.post(
      `/api/category/update?categoryId=${categoryId}`,
      params
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getRestaurantByOwnerId = async (params) => {
  try {
    const response = await API.get(`/api/restaurants`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getRestaurantById = async ({ id }) => {
  try {
    const response = await API.get(`/api/restaurants/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateFood = async (params) => {
  try {
    const response = await API.post(`/api/food/update`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateRestaurantInfor = async (params) => {
  try {
    console.log("params", params);
    const response = await API.put(`/api/restaurants`, params, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginWithGoogle = async (params) => {
  try {
    const response = await API.post(`/oauth2/authorization/google`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const createTableForRestaurant = async (params) => {
  try {
    const response = await API.post(
      `/api/table/restaurant?restaurantId=${params.restaurantId}`,
      params.tableRequests
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteTableForRestaurant = async (params) => {
  try {
    const response = await API.delete(`api/table`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateCountOfTable = async (params) => {
  try {
    const response = await API.put(
      `/api/table?restaurantId=${params.restaurantId}&thuTuBan=${params.thuTuBan}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateOrderStatus = async (params) => {
  try {
    const response = await API.put(
      `/api/orders/updateOrderStatus?orderId=${params.orderId}&newStatus=${params.newStatus}&restaurantId=${params.restaurantId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const createFood = async ({
  restaurantId,
  categoryId,
  foodRequest,
  file,
}) => {
  try {
    const formData = new FormData();
    formData.append(
      "foodRequest",
      new Blob([JSON.stringify(foodRequest)], { type: "application/json" })
    ); // Convert JSON to Blob
    formData.append("file", file);

    const response = await API.post(
      `/api/food/restaurants/${restaurantId}/categories/${categoryId}`,
      formData, // Send formData instead of an object
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error.response?.data || error;
  }
};

export const sendUserBehavior = async (params) => {
  try {
    const response = await API.post(`/api/behavior`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const trackUserBehavior = async (params) => {
  try {
    const response = await API.post(`/api/customer/trackUserBehavior`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUserInfo = async (params) => {
  try {
    const response = await API.post(`/api/customer/update`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getOverbookingSettings = async (params) => {
  try {
    const response = await API.get(`/api/overbooking/settings`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getOverBookingByTimeSlot = async (params) => {
  try {
    const response = await API.get(`/api/orders/rate/${params.restaurantId}`, {
      params: {
        startTime: params.startTime,
        endTime: params.endTime,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const saveSettings = async (params) => {
  try {
    const response = await API.post(`/api/overbooking/settings`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const addThreshold = async (params) => {
  try {
    const response = await API.post(`/api/overbooking/thresholds`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const removeThreshold = async ({ id }) => {
  try {
    const response = await API.delete(`api/overbooking/thresholds/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateThreshold = async (params) => {
  try {
    console.log("params", params);
    const response = await API.put(
      `/api/overbooking/thresholds/${params.id}`,
      params
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createOverrides = async (params) => {
  try {
    const response = await API.post(`/api/overbooking/overrides`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteOverrides = async ({ id }) => {
  try {
    const response = await API.delete(`api/overbooking/overrides/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const updateStatusRefund = async (params) => {
  try {
    const response = await API.put(
      `/api/orders/orderRefund?status=${params.status}&totalRefund=${params.totalRefund}&orderId=${params.orderId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const updateOverrides = async (params) => {
  try {
    console.log("params", params);
    const response = await API.put(
      `/api/overbooking/overrides/${params.id}`,
      params
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
