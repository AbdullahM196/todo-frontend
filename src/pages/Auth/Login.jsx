import { Link, Navigate, useNavigate } from "react-router-dom";
import "./forms.css";
import { login, selectUser } from "../../Store/apiSlices/userSlice";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loding";
import { Form } from "react-bootstrap";

export default function Login() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUser(state));
  const { status, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (user.userName) {
      navigate("/");
      <Navigate to="/" replace />;
    }
  }, [navigate, user]);
  useEffect(() => {
    const emailReg = /^[a-zA-Z0-9.]{2,}@((gmail|yahoo|outlook)\.com)$/i;
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
  }, [email, password]);
  const canSave = [emailError, passwordError].every((x) => !x);
  const handleLogin = async () => {
    if (canSave) {
      try {
        await dispatch(login({ email, password })).unwrap();
        setEmail("");
        setPassword("");
        navigate("/");
        // console.log("success");
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
        console.log({ err });
      }
    }
  };
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div id="LoginForm">
      <Form className="form">
        <p className="title">Login </p>
        <p className="message">Welcome Back </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            <input
              className="input"
              type="email"
              placeholder=""
              required
              onChange={(evt) => {
                setEmail(evt.target.value);
              }}
              name="email"
            />
            <span>Email</span>
          </label>
          <span style={{ color: "red" }}>{emailError}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "75%" }}>
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder=""
                required
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
          <span className="text-danger">{passwordError}</span>
        </div>

        <button
          onClick={handleLogin}
          className="submit"
          disabled={status == "loading"}
        >
          Submit
        </button>
        <p className="signin">
          Do not have an account ? <Link to={"/auth/register"}>Sign up</Link>{" "}
        </p>
      </Form>
    </div>
  );
}
