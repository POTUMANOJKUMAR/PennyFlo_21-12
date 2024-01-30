import React, { useState } from 'react';
import "./styles.scss";
import assets from "../../assets/index"; 
import NormalInput from '../../components/inputField';
import NormalButton from '../../components/NormalButton';
import NormalSelect from '../../components/NormalSelect';
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import {Toast} from "../../components/Toast";
import { useNavigate,useLocation } from "react-router-dom";


const AddVendor = () => {

  let navigate = useNavigate();
  const handleSave = ()=>{
    Toast({
      type: "success",
      message: "Saved Successfully",
    });
  }

  const currencyOptions = [{value:"INR",label:"INR"},{value:"USD",label:"USD"}];
  
  const { state } = useLocation();
  // console.log(state.banks, "useDe");
  

  const bankOptions = state.banks.map((item)=> (
    { value: item.name, label:item.name}));

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
          backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor:'white',
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

  return (
    <div className='addVendor'>
        <div className="addVendorContainer">
            <div className="addVendorHeader">
                Add Bank Account
                <img src={assets.Icons.close} alt="closeIcon" onClick={() => navigate(-1)} style={{cursor:"pointer"}}/>
            </div>
            <form action="">
              <div className="formInfo ">
                <label  htmlFor="">
                  Bank Name
                </label>
                <NormalSelect options={bankOptions} />
              </div>
              <div className="formInfo">
                <label htmlFor="">
                Account Number
                </label>
                <NormalInput placeholder="Enter here"/>
              </div>
              <div className="formInfo">
                <label htmlFor="">
                Account Holder Number
                </label>
                <NormalInput placeholder="Enter here"/>
              </div>
              <div className="formInfo">
                <label htmlFor="">
                Bank IFSC Code
                </label>
                <NormalInput placeholder="Enter here"/>
              </div>
              <div className="formInfo">
                <label htmlFor="">
                Select Currency
                </label>
                <NormalSelect options={currencyOptions} />
              </div>
              <div className="toggswitch">
              <label htmlFor="">1 - Click Payments</label>
             <AntSwitch/>
              </div>
            </form>
            <div className="addVendorButtons">
            <NormalButton label="Cancel" cancelBtn onClick={() => navigate(-1)}/>
            <NormalButton label="Save" showBtn onClick={handleSave}/>
            </div>
        </div>
    </div>
  )
}

export default AddVendor