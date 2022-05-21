import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//material
import {
  TextField,
  Input,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button } from "@material-ui/core";

import "./LoginContent.scss";
import logo from "../../../assets/T X T L.png";
import { login } from "../../../actions/user.action";
import LoginError from "./LoginError";

const LoginContent = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState({ error: false, message: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.user.status);
  const userRole = useSelector((state) => state.user.role);

  useEffect(() => {
    if (loginStatus === null) {
      setHasError({ error: false, message: "" });
    } else if (loginStatus === "failed" || userRole !== "ROLE_ADMIN") {
      setHasError({ error: true, message: "Email Hoặc Mật Khẩu Không Đúng" });
    } else {
      setHasError({ error: false, message: "" });
      navigate(`/Dashboard`, { replace: false });
    }
  }, [loginStatus, userRole, navigate]);

  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getPassword = (event) => {
    setPassword(event.target.value);
  };

  const getEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    const loginObject = {
      email: email,
      password: password,
    };

    dispatch(login(loginObject));
  };

  return (
    <div id="loginContent">
      <img src={logo} alt="logo" />
      <h2>ĐĂNG NHẬP</h2>

      {hasError.error && <LoginError message={hasError.message} />}

      <div className="input-container">
        <TextField
          id="email"
          label="Email"
          className="text-field"
          onChange={getEmail}
        />
        <FormControl className="text-field">
          <InputLabel htmlFor="password">Mật khẩu</InputLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onChange={getPassword}
          />
        </FormControl>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="btn"
        onClick={handleSubmit}
      >
        Đăng Nhập
      </Button>
    </div>
  );
};

export default LoginContent;
