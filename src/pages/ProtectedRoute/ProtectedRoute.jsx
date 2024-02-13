import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Store/apiSlices/userSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../../Components/Loading/Loding";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchTodos } from "../../Store/apiSlices/TodosSlice";
import { fetchCategories } from "../../Store/apiSlices/categorySlice";
import { fetchFavorites } from "../../Store/apiSlices/favoriteSlice";

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const { status, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => selectUser(state));
  const location = useLocation();

  useEffect(() => {
    if (status === "succeeded" || user?.userName) {
      dispatch(fetchTodos());
      dispatch(fetchCategories());
      dispatch(fetchFavorites());
    }
  }, [dispatch, status, user]);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  } else if (
    error == "Request failed with status code 401" &&
    !location.pathname.startsWith("/auth/")
  ) {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "You have To login First",
    });
    return <Navigate to="/auth/" replace />;
  } else if (status === "succeeded" || user?.userName) {
    return <Outlet />;
  }
}
