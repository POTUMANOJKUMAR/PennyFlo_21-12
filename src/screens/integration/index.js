import React,{useEffect, useState} from "react";
import ProfileHeader from "../profileHeader";
import "./styles.scss";
import NormalButton from "../../components/NormalButton";
import assets from "../../assets";

import { useNavigate } from "react-router-dom";
import {Toast} from "../../components/Toast"
import { getIntegration } from "../../redux/reducers/integrationSlice";
function Integration() {
 let navigate=useNavigate()
  const integrationHeader = [
    { label: "Integrated Accounts",col:"2" },
    { label: "Account ID" ,col:"3" },
    { label: "Last Update" ,col:"2" },
    { label: "Status"  ,col:"2"},
  

  ];
  const [integrationtableRowsAPI,setIntegrationTableRowsAPI]=useState([])
useEffect(()=>{
  getIntegrationApi()
},[])

const getIntegrationApi=()=>{
  getIntegration().then((res)=>{
    console.log(res,"integration")
   setIntegrationTableRowsAPI(res.data)
  }).catch(err=>{
    console.log(err)
  })
}

  
  function handleToDashboard(){
    navigate(`/main/dashboard/`,{state:{name:"manoj"}})
  }
  function handleToDelete(id){
    setIntegrationTableRowsAPI(integrationtableRowsAPI.filter((item =>item.integrationId !== id)))
    Toast({
      type: "error",
      message: "Deleted Successfully",
    }); 
  }

  return (
    <div className="integration-data-main-container">
      <ProfileHeader  />
      <div className="integration-container">
        <div className="integration-data-header">
          <div className="integration-header">Integrations</div>
          <div className="integration-btn">
            <NormalButton label="Add Integration" addBtn  onClick={handleToDashboard}/>
          </div>
        </div>
        <hr className="underline"></hr>
     <div className="integration-overflow">
     <div className="integration-table table-responsive custom-scroll">
  <div className="integration-table-header row col-12">
    {integrationHeader.map((header, index) => (
      <div key={index} className={`col-${header.col} integration-table-cell `}>
        {header.label}
      </div>
    ))}
  </div>

  <div className="integration-table-data-container"
  >
    {integrationtableRowsAPI.length > 0 ? (
      integrationtableRowsAPI.map((list, rowIndex) => (
        <div key={rowIndex} className="integration-table-row row col-12">
          <div className="col-2 integration-table-cell integration-table-image-gap">
          <img src={`data:image/jpeg;base64,${list.image}`} alt=""
          className="integration-image"></img>
            {list.accountName}
            
          </div>
          <div className="col-3 integration-table-cell">{list.accountId}</div>
          <div className="col-2 integration-table-cell">{list.lastUpdate}</div>
          <div className="col-2 integration-table-cell color">{list.status}</div>
          <div className="col-3  integration-table-cell integration-bin">
            <img
              src={assets.Icons.bin}
              className="cursor-pointer"
              onClick={() => handleToDelete(list.integrationId)}
              alt="bin"
            />
          </div>
        </div>
      ))
    ) : (
      <div>No Data</div>
    )}
  </div>
</div>
     </div>





          </div>
  
     
    </div>
  );
}

export default Integration;
