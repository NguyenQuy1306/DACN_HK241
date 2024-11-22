import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    activeTab: "Chi tiết",
    activeTabMenu: "Các combo có sẵn",
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveTabMenu: (state, action) => {
      state.activeTabMenu = action.payload;
    },
  },
});

export const { setActiveTab, setActiveTabMenu } = navigationSlice.actions;
export default navigationSlice.reducer;
