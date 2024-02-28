import { axiosInstance } from "../../AxiosInstance/AxiosInstance";
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { logout } from "./userSlice";
export const fetchTodos = createAsyncThunk("todos/getAll", async () => {
  const response = await axiosInstance.get("todo/getAll/");
  return response.data;
});
export const addNewTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  try {
    const response = await axiosInstance.post("todo/add/", newTodo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    return Promise.reject(err.response.data.message);
  }
});
export const updateExistingTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, body }) => {
    try {
      const response = await axiosInstance.put(`todo/${id}/`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  }
);
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  try {
    const response = await axiosInstance.delete(`todo/${id}/`);
    return response.data;
  } catch (err) {
    return Promise.reject(err.response.data.message);
  }
});

const todoAdapter = createEntityAdapter({
  selectId: (todo) => todo?._id,
});

const initialState = todoAdapter.getInitialState({
  status: "idle",
  error: null,
});
const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, () => initialState)
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        todoAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        todoAdapter.addOne(state, action.payload.todo);
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateExistingTodo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateExistingTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        todoAdapter.upsertOne(state, action.payload.updatedTodo);
      })
      .addCase(updateExistingTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const id = action.payload.deletedTodo._id;
        todoAdapter.removeOne(state, id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: todosAllIds,
} = todoAdapter.getSelectors((state) => state.todo);
export default todoSlice.reducer;
