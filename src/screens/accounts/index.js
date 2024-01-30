// import React from "react";
import React, { useEffect, useState } from "react";
import ProfileHeader from "../profileHeader";
import "./styles.scss";
import NormalButton from "../../components/NormalButton";
import assets from "../../assets";
import NormalTable from "../../components/NormalTable";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/Toast";
import { getAccounts } from "../../redux/reducers/accountsSlice";

function Accounts() {
  let navigate = useNavigate();
  const [bankAccDetails1, setBankAccDetails] = useState([]);
  // const accountsHeader = [
  //   { label: "Bank Name" },
  //   { label: "Identification" },
  //   { label: "Status" },
  //   { label: "Last Update" },
  //   { label: "1-Click Payments" },
  //   { label: "Balance" },
  // ];

  function handleToDelete() {
    Toast({
      type: "error",
      message: "Deleted Successfully",
    });
  }

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "light" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "white",
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  useEffect(() => {
    getAccountsApi();
  }, []);
  const getAccountsApi = () => {
    getAccounts()
      .then((res) => {
        setBankAccDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const uniqueBanks = [
    ...new Set(
      bankAccDetails1.map((item) => ({ name: item.bankName, logo: item.image }))
    ),
  ];

  function handleToDashboard() {
    navigate(`/main/add-bank-account/`, { state: { banks: uniqueBanks } });
  }

  // console.log(uniqueBanks, "sssss");

  const initialSwitchStates = Array(bankAccDetails1.length).fill(false);

  const [isClickPaymentsEnabled, setIsClickPaymentsEnabled] =
    useState(initialSwitchStates);

  const handleSwitchChange = (index) => {
    const updatedStates = [...isClickPaymentsEnabled];
    updatedStates[index] = !updatedStates[index];
    setIsClickPaymentsEnabled(updatedStates);
  };

  return (
    <div className="accounts-data-main-container">
      <ProfileHeader />
      <div className="accounts-container">
        <div className="accounts-data-header">
          <div className="accounts-header">Accounts</div>
          <div className="accounts-btn">
            <NormalButton
              label="Add Bank Account"
              approveBtn
              onClick={handleToDashboard}
            />
          </div>
        </div>
        <hr className="underline"></hr>
        <div className="accTableContainer">
          <div className="accTable">
            <div className="accTableHeader row col-12 mb-4">
              <div className="col-2 accHeader">Bank Name</div>
              <div className="col-2 accHeader">Identification</div>
              <div className="col-2 accHeader">Status</div>
              <div className="col-2 accHeader">Last Update</div>
              <div className="col-2 accHeader">1-Click Payments</div>
              <div className="col-2 accBalance">Balance</div>
            </div>
            <div className="accTableBody">
              {uniqueBanks.map((bank, index) => {
                console.log(bank, "bank");
                return (
                  <div
                    className="individualBankAccountsContainer d-flex"
                    key={index}
                  >
                    <div className="individualBankAccountsHeader row col-12">
                      <div className="bankLogoName col-2">
                        <div className="bankLogo">
                          <img
                            src={`data:image/jpeg;base64,${bank.logo}`}
                            alt="Bank Logo"
                          />
                        </div>
                        {`${bank.name} Bank`}
                        {console.log(bank, "")}
                      </div>
                      <div className="col-2">Bank Connection</div>
                      <div className="col-2"></div>
                      <div className="col-2"></div>
                      <div className="col-2"></div>
                      <div className="col-2">$560,80.00</div>
                    </div>
                    <div className="individualBankAccountsBody">
                      {bankAccDetails1.map((detail, index) => {
                        if (detail.bankName === bank.name) {
                          return (
                            <div
                              className="singleBankAccount row col-12"
                              key={index}
                            >
                              <div className=" col-2 singleBankAccountCurrencyLogoName">
                                <img
                                  className="account-image-icons"
                                  alt="currency logo"
                                  src={
                                    // detail.currency === "USD"?
                                    assets.Icons.usd
                                    // : ""
                                  }
                                />
                                {detail.currency}
                              </div>
                              <div className=" col-2 singleBankAccountDetail">
                                {detail.accountNumber}
                              </div>
                              <div
                                className={`col-2 ${
                                  detail.status === "Active"
                                    ? "singleBankAccountDetailActive"
                                    : "singleBankAccountDetailInactive"
                                }`}
                              >
                                {detail.status}
                              </div>
                              <div className=" col-2 singleBankAccountDetail">
                                {detail.lastUpdate}
                              </div>
                              <div className=" col-2 singleBankAccountSwitch">
                                <div>
                                  {isClickPaymentsEnabled[index]
                                    ? "Enabled"
                                    : "Disabled"}
                                </div>
                                <AntSwitch
                                  checked={isClickPaymentsEnabled[index]}
                                  onChange={() => handleSwitchChange(index)}
                                />
                              </div>
                              <div className=" col-2 singleBankAccountBalance">
                                {`$${detail.balance}`}
                                <img
                                  src={assets.Icons.bin}
                                  alt="bin icon"
                                  onClick={handleToDelete}
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                      {/* {bankAccDetails
                      .filter((detail,index1) => detail.bankName === bank)
                      .map((detail, index) => (
                        <div
                          className="singleBankAccount row col-12"
                          key={index}
                        >
                          <div className=" col-2 singleBankAccountCurrencyLogoName">
                            <img
                              className="account-image-icons"
                              alt="currency logo"
                              src={
                                detail.currency === "USD"
                                  ? assets.Icons.usd
                                  : ""
                              }
                            />
                            {detail.currency}
                          </div>
                          <div className=" col-2 singleBankAccountDetail">
                            {detail.identification}
                          </div>
                          <div
                            className={`col-2 ${
                              detail.status === "Active"
                                ? "singleBankAccountDetailActive"
                                : "singleBankAccountDetailInactive"
                            }`}
                          >
                            {detail.status}
                          </div>
                          <div className=" col-2 singleBankAccountDetail">
                            {detail.lastUpdate}
                          </div>
                          <div className=" col-2 singleBankAccountSwitch">
                            <div>
                              {isClickPaymentsEnabled[index]
                                ? "Enable"
                                : "Disable"}
                            </div>
                            <AntSwitch
                              checked={isClickPaymentsEnabled[index]}
                              onChange={() => handleSwitchChange(index)}
                            />
                          </div>
                          <div className=" col-2 singleBankAccountBalance">
                            {detail.balance}
                            <img
                              src={assets.Icons.bin}
                              alt="bin icon"
                              onClick={handleToDelete}
                            />
                          </div>
                        </div>
                      ))} */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
