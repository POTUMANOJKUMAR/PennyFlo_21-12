import React, { useEffect, useState } from "react";
import ProfileHeader from "../profileHeader";
import "./styles.scss";
import NormalButton from "../../components/NormalButton";
import assets from "../../assets";

import { useNavigate } from "react-router-dom";
import {Toast} from "../../components/Toast" 
import { getVendors } from "../../redux/reducers/vendorsSlice";
function Integration() {
  const navigate=useNavigate()
  const[vendortableRowsApi,setVendorTableRowsApi] = useState([])





  const vendorHeader = [
    { label: "Vendor Name" ,col:"2"},
    { label: "CIN Number" ,col:"1" },
    { label: "VAT Number",col:"1" },
    { label: "Address",col:"2" },
    { label: "Contact Number",col:"2" },
    { label: "Email ID" ,col:"2"},
  ];
  useEffect(()=>{
    getVendorsApi()
  },[])
  const getVendorsApi=()=>{
getVendors().then((res)=>{
  setVendorTableRowsApi(res.data)
}).catch((err)=>{
  console.log(err)
})
  }





  function handleToDelete(id){
    setVendorTableRowsApi(vendortableRowsApi.filter((item)=>item.vendorID !==id))
     Toast({
      type: "error",
      message: "Deleted Successfully",
    }); 
  }


  
    
    
      

  return (
    <div className="vendor-data-main-container">
      <ProfileHeader />
      <div className="vendor-container">
        <div className="vendor-data-header">
          <div className="vendor-header">Vendors</div>
          <div className="vendor-btn">
            <NormalButton label="Add vendor" addBtn onClick={()=>navigate("/main/add-vendor",{ state: { edit: false } })} />
          </div>
        </div>
        <hr className="underline"></hr>
        <div className="vendor-overflow">
     <div className="vendor-table table-responsive custom-scroll">
  <div className="vendor-table-header row col-12">
  
  {vendorHeader.map((header, index) => (
    <div key={index} className={`col-${header.col} `}>{header.label}</div>
    ))}

  </div>

  <div className="vendor-table-data-container"
  >
    {vendortableRowsApi.length > 0 ? (
      vendortableRowsApi.map((list, rowIndex) => (
        <div key={rowIndex} className="vendor-table-row row col-12 ">
          <div className="col-2 vendor-table-cell"> {list.name}</div>
          <div className="col-1 vendor-table-cell">{list.cinnumber}</div>
          <div className="col-1 vendor-table-cell ">{list.vatnumber}</div>
          <div className="col-2 vendor-table-cell">{list.vendorAddress}</div>
          <div className="col-2 vendor-table-cell">{list.mobile}</div>
          <div className="col-2 vendor-table-cell ">{list.email}</div>
       
         <div className=" col-2 vendor-icons">
         <div className="col-1  vendor-table-cell vendor-bin">
            <img
              src={assets.Icons.editBtn}
              className="cursor-pointer"
              onClick={() =>navigate(`/main/add-vendor/`, { state: { edit: true, name:list.name, cinnumber:list.cinnumber, 
                vatnumber:list.vatnumber, vendorAddress:list.vendorAddress, mobile:list.mobile, email:list.email } })}
              alt="edit"
            />
          </div>
          <div className="col-1 vendor-table-cell edit">
            <img
              src={assets.Icons.bin}
              className="cursor-pointer"
              onClick={() => handleToDelete(list.vendorID)}
              alt="bin"
            />
          </div>



         </div>
      
        </div>
      ))
    ) : (
      <div>No Data</div>
    )}
  </div>
</div>
     </div>
        {/* <div className="vendor-table-container">
          <NormalTable fontLarge headerDetails={vendorHeader} vendor_table>
            {vendortableRows.length >0
              ? vendortableRows.map((list) => {
                  return (
                    <>
                      <tr className="px-3  vendor-table-row">
                        <td> {list.vendorName} </td>

                        <td>{list.CINNumber}</td>
                        <td>{list.VATNumber}</td>
                        <td>{list.address}</td>
                        <td>{list.contactNumber}</td>
                        <td>{list.emailID}</td>
                        <td><img   className="vendor-image-icon cursor-pointer" src={assets.Icons.editBtn} alt="editbtn"/></td>
                        <td><img  onClick={()=>handleToDelete(list.id)} className="vendor-image-icon cursor-pointer" src={assets.Icons.bin} alt="bin"/></td>
                      </tr>
                    </>
                  );
                })
              : "No Data"}
          </NormalTable>
        </div> */}
      </div>
    </div>
  );
}

export default Integration;
