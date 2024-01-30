import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

function ProfileHeader() {
  const [activeMenu, setActiveMenu] = useState();


  
  useEffect(() => {
    setActiveMenu(sessionStorage.getItem("activeMenu"));
  }, []);
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
  ];
  function handleMenuClick(title, link) {
    navigate(link);
    setActiveMenu(title);
    sessionStorage.setItem("activeMenu", title);
  }
  let navigate = useNavigate();
  return (
    <div className="profile-menu-container">
      {menus.map(({ title, link }) => (
        <div
          className={`profile-menu-item ${
            activeMenu === title ? "profile-active" : ""
          }`}
          onClick={() => handleMenuClick(title, link)}
        >
          {title}
        </div>
      ))}
    </div>
  );
}

export default ProfileHeader;
