import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./styles.scss"
function AddEmploye() {
let navigate=useNavigate()
    const [activeMenu, setActiveMenu] = useState("Add Employee");
    const menus = [
        {
          id: 1,
          title: "Charts",
          link: "/main/budgeting",
        },
        {
          id: 1,
          title: "Add Employee",
          link: "/main/add-employe",
        },
      ];

      const handleMenuClick = (title,link) => {
        setActiveMenu(title);
        navigate(link)
        sessionStorage.setItem("activeMenu",title)
      };
  return (
     <div className="budgeting-title-container">
    <div className="menu">
      {menus.map(({ title, link }) => (
        <div
          className={`budgeting-menu-item ${
            activeMenu === title ? "budgeting-active" : ""
          }`}
          onClick={() => handleMenuClick(title, link)}
        >
          {title}
        </div>
      ))}
    </div>
  
  </div>
  )
}

export default AddEmploye
