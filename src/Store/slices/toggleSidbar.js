import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: true,
};
const toggleSidebarSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = toggleSidebarSlice.actions;
export default toggleSidebarSlice;
