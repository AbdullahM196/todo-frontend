import { AiOutlineHome } from "react-icons/ai";
import { MdPushPin } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryList from "../CategoryList/CatgeoryList";
import { useLayoutEffect, useState } from "react";
import { logout } from "../../Store/apiSlices/userSlice";
import { closeSidebar } from "../../Store/slices/toggleSidbar";
export default function Sidebar() {
  const [screenWidth, setScreen] = useState(window.innerWidth);

  useLayoutEffect(function () {
    function handleResize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen } = useSelector((state) => state.toggle);
  if (screenWidth < 500) {
    dispatch(closeSidebar());
  }

  const [active, setActive] = useState(location.pathname);
  const ToggleSideBar = isOpen ? "navItem oneLine" : "navItem column";
  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate("/auth/");
  };
  return (
    <div className="sidebar" style={{ maxWidth: isOpen ? "180px" : "100px" }}>
      <div
        className={`${ToggleSideBar} ${active == "/home" ? "active" : ""}`}
        onClick={() => {
          navigate("/");
          setActive("/home");
        }}
      >
        <AiOutlineHome />
        <span>Home</span>
      </div>
      <div
        className={`${ToggleSideBar} ${active == "/pinned" ? "active" : ""}`}
        onClick={() => {
          navigate("/pinned");
          setActive("/pinned");
        }}
      >
        <MdPushPin />
        <span>Pinned</span>
      </div>
      <CategoryList
        mode={"display"}
        style={ToggleSideBar}
        active={active}
        setActive={setActive}
        isOpen={isOpen}
      />
      <div
        className={`${ToggleSideBar} ${active == "/profile" ? "active" : ""}`}
        onClick={() => {
          setActive("/profile");
          navigate("/profile");
        }}
      >
        <CgProfile />
        <span> Profile</span>
      </div>
      <div className={ToggleSideBar} onClick={handleLogout}>
        <TbLogout2 />
        <span>Logout</span>
      </div>
    </div>
  );
}
