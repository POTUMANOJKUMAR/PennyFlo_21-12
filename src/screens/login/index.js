import React, { useEffect, useState } from "react";
import "./styles.scss";
import NormalInput from "../../components/inputField";
import NormalButton from "../../components/NormalButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { REGEX } from "../../utils";
import {
  login,
  saveRememberMe,
  saveUserData,
} from "../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../components/Toast";

const Login = () => {
  let navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const rememberMeSelector = useSelector((state) => state.auth?.isRememberMe);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleEmailChange = async (event) => {
    setSuccess(true);
  };
  useEffect(() => {
    if (rememberMeSelector) {
      // navigateToMain();
      setRememberMe(true);
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data, "data");
    let request = {
      username: data.email,
      password: data.password,
    };
    login(request)
      .then((res) => {
      
        dispatch(saveRememberMe(rememberMe));
        dispatch(saveUserData(res.data.data));
        if(res.status===200){
          navigate("/main/dashboard");
        }
      else{
        Toast({
          type:"error",
          massage:"invalid creditionals"
        })
      }
      })
      .catch((err) => {});
  };
  const customErrorMessages = {
    required: "Email is required",
    pattern: {
      value: REGEX.EMAIL_ID,
      message: "Invalid email address",
    },
  };
  const onChangeRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };
  return (
    <>
      <form
        className="col-md-6 login-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="login-content">
          {" "}
          <p className="content-title">Login</p>
          <p className="login-text">
            Welcome back , please login to your account
          </p>
          <div className="login-input-container">
            <label
              className={`login-input-label ${
                errors.email !== undefined ? "text-danger" : ""
              }`}
            >
              Work Email ID
            </label>
            <NormalInput
              type={"text"}
              onChange={handleEmailChange}
              register={register("email", {
                required: customErrorMessages.required,
                pattern: customErrorMessages.pattern,
              })}
              error={errors.email}
              messages={customErrorMessages}
            />

            <label
              className={`login-input-label ${
                errors.password !== undefined ? "text-danger" : ""
              }`}
            >
              Password
            </label>
            <NormalInput
              type={"password"}
              register={register("password", {
                required: "Password is required",
                // pattern: {
                //   value: REGEX.PASSWORD,
                //   message:
                //     "Password must contain atlease 1 capital letter, 1 special character, 1 number atleast and minimum of 8 characters",
                // },
              })}
              error={errors.password}
              messages={errors}
            />
          </div>
          <div className="login-checkbox-container">
            <div className="d-flex">
              <NormalInput
                type={"checkbox"}
                checkboxInput
                value={rememberMe}
                onChange={onChangeRememberMe}
              />
              <p className="login-checkbox-label">Remember me</p>
            </div>
            <div>
              <p
                className="login-forgot-text"
                onClick={() => navigate("/auth/forgot-password")}
              >
                Forgot Password ?
              </p>
            </div>
          </div>
          <div className="mt-2">
            <NormalButton label={"Sign In"} loginBtn />
          </div>
          <div className="login-copy-right">
            Copyright 2023 PennyFlo Ltd
            <div className="login-privacy">
              <p>Privacy Policy </p> <p> Term of Use</p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
