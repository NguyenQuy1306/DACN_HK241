import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để xử lý lỗi authentication
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Có thể dispatch action để logout hoặc refresh token
      window.location.href = "/login";
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

// Food APIs
export const getFood = async (params) => {
  try {
    const response = await API.get(`api/food`, { params });
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

export const logout = async () => {
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

export const createOrder = async (params) => {
  try {
    const response = await API.post(`api/orders`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getRateInRestaurant = async (params) => {
  try {
    console.log("aaaaaaa", `/api/rate/${params.restaurantId}/restaurant`);
    const response = await API.get(
      `/api/rate/${params.restaurantId}/restaurant`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
