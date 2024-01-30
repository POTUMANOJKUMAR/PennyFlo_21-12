import React from "react";
import "./styles.scss";

const NormalButton = ({
  type,
 
  label,
  onClick,
  loginBtn,
  approveBtn,
  notifyBtn,
  disable,
  addBtn,
  cancelBtn,
  showBtn,
  saveindraft,
  sendinvoice,
 
  
  exports,
  scenarios,

  transition_download_btn,
  profitLossExportBtn
}) => {
  return (
    <div>
      <button
        className={`${
          disable
            ? "disable-btn"
            : loginBtn
            ? "login-btn"
            : approveBtn
            ? "approve-btn"
            : notifyBtn
            ? "notify-btn"
            : addBtn
            ? "add-btn"
            : cancelBtn
            ? "cancel-btn"
            : showBtn
            ? "show-btn"
            :saveindraft
            ? "save-in-draft"
            : sendinvoice
            ? "send-invoice"
            : exports
            ?"exports-button"
            : scenarios
            ?"scenarios-button"
           
            :transition_download_btn?
            "transition_download_btn":
            profitLossExportBtn ? 
            "profit-loss-export-button":
            type
           
        } `}
        onClick={onClick}
        disabled={disable}
      >
        <span className="btn-label">{label}</span>
      </button>
    </div>
  );
};

export default NormalButton;
