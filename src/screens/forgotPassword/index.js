import React, { useState } from "react";
import "./styles.scss";
import NormalButton from "../../components/NormalButton";
import NormalInput from "../../components/inputField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleEmailChange = async (event) => {
    setSuccess(true);
  };

  const onSubmit = (data) => {
    navigate("/auth/login");
    console.log(data, "data");
  };
  const customErrorMessages = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Invalid email address",
    },
  };
  return (
    <>
      <form
        className="col-md-6 forgot-password-container mt-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="forgot-container">
          <p className="forgot-content-title">Forgot Password</p>
          <p className="forgot-login-text">
            We’ll e-mail you instructions on how to reset your <br></br>password
          </p>
          <div className="login-input-container">
            <label
              className={`login-input-label ${
                errors.email !== undefined ? "text-danger" : ""
              }`}
            >
              E-mail :
            </label>
            <NormalInput
              type={"text"}
              placeholder={"you@example.com"}
              onChange={handleEmailChange}
              register={register("email", {
                required: customErrorMessages.required,
                pattern: customErrorMessages.pattern,
              })}
              error={errors.email}
              messages={customErrorMessages}
            />
          </div>

          <div className="mt-3">
            <NormalButton label={"Reset Password"} loginBtn />
          </div>
          <div className="text-center mt-3 ">
            <p
              className="login-forgot-text"
              onClick={() => navigate("/auth/login")}
            >
              Go Back to <span className="login-text">Login</span>
            </p>
          </div>
          <div className="login-copy-right">
            Copyright 2023 PennyFlo Ltd
            <div className="login-privacy">
              <p>Privacy Policy </p> <p> Term of Use</p>{" "}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
