import { axiosInstance } from "../../AxiosInstance/AxiosInstance";
import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};
export const register = createAsyncThunk("register", async (user) => {
  try {
    const response = await axiosInstance.post("user/register", user);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return Promise.reject(err.response.data.message);
  }
});
export const login = createAsyncThunk("login", async (user) => {
  try {
    const response = await axiosInstance.post("user/login/", user);
    return response.data;
  } catch (err) {
    return Promise.reject(err.response.data.message);
  }
});
export const logout = createAsyncThunk("logout", async () => {
  const response = await axiosInstance.post("/user/logout");
  return response.data;
});
export const userData = createAsyncThunk("profile", async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data;
});
export const updateUserData = createAsyncThunk(
  "/user/editProfile/",
  async (user) => {
    try {
      const response = await axiosInstance.put("/user/editProfile/", user, {
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.error = "Request failed with status code 401";
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(userData.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload;
      })
      .addCase(userData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserData.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
// export const user = (state) => state.user.user;
export const selectUser = createSelector(
  (state) => state.auth.user,
  (user) => ({ user })
);

export default authSlice.reducer;
