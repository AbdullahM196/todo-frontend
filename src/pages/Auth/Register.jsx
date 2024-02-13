import { Link, useNavigate } from "react-router-dom";
import "./forms.css";
import { register } from "../../Store/apiSlices/userSlice";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loding";

export default function Register() {
  const dispatch = useDispatch();
  const registerStatus = useSelector((state) => state.auth.status);
  const registerError = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  useEffect(() => {
    if (!registerError) {
      navigate("/");
    }
  }, [navigate, registerError]);
  useEffect(() => {
    const emailReg = /^[a-zA-Z0-9.]{2,}@((gmail|yahoo|outlook)\.com)$/i;
    userName.length == 0
      ? setUserNameError("User Name is Required")
      : setUserNameError("");
    email.length == 0
      ? setEmailError("Email is Required")
      : email.match(emailReg)
      ? setEmailError("")
      : setEmailError("You have To set correct Structure for email");
    password.length == 0
      ? setPasswordError("Password is Required")
      : password.length < 6
      ? setPasswordError("Password must be more than 6 characters")
      : setPasswordError("");
    confirmPassword == password
      ? setConfirmPasswordError("")
      : setConfirmPasswordError(
          "password and confirmPassword have to be the same"
        );
  }, [userName, email, password, confirmPassword]);
  const canSave = [
    userNameError,
    emailError,
    passwordError,
    confirmPasswordError,
  ].every((x) => !x);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPasswordPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (canSave) {
      try {
        await dispatch(register({ userName, email, password })).unwrap();
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      }
    }
  }
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  function toggleConfirmPassword() {
    setShowConfirmPassword(!showConfirmPasswordPassword);
  }

  return (
    <div id="AuthForm">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              name="userName"
              value={userName}
              onChange={(evt) => {
                setUserName(evt.target.value);
              }}
            />
            <span>userName</span>
          </label>
          <span className="text-danger">{userNameError}</span>
        </div>
        <div className="d-flex flex-column">
          <label>
            <input
              className="input"
              type="email"
              placeholder=""
              required
              value={email}
              onChange={(evt) => {
                setEmail(evt.target.value);
              }}
              name="email"
            />
            <span>Email</span>
          </label>
          <span className="text-danger">{emailError}</span>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center">
            <label style={{ width: "75%" }}>
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder=""
                required
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
                name="password"
              />
              <span>Password</span>
            </label>
            {showPassword ? (
              <AiFillEyeInvisible
                style={{ width: "25%" }}
                onClick={togglePassword}
              />
            ) : (
              <AiFillEye style={{ width: "25%" }} onClick={togglePassword} />
            )}
          </div>
          <span style={{ color: "red" }}>{passwordError}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "75%" }}>
              <input
                className="input"
                type={showConfirmPasswordPassword ? "text" : "password"}
                placeholder=""
                required
                value={confirmPassword}
                onChange={(evt) => {
                  setConfirmPassword(evt.target.value);
                }}
                name="confirmPassword"
              />
              <span>Confirm password</span>
            </label>
            {showConfirmPasswordPassword ? (
              <AiFillEyeInvisible
                style={{ width: "25%" }}
                onClick={toggleConfirmPassword}
              />
            ) : (
              <AiFillEye
                style={{ width: "25%" }}
                onClick={toggleConfirmPassword}
              />
            )}
          </div>
          <span style={{ color: "red" }}>{confirmPasswordError}</span>
        </div>
        {registerStatus == "loading" && <Loading />}
        <button type="submit" className="submit">
          Submit
        </button>
        <p className="signin">
          Already have an account ? <Link to={"/auth/"}>Sign in</Link>{" "}
        </p>
      </form>
    </div>
  );
}
