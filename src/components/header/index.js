import React, { useEffect, useRef } from "react";
import "./styles.scss";
import assets from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NormalModal from "../NormalModal";
import ChatModal from "../../screens/chatModal";
import { getAccounts } from "../../redux/reducers/accountsSlice";
import { getIntegration } from "../../redux/reducers/integrationSlice";
import Integration from "../../screens/integration";
import { useDispatch } from "react-redux";
import { toggleNotifications } from "../../redux/reducers/dashboardSlice";
import { hambergerToggle } from "../../redux/reducers/headerSlice";
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

const Header = ({ onToggle }) => {
  let navigate = useNavigate();
  const [imageDataAccounts, setImageDataAccounts] = useState([]);
  const [imageDataIntegration, setImageDataIntegration] = useState([]);
  const [show, setShow] = useState(false);
  const integrationActive = "Integrations";
  const accountsActive = "Accounts";
  const modalRef = useRef(null);
  const dispatch = useDispatch();
const handleToHamberger=()=>{
  dispatch(hambergerToggle())
  onToggle()
}
  const handleBellIconClick = () => {
    // dispatch(toggleNotifications());
    navigate("/main/dashboard");

    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };

  const handleToIntegration = () => {
    navigate("/main/integration");
    sessionStorage.setItem("activeMenu", integrationActive);
  };

  const handleToAccounts = () => {
    navigate("/main/accounts");
    sessionStorage.setItem("activeMenu", accountsActive);
  };
  const handle = () => {
    setShow(!show);
    console.log(show, "show");
  };
  const pophandleclick = () => {
    setShow(!show);
    navigate("/main/profile");
  };
  const [visible, setvisible] = useState(false);
  useEffect(() => {
    getHeaderApiForAccounts();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getHeaderApiForAccounts = () => {
    getAccounts()
      .then((res) => {
        console.log(res, "header accounts");
        setImageDataAccounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getIntegration().then((res) => {
      console.log(res, "integration");
      setImageDataIntegration(res.data);
    });
  };
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const getHeaderText = pathArray[2] || "Unknown";
  const headerText =
    getHeaderText.charAt(0).toUpperCase() + getHeaderText.slice(1);

  const menus = [
    {
      id: 1,
      title: "Profile",
      link: `/main/profile/`,
    },
    {
      id: 2,
      title: "Integrations",
      link: "/main/integration/",
    },
    {
      id: 3,
      title: "Networks",
      link: "/main/networking",
    },
    {
      id: 4,
      title: "Accounts",
      link: "/main/accounts",
    },
    {
      id: 5,
      title: "Vendors",
      link: "/main/vendor",
    },
    {
      id: 6,
      title: "Reminder Setting",
      link: "/main/notification",
    },
    {
      id: 7,
      title: "Logout",
      link: "/auth/login",
    },
  ];

  function handleclick(link, title) {
    setShow(!show);

    navigate(link);
    sessionStorage.setItem("activeMenu", title);
  }
  return (
    <div className="header-container">
      <div className="dashboard-container">
        <div className="dashboard-icon-container">
          <img
            src={assets.Icons.headerDashboard}
            alt="dashboardIcon"
            className="dashboard-icon cursor-pointer"
            onClick={handleToHamberger}
          />
        </div>
        <p className="dashboard-text" onClick={() => setvisible(!visible)}>
          {headerText}
        </p>
        <NormalModal show={visible}>
          <ChatModal />
        </NormalModal>
      </div>
      <div className="connected-accounts-container">
        <p className="connected-accounts">Connected accounts</p>
        {imageDataAccounts.slice(0, 4).map((list) => (
          <div className="connected-icon-container">
            <img
              src={`data:image/jpeg;base64,${list.image}`}
              alt="connected-accounts-icon"
              className="connected-account-icon"
            />
          </div>
        ))}
        <div className="connected-icon-container">
          <img
            onClick={handleToAccounts}
            src={assets.Icons.plus}
            alt="connected-accounts-icon"
            className="connected-account-plus"
          />
        </div>
      </div>
      <div className="connected-accounts-container">
        <p className="connected-accounts">Integrations</p>
        {imageDataIntegration.map((list) => (
          <div className="connected-icon-container">
            <img
              src={`data:image/jpeg;base64,${list.image}`}
              alt="connected-accounts-icon"
              className={`${list.email ? "email-icon" : "integrations-icon"}`}
            />
          </div>
        ))}
        <div className="connected-icon-container">
          <img
            src={assets.Icons.plus}
            onClick={handleToIntegration}
            alt="connected-accounts-icon"
            className="connected-account-plus"
          />
        </div>
      </div>
      <div className="d-flex align-items-center px-2">
        <img
          src={assets.Icons.bell}
          alt="bell"
          className="bell-icon cursor-pointer"
          onClick={handleBellIconClick}
        />
        <div className="header-profile-container" onClick={() => handle()}>
          <img
            src={assets.Icons.headerProfile}
            alt="headerProfile"
            className="header-profile cursor-pointer"
          />
        </div>
      </div>

      <NormalModal
        show={show}
        setModal={setShow}
        customModalClass="profilepop"
        ref={modalRef}
      >
        <div className="profile-pop-values">
          {menus.map((item) => {
            return (
              <div
                onClick={() => handleclick(item.link, item.title)}
                className="cursor-pointer"
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </NormalModal>
    </div>
  );
};

export default Header;
