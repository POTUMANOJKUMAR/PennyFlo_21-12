import React, { useState, useEffect } from "react";
import assets from "../../assets/index";
import "./styles.scss";
import pencil from "../../assets/icons/pencil.png";
import NormalTable from "../../components/NormalTable/index";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { getVendorDetails } from "../../redux/reducers/vendorDetailsSlice";
import { getPay } from "../../redux/reducers/paySlice";

const VendorDetails = () => {
  const [vendorDetailsData, setVendorDetailsData] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const params = useParams();

  useEffect(() => {
    getVendorDetailsApi(params.id);
    getPayApi(params.source);
  }, []);

  const getVendorDetailsApi = (data) => {
    // dispatch(
    getVendorDetails(data)
      .then((res) => {
        setVendorDetailsData(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    // );
  };

  const getPayApi = (data) => {
    // dispatch(
    getPay(`?type=${data}&page=${0}&size=${100}`)
      .then((res) => {
        console.log(res.data.content, "page");
        const tableTempValues = res.data.content.filter(
          (item) => item.vendorName === params.id
        );
        console.log(tableTempValues, "pageee");
        setTableValues(tableTempValues);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    // );
  };

  let navigate = useNavigate();

  const headerDetails = [
    { label: "Issue Date" },
    { label: "Due Date" },
    { label: "Invoice Number" },
    { label: "Reason" },
    { label: "Type" },
    { label: "Status" },
    { label: "Total amount" },
  ];

  // const tableValues = [
  //   {
  //     key: 1,
  //     Issue_Date: "25/09/2023",
  //     Due_Date: "30/09/2023",
  //     Invoice_Number: 12346589,
  //     Reason: "Reason 1",
  //     Type: "Invoice",
  //     Status: "Reviewed",
  //     Total_Amt: `$${780}`,
  //   },
  //   {
  //     key: 2,
  //     Issue_Date: "25/09/2023",
  //     Due_Date: "30/09/2023",
  //     Invoice_Number: 12346589,
  //     Reason: "Reason 1",
  //     Type: "Invoice",
  //     Status: "Approved",
  //     Total_Amt: `$${780}`,
  //   },
  //   {
  //     key: 3,
  //     Issue_Date: "25/09/2023",
  //     Due_Date: "30/09/2023",
  //     Invoice_Number: 12346589,
  //     Reason: "Reason 1",
  //     Type: "Invoice",
  //     Status: "New",
  //     Total_Amt: `$${780}`,
  //   },
  //   {
  //     key: 4,
  //     Issue_Date: "25/09/2023",
  //     Due_Date: "30/09/2023",
  //     Invoice_Number: 12346589,
  //     Reason: "Reason 1",
  //     Type: "Invoice",
  //     Status: "Reviewed",
  //     Total_Amt: `$${780}`,
  //   },
  // ];

  return (
    <div className="mainContainer">
      <div
        className="backButton cursor-pointer"
        onClick={() => navigate("/main/pay")}
      >
        <img src={assets.Icons.leftArrow} alt="leftArrow" />
        Back to Pay List
      </div>
      <div className="vendorDetails">
        <div className="vendorDetailsContainer">
          <div className="heading">
            <p onClick={() => console.log(params.id, params.source)}>
              Vendor Details
            </p>
            <div
              className="edit cursor-pointer"
              onClick={() =>
                navigate("/main/add-vendor", {
                  state: {
                    edit: true,
                    name: vendorDetailsData.name,
                    cinnumber: vendorDetailsData.cinnumber,
                    vatnumber: vendorDetailsData.vatnumber,
                    vendorAddress: vendorDetailsData.vendorAddress,
                    mobile: vendorDetailsData.mobile,
                    email: vendorDetailsData.email,
                  },
                })
              }
            >
              <img src={pencil} alt="editIcon" />
              Edit
            </div>
          </div>
          <div className="row mb-3">
            <div className=" col col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="top mb-2">Vendor Name</div>
              <div className="bottom">{vendorDetailsData.name}</div>
            </div>
            <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="top mb-2">CIN Number</div>
              <div className="bottom">{vendorDetailsData.cinnumber}</div>
            </div>
            <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="top mb-2">VAT Number</div>
              <div className="bottom">{vendorDetailsData.vatnumber}</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="top mb-2">Vendor Address</div>
              <div className="bottom">{vendorDetailsData.vendorAddress}</div>
            </div>
            <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="top mb-2">Contact Number</div>
              <div className="bottom">{vendorDetailsData.mobile}</div>
            </div>
            <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="top mb-2">Email Address</div>
              <div className="bottom">{vendorDetailsData.email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="vendorInvoices">
        <div className="invoicesContainer">
          <div className="heading">
            <p>Vendor Invoices</p>
          </div>
          <div className="invoiceTable">
            <NormalTable headerDetails={headerDetails}>
              {tableValues.map((list) => (
                <tr className="trow" key={list.invoiceIid}>
                  <td>
                    <div className="tRow">
                      {list.issueDate.split("-").join("/")}
                    </div>
                  </td>
                  <td>
                    <div className="tRow">
                      {list.dueDate.split("-").join("/")}
                    </div>
                  </td>
                  <td>
                    <div className="tRow">{list.invoiceNumber}</div>
                  </td>
                  <td>
                    <div className="tRow">{list.reason}</div>
                  </td>
                  <td>
                    <div className="tRow">{list.type}</div>
                  </td>
                  <td>
                    <div
                      className={`${
                        list.Status === "Reviewed"
                          ? "yellow"
                          : list.Status === "New"
                          ? "blue"
                          : "green"
                      }`}
                    >
                      {list.status}
                    </div>
                  </td>
                  <td>
                    <div className="tRowAmt">{`$${list.totalAmount}`}</div>
                  </td>
                  <td>
                    <div>
                      <a href="#">Review</a>
                    </div>
                  </td>
                </tr>
              ))}
            </NormalTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
