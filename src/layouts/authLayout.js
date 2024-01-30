import React from "react";
import "./layout.scss";
import assets from "../assets";

export function AuthLayout(props) {
  return (
    <div className="login-main-container">
      <div className="firstLog col-md-6 col-sm-12">
        <div className="login-background-container">
          <div className="logo-container">
            <img src={assets.Images.logo} alt="logo" className="login-logo" />
          </div>
          <img src={assets.Images.login} alt="login" className="login-image" />
          <div className="login-footer-container">
            <div className="footer-title">
              The most complete cash flow software on the market
            </div>
            <span className="footer-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </span>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default AuthLayout;
