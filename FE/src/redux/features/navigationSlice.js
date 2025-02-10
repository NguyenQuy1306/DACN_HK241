import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    activeTab: "Chi tiết",
    activeTabMenu: "Các combo có sẵn",
    shouldScroll: false,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setShouldScroll: (state, action) => {
      state.shouldScroll = action.payload;
    },
    setActiveTabMenu: (state, action) => {
      state.activeTabMenu = action.payload;
    },
  },
});
export const activeTabmenu = (state) => state.navigation.navigation;
export const shouldScroll = (state) => state.navigation.navigation;
export const { setActiveTab, setActiveTabMenu, setShouldScroll } =
  navigationSlice.actions;
export default navigationSlice.reducer;
