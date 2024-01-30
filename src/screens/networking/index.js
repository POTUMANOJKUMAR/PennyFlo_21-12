import React, { useEffect, useState } from "react";
import ProfileHeader from "../profileHeader";
import "./styles.scss";
import NormalButton from "../../components/NormalButton";
import assets from "../../assets";
import NormalTable from "../../components/NormalTable";
import { useNavigate } from "react-router-dom";
import {Toast} from "../../components/Toast"
import { getNetworking } from "../../redux/reducers/networkingSlice";
function Networking() {
  let navigate=useNavigate()
  const integrationHeader = [
    { label: "Integrated Account Name",col:"2" },
    { label: "Account ID" ,col:"3"},
    { label: "Last Update" ,col:"2"},
    { label: "Status" ,col:"2"},
  ];
  const [networkingtableRows,setNetworkingTableRows]=useState([])
  useEffect(()=>{
    getNetworkingApi()
  },[])
  const getNetworkingApi=()=>{
    getNetworking().then((res)=>{
      console.log(res.data)
      setNetworkingTableRows(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }

  function handleToDashboard(){
    navigate(`/main/dashboard/`)
    Toast({
      type: "success",
      message: "Saved Successfully",
    }); 
  }

  function handleToDeleteNetwork(id){
      setNetworkingTableRows(networkingtableRows.filter((item)=>item.networkId !==id))
    
    Toast({
      type: "error",
      message: "Deleted Successfully",
    });       
  }
  return (
    <div className="networking-data-main-container">
      <ProfileHeader />
    
     
      <div className="networking-container">
        <div className="networking-data-header">
          <div className="networking-header">Networks</div>
          <div className="networking-btn">
            <NormalButton label="Add Integration" addBtn onClick={handleToDashboard} />
          </div>
        </div>
        <hr className="underline"></hr>
        <div className="networking-table-overflow">
        <div className="networking-table networking-responsive custom-scroll">
  <div className="networking-table-header row col-12">
    {integrationHeader.map((header, index) => (
      <div key={index} className={`col-${header.col} networking-table-cell `}>
        {header.label}
      </div>
    ))}
  </div>

  <div className="networking-table-data-container"
  >
    {networkingtableRows.length > 0 ? (
      networkingtableRows.map((list, rowIndex) => (
        <div key={rowIndex} className="networking-table-row row col-12">
          <div className="col-2 networking-table-cell networking-table-image-gap">
          <img src={`data:image/jpeg;base64,${list.image}`} alt=""
          className="networking-image-icons "></img>
            {list.accountName}
            
          </div>
       
          <div className="col-3 networking-table-cell">{list.accountId}</div>
          <div className="col-2 networking-table-cell">{list.lastUpdate}</div>
          <div className="col-2 networking-table-cell color">{list.status}</div>
          <div className="col-3 networking-table-cell networking-bin">
            <img
              src={assets.Icons.bin}
              className="cursor-pointer"
            onClick={()=>handleToDeleteNetwork(list.networkId)}
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

export default Networking;
