import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.jsx";
import { userData } from "./Store/apiSlices/userSlice.js";
import PinnedTodo from "./pages/PinnedTodo/PinnedTodo.jsx";
import Category from "./pages/Category/Category.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
store.dispatch(userData());
if (import.meta.env.VITE_ENV === "production") disableReactDevTools();
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="pinned" element={<PinnedTodo />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Route>
      <Route path="/auth">
        <Route path="register" element={<Register />} />
        <Route index element={<Login />} />
      </Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
