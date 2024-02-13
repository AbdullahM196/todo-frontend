import { axiosInstance } from "../../AxiosInstance/AxiosInstance";
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { selectAllTodos } from "./TodosSlice";
import { logout } from "./userSlice";
export const categoryAdapter = createEntityAdapter({
  selectId: (category) => (category._id ? category._id : category),
});
export const fetchCategories = createAsyncThunk("category/getAll", async () => {
  const response = await axiosInstance.get("category/getAll/");
  return response.data;
});
export const getSingleCategory = createAsyncThunk("category/id", async (id) => {
  const response = await axiosInstance.get(`category/${id}`);
  return response.data;
});
export const createCategory = createAsyncThunk(
  "category/add",
  async (category) => {
    try {
      const response = await axiosInstance.post("category/add", category);
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "category/update",
  async (category) => {
    try {
      const response = await axiosInstance.put(`category/${category.id}`, {
        title: category.title,
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`category/${id}`);
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
);
const initialState = categoryAdapter.getInitialState({
  category: {},
  status: "idle",
  error: null,
});
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logout.fulfilled, () => initialState)
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        categoryAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCategory.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        categoryAdapter.addOne(state, action.payload.category);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        categoryAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { _id } = action.payload;
        categoryAdapter.removeOne(state, _id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoryAdapter.getSelectors((state) => state.category);
export const selectTodosByCategoryId = createSelector(
  [selectAllTodos, (state, categoryId) => categoryId],
  (todos, categoryId) => {
    return todos.filter((todo) => todo.categoryId === categoryId);
  }
);

export default categorySlice.reducer;
