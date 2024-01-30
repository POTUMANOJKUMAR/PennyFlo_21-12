import React, { useState } from "react";
import "./styles.scss";
import assets from "../../assets/index";
import NormalInput from "../../components/inputField";
import NormalButton from "../../components/NormalButton";
import { Toast } from "../../components/Toast";
import { useNavigate,useLocation } from "react-router-dom";

const AddVendor = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  console.log(state,'kkkk');

  const [name,setName] = useState(state.name || "");
  const [cinnumber,setCinnumber] = useState(state.cinnumber || "");
  const [vatnumber,setVatnumber] = useState(state.vatnumber || "");
  const [vendorAddress,setVendorAddress] = useState(state.vendorAddress || "");
  const [mobile,setMobile] = useState(state.mobile || "");
  const [email,setEmail] = useState(state.email || "");

  const handleSave = () => {
    Toast({
      type: "success",
      message: "Saved Successfully",
    });
    navigate(-1);
  };
  return (
    <div className="addVendor">
      {state.edit?<div className="addVendorContainer">
        <div className="addVendorHeader">
          Edit Vendor
          <img
            src={assets.Icons.close}
            alt="closeIcon"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form action="">
          <div className="formInfo">
            <label htmlFor="">Vendor Name</label>
            <NormalInput placeholder="Enter here" value={name} onChange={e=> setName(e.target.value)}/>
          </div>
          <div className="formInfo">
            <label htmlFor="">CIN Number</label>
            <NormalInput placeholder="Enter here" value={cinnumber} onChange={e=> setCinnumber(e.target.value)}/>
          </div>
          <div className="formInfo">
            <label htmlFor="">VAT Number</label>
            <NormalInput placeholder="Enter here" value={vatnumber} onChange={e=> setVatnumber(e.target.value)}/>
          </div>
          <div className="formInfo">
            <label htmlFor="">Address</label>
            <NormalInput placeholder="Enter here" value={vendorAddress} onChange={e=> setVendorAddress(e.target.value)}/>
          </div>
          <div className="formInfo">
            <label htmlFor="">Contact Number</label>
            <NormalInput placeholder="Enter here" value={mobile} onChange={e=> setMobile(e.target.value)}/>
          </div>
          <div className="formInfo">
            <label htmlFor="">Email ID</label>
            <NormalInput placeholder="Enter here" value={email} onChange={e=> setEmail(e.target.value)}/>
          </div>
        </form>
        <div className="addVendorButtons">
          <NormalButton label="Cancel" cancelBtn onClick={() => navigate(-1)} />
          <NormalButton label="Save" showBtn onClick={handleSave} />
        </div>
      </div> : <div className="addVendorContainer">
        <div className="addVendorHeader">
          Add Vendor
          <img
            src={assets.Icons.close}
            alt="closeIcon"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form action="">
          <div className="formInfo">
            <label htmlFor="">Vendor Name</label>
            <NormalInput placeholder="Enter here" />
          </div>
          <div className="formInfo">
            <label htmlFor="">CIN Number</label>
            <NormalInput placeholder="Enter here" />
          </div>
          <div className="formInfo">
            <label htmlFor="">VAT Number</label>
            <NormalInput placeholder="Enter here" />
          </div>
          <div className="formInfo">
            <label htmlFor="">Address</label>
            <NormalInput placeholder="Enter here" />
          </div>
          <div className="formInfo">
            <label htmlFor="">Contact Number</label>
            <NormalInput placeholder="Enter here" />
          </div>
          <div className="formInfo">
            <label htmlFor="">Email ID</label>
            <NormalInput placeholder="Enter here" />
          </div>
        </form>
        <div className="addVendorButtons">
          <NormalButton label="Cancel" cancelBtn onClick={() => navigate(-1)} />
          <NormalButton label="Save" showBtn onClick={handleSave} />
        </div>
      </div>}
    </div>
  );
};

export default AddVendor;
