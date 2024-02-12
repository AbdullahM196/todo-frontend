import { configureStore } from "@reduxjs/toolkit";
import toggleSidebarSlice from "./slices/toggleSidbar";
import authReducer from "./apiSlices/userSlice";
import categoryReducer from "./apiSlices/categorySlice";
import todoReducer from "./apiSlices/TodosSlice";
import favoriteReducer from "./apiSlices/favoriteSlice";
const store = configureStore({
  reducer: {
    toggle: toggleSidebarSlice.reducer,
    category: categoryReducer,
    todo: todoReducer,
    favorite: favoriteReducer,
    auth: authReducer,
  },
  devTools: false,
});
export default store;
