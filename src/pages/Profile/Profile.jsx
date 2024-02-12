import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserData } from "../../Store/apiSlices/userSlice";
import "./profile.css";
import { FaCamera } from "react-icons/fa";
import { useEffect, useState } from "react";
import reactPic from "../../assets/react.svg";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function Profile() {
  const MySwal = withReactContent(Swal);
  const [update, setUpdate] = useState(false);

  const { user } = useSelector(selectUser);
  const [userData, setUserData] = useState({
    img: user.img !== "" ? user.img : reactPic,
    userName: user.userName,
    email: user.email,
  });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({ ...userData, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }, [file, userData]);
  async function handleUpdateUser() {
    try {
      const formData = new FormData();
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.type) && file.size <= 1024 * 1024) {
          formData.append("img", file);
        } else {
          MySwal.fire({
            icon: "error",
            title: "enter a valid image",
            text: "Enter image with these types image/jpeg, image/png, image/jpg and the images dose not be greater than 1Mb",
          });
          return;
        }
      }

      formData.append("userName", userData.userName);
      formData.append("email", userData.email);
      await dispatch(updateUserData(formData)).unwrap();
      setUpdate(false);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      console.log(error);
    }
  }
  return (
    <div className="Profile_page">
      <div className="userImage">
        <img
          src={
            file
              ? userData.img
              : userData.img?.url
              ? userData.img?.url
              : reactPic
          }
          alt={user.userName}
        />
        {update && (
          <label className="editImage">
            <FaCamera />
            <input
              type="file"
              name="userImage"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </label>
        )}
      </div>
      <span className={styles.mainSpan}>
        {!update && <h3 className="userName">{user.userName}</h3>}
        {update && (
          <input
            type="text"
            name="userName"
            placeholder="userName"
            style={styles.inputField}
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
          />
        )}
      </span>

      <span className={styles.mainSpan}>
        {!update && <span> {user.email}</span>}
        {update && (
          <>
            <input
              type="email"
              name="email"
              placeholder="email"
              style={styles.inputField}
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </>
        )}
      </span>
      <button
        className={styles.updateButton}
        onClick={() => {
          update == false ? setUpdate(true) : handleUpdateUser();
        }}
      >
        Update
      </button>
    </div>
  );
}
const styles = {
  mainSpan: "d-flex align-items-center gap-3 fs-4 fw-bold my-2",
  updateButton: "btn btn-success my-3",
  inputField: {
    display: "block",
    width: "100%",
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#212529",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    appearance: "none",
    borderRadius: "0.375rem",
    transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
  },
};
