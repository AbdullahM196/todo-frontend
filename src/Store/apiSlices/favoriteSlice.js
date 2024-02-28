import { axiosInstance } from "../../AxiosInstance/AxiosInstance";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { logout } from "./userSlice";
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    const response = await axiosInstance.get("favorite/getAll");
    return response.data;
  }
);
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (todoId) => {
    try {
      const response = await axiosInstance.post("favorite/add", { todoId });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
);
export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`favorite/delete/${id}`);
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
);
const favoritesAdapter = createEntityAdapter({
  selectId: (todo) => {
    if (todo) return todo;
  },
});
const initialState = favoritesAdapter.getInitialState({
  status: "idle",
  error: null,
});
const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, () => initialState)
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        if (action.payload?.todoes) {
          favoritesAdapter.setAll(state, action.payload?.todoes);
        }
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addFavorite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        favoritesAdapter.addOne(state, action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeFavorite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        favoritesAdapter.removeOne(state, action.payload);
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  selectAll: favorites,
  selectById: favoritesById,
  selectIds: favoritesIds,
} = favoritesAdapter.getSelectors((state) => state.favorite);
export default favoriteSlice.reducer;
