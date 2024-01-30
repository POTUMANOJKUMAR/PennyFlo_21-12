import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useMediaQuery } from "@uidotdev/usehooks";
import assets from "../../assets";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NormalModal from "../NormalModal";
import NormalButton from "../../components/NormalButton";
import NormalInput from "../../components/inputField";
import { useDispatch, useSelector } from "react-redux";
import { hambergerToggle } from "../../redux/reducers/headerSlice";
const Sidebar = ({ open, onToggle }) => {
  const [value,setValue]=useState("")
  const [activeButton, setActiveButton] = useState(null);
const dispatch=useDispatch()
const ismobile=useMediaQuery("(max-width : 500px)")

  const hamToggle=useSelector((state)=>state.hamberger.headerToggle)

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  const handleToNotification=()=>{
    let notify="Reminder Setting"
    navigate("/main/notification")
    sessionStorage.setItem("activeMenu",notify)
    onToggle();
  }
  const handlechange=()=>{
    setValue("")
  }
  const [navLink] = useState([
    {
      to: "/main/dashboard",
      label: "Dashboard",
      Icon: assets.Icons.dashboard,
      ActiveIcon: assets.Icons.activeDashboard,
      id: "1",
    },
    {
      to: "/main/pay",
      label: "Pay",
      Icon: assets.Icons.pay,
      ActiveIcon: assets.Icons.activePay,
      id: "2",
    },
    {
      to: "/main/get-paid",
      label: "Get Paid",
      Icon: assets.Icons.getPaid,
      ActiveIcon: assets.Icons.activeGetPaid,
      id: "3",
    },
    {
      to: "/main/insights",
      label: "Insights",
      Icon: assets.Icons.insights,
      ActiveIcon: assets.Icons.activeInsights,
      id: "4",
    },
    {
      to: "/main/forecast",
      label: "Forecast",
      Icon: assets.Icons.forecast,
      ActiveIcon: assets.Icons.activeForecast,
      id: "5",
    },
    {
      to: "/main/budgeting",
      label: "Budgeting",
      Icon: assets.Icons.budget,
      ActiveIcon: assets.Icons.activeBudget,
      id: "6",
    },
    {
      to: "/main/transaction",
      label: "Transactions",
      Icon: assets.Icons.transactions,
      ActiveIcon: assets.Icons.activeTransactions,
      id: "7",
    },
    {
      to: "/main/expense-card",
      label: "Expense Card",
      Icon: assets.Icons.expenseCard,
      ActiveIcon: assets.Icons.activeExpenseCard,
      id: "8",
    },
  ]);


  const [mainLinks, setMainLinks] = useState([]);
  const [showChatModal, setShowChatModal] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    let navLinks = [...navLink];

    setMainLinks([...navLinks]);
  }, [navLink]);

  const onClickNav = async (label) => {
    if (label === "Log out") {
      navigate("/auth/login");
    } else if (label === "Chat") {
      setShowChatModal(true);
    }
  };

  const location = useLocation();

  const onCloseChatModal = () => {
    // console.log("Closing chat modal"); // Add this line
    setShowChatModal(false);
  };
  return (
    <div
      id="sideBar"
      className={hamToggle ? "side-bar-container" : "side-bar-container-hide"}
    >
      <div className="side-bar-header">
        <img
          src={assets.Images.sideBarLogo}
          alt="logo"
          className="side-bar-logo"
        />
      </div>
      <div className="item-side-bar">
        {mainLinks.map(({ to, label, Icon, ActiveIcon }, index) => {
          return (
            <NavLink
              to={to}
              onClick={() => {
                onClickNav(label);
             if(ismobile){
              dispatch(hambergerToggle())
             }
              }}
              style={{ textDecoration: "none" }}
              key={`${index}`}
            >
              <div
                className={`
                  ${location.pathname === to ? "active-div" : "in-active-div"}
                  `}
              >
                <div className="side-bar-list">
                  <span>
                    <img
                      alt={location.pathname}
                      src={location.pathname === to ? ActiveIcon : Icon}
                      className={`sidebar-icon
                        ${
                          location.pathname === to
                            ? "active-icon"
                            : "in-active-icon"
                        }`}
                    />
                  </span>

                  <span
                    className={
                      location.pathname === to
                        ? "active-label"
                        : "in-active-label"
                    }
                  >
                    {label}
                  </span>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div className="bottom-line-container">
        <hr className="bottom-line"></hr>
      </div>
      <div className="bottom-content">
        <div className="d-flex align-items-center">
          <img
            src={assets.Images.sidebarProPic}
            alt="logo"
            className="side-bar-image"
          />
          <div className="d-flex flex-column ">
            <span className="sidebar-username">Jane Doe</span>
            <span className="sidebar-view-profile">View Profile</span>
          </div>
          <img
            src={assets.Icons.chat}
            alt="chat"
            className="sidebar-chat-icon cursor-pointer"
            onClick={() =>{ onClickNav("Chat");
            onToggle();}}
          />
          <img
            src={assets.Icons.settings}
            alt="settings"
            className="sidebar-settings-icon cursor-pointer"
            onClick={handleToNotification}
          />
        </div>
      </div>
      <NormalModal show={showChatModal} setModal={setShowChatModal} customModalClass={"chat"}>
        <div className="chat-container">
          <div className="chat-top">
            <div className=" header-top ">
              <div className="d-flex align-items-center gap-2 ">
                <div className="chat-logo">
                  <img
                    src={assets.Icons.chatpf}
                    alt="settings"
                    className="chat-pf-icon"
                  />
                </div>
                <div className="chat-top-content">Ask Our Experts</div>
              </div>

              <img
                src={assets.Icons.closeicon}
                alt="settings"
                className="chat-close-icon"
                onClick={onCloseChatModal}
              />
            </div>
            <div className="header-description1">Welcome to Pennyflo</div>
            <div className="header-description2">
              We are here to help you with our service related queries.
            </div>
          </div>
          <div className="chat-middle-content">
            <div className="chat-choose">Choose any one of the service.</div>
            <div className="  row col chat-buttons">
              <div className="col-lg-3 col-md-3 col-sm-4 mt-3">
                <NormalButton
                  label={"Accounts"}
                  onClick={() => handleButtonClick(1)}
                  type={activeButton === 1 ? "chat_active_btn" : "account"}
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-4  mt-3">
                <NormalButton
                  label={"Payables"}
                  onClick={() => handleButtonClick(2)}
                  type={activeButton === 2 ? "chat_active_btn" : "account"}
                />
              </div>
              <div className="col-lg-3 col-md-4 col-sm-4  mt-3">
                <NormalButton
                  label={"Receibables"}
                  onClick={() => handleButtonClick(3)}
                  type={activeButton === 3 ? "chat_active_btn" : "account"}
                />
              </div>
              <div className="w-100"></div>
              <div className="col-lg-5 col-md-6 col-sm-5 mt-3">
                {" "}
                <NormalButton
                  label={"Accounts & Integrations"}
                  onClick={() => handleButtonClick(4)}
                  type={activeButton === 4 ? "chat_active_btn" : "account"}
                />
              </div>
              <div className=" col-lg-5 col-md-6 col-sm-5 mt-3">
                {" "}
                <NormalButton
                  label={"Forecast / Scenarios"}
                  onClick={() => handleButtonClick(5)}
                  type={activeButton === 5 ? "chat_active_btn" : "account"}
                />
              </div>
              <div className="w-100"></div>
              <div className=" col-lg-3 col-md-3 col-sm-6 mt-3">
                {" "}
                <NormalButton
                  label={"Queries"}
                  onClick={() => handleButtonClick(6)}
                  type={activeButton === 6 ? "chat_active_btn" : "account"}
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 mt-3">
                {" "}
                <NormalButton
                  label={"Others"}
                  onClick={() => handleButtonClick(7)}
                  type={activeButton === 7 ? "chat_active_btn" : "account"}
                />
              </div>
            </div>
          </div>
          <div className="chat-input">
            <NormalInput
              placeholder={"Start a converstation"}
              chatInputStyle
              onChange={(e)=>setValue(e.target.value)}
   
value={value}
onsendclear={handlechange}
              rightIcon
              chatSendIcon
            />
          
          </div>
        </div>
      </NormalModal>
    </div>
  );
};

export default Sidebar;
