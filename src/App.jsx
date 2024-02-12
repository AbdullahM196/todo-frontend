import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./Components/navbar/Navbar";
import Sidebar from "./Components/sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const { isOpen } = useSelector((state) => state.toggle);
  const ToggleSideBar = isOpen ? "content open" : "content closed";
  return location.pathname.startsWith("/auth/") ? (
    <div className="w-100 h-100">
      <Outlet />
    </div>
  ) : (
    <div className="app">
      <Navbar />
      <div className={ToggleSideBar}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
