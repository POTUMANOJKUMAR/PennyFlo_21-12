import React, { useState,useEffect } from "react";
import ProfileHeader from "../profileHeader";
import "./styles.scss";
import NormalButton from "../../components/NormalButton";


import NotificationForm from "../../components/NotificationAddType";
import {Toast} from "../../components/Toast" 


function Notification() {
const [count, setCount]=useState(0)
 function handle(){
  setCount((prev)=>prev+1)
 }

 function handleToSave(){
  Toast({
    type: "success",
    message: "Saved Successfully",
  }); 
 }



  return (
    <div className="notification-data-main-container">
      <ProfileHeader />
      <div className="profile-notification-container">
        <div className="notification-data-header">
          <div className="notification-header">Notification Reminder Setting</div>
          <div className="notification-add-type-btn">
            <NormalButton label="Add Type" onClick={handle} notifyBtn />
          </div>
        </div>
        <hr className="underline"></hr>
<NotificationForm count={count}/>
{Array(count<3? count:setCount(0)).fill(<NotificationForm count={count}/>)}

 <div className="profile-notification-savebtn"><NormalButton onClick={handleToSave} label="Save" approveBtn/></div>
       
      </div>
    </div>
  );
}

export default Notification;
