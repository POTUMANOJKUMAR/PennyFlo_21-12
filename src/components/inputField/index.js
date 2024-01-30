import React, { useState ,useEffect} from "react";
import "./styles.scss";
import assets from "../../assets";
import FormErrorMessage from "../ErrorMessage";
import { Toast } from "../Toast";

const NormalInput = ({
  type,
  placeholder,
  loginInput,
  checked,
  defaultChecked,
  normalInput,
  rightIcon,
  name,
  value,
  onChange,
  onIconClick,
  disabled,
  isClicked,
  onClick,
  className,
  leftIcon,
  emailIcon,
  successIcon,
  passwordIcon,
  eyeIcon,
  checkboxInput,
  register,
  error,
  messages,
  freeze,
  searchIcon,
  dollarIcon,
  chatSendIcon,
  chatInputStyle,
  onsendclear
}) => {
  const [inputType, setInputType] = useState(type ? type : "text");

  const toggleIsPassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const hasError = error !== undefined;
 
  const messageSend = () => {
    onsendclear()
  Toast({
      type: "success",
      message: "Message Sent Successfully"
    });
  };

  
  return (
    <>
      <div className={`input-field-container  ${className}`}>
        <input
          type={inputType}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          {...register}
          onClick={onClick}
          onChange={onChange}
          disabled={disabled}
          className={`${
            checkboxInput
              ? "checkbox-input"
              : leftIcon
              ? "left-input-field"
              : "input-field"
          } ${hasError ? "input-error" : ""} ${
            inputType === "password" ? "password-input" : ""
          } ${
            freeze
              ? "freeze"
              : searchIcon
              ? "searchIconInput"
              : chatInputStyle
              ? "chatInputStyle"
              : ""
          }`}
          placeholder={placeholder}
        />

        {leftIcon && emailIcon && !hasError ? (
          <div onClick={onIconClick} className="left-icon-container">
            <img
              className="left-input-icon"
              src={assets.Icons.email}
              alt="copy"
            />{" "}
          </div>
        ) : leftIcon && emailIcon && hasError ? (
          <div onClick={onIconClick} className="left-icon-container">
            <img
              className="left-input-icon"
              src={assets.Icons.emailError}
              alt="copy"
            />{" "}
          </div>
        ) : leftIcon && passwordIcon ? (
          <div onClick={onIconClick} className="left-icon-container">
            <img
              className="password-icon"
              src={assets.Icons.password}
              alt="copy"
            />{" "}
          </div>
        ) : leftIcon && searchIcon ? (
          <div onClick={onIconClick} className="left-icon-container">
            <img
              className="search-icon"
              src={assets.Icons.searchbar}
              alt="copy"
            />{" "}
          </div>
        ) : leftIcon && dollarIcon ? (
          <div className="dollar-icons-container">
            <img
              className="dollar-icon"
              src={assets.Icons.dollarBig}
              alt="dollar"
            />{" "}
          </div>
        ) : (
          ""
        )}
        {rightIcon && !hasError && successIcon ? (
          <div onClick={onIconClick} className="right-icon-container">
            <img
              className="right-input-icon"
              src={assets.Icons.success}
              alt="copy"
            />{" "}
          </div>
        ) : rightIcon && hasError && successIcon ? (
          <div onClick={onIconClick} className="right-icon-container">
            <img
              className="right-input-icon"
              src={assets.Icons.error}
              alt="copy"
            />{" "}
          </div>
        ) : rightIcon && eyeIcon ? (
          <div onClick={toggleIsPassword} className="right-icon-container">
            <img className="eye-input-icon" src={assets.Icons.eye} alt="copy" />{" "}
          </div>
        ) : (
          ""
        )}
        {rightIcon && eyeIcon && successIcon ? (
          <div
            onClick={toggleIsPassword}
            className="reset-right-icon-container"
          >
            <img className="eye-input-icon" src={assets.Icons.eye} alt="copy" />{" "}
          </div>
        ) : (
          ""
        )}
        {rightIcon && chatSendIcon ? (
          <div
            onClick={messageSend}
            className="reset-right-icon-container"
          >
            <img
              className="chatSendIcon"
              src={assets.Icons.chatarrowicon}
              alt="copy"
            />{" "}
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        <FormErrorMessage error={error} messages={messages} />
      </div>
    </>
  );
};

export default NormalInput;
