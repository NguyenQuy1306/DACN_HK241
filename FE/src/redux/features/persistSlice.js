import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myCoords: JSON.parse(localStorage.getItem("myCoords")) || null, // Lấy dữ liệu từ localStorage
  error: "",
  loading: false,
};

export const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    saveMyCoords(state, action) {
      state.myCoords = action.payload;
      localStorage.setItem("myCoords", JSON.stringify(action.payload)); // Lưu vào localStorage
    },
  },
});

export const { saveMyCoords } = persistSlice.actions;
export default persistSlice.reducer;
