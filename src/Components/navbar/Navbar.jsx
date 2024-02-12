import { GiHamburgerMenu } from "react-icons/gi";
import { LuListTodo } from "react-icons/lu";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../Store/slices/toggleSidbar";
import reactPic from "../../assets/react.svg";
import { selectUser } from "../../Store/apiSlices/userSlice";
export default function Navbar() {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  function toggleSideBar() {
    dispatch(toggleSidebar());
  }
  return (
    <nav>
      <GiHamburgerMenu onClick={toggleSideBar} />
      <div className="logo">
        <LuListTodo /> Todo WebSite
      </div>
      <div className="profile">
        <img
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
          src={user.img?.url !== "" ? user.img.url : reactPic}
          alt="useProfile"
        />
      </div>
    </nav>
  );
}
