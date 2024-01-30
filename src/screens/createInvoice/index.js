import React, { useState, useEffect } from "react";
import "./styles.scss";
import assets from "../../assets";
import NormalInput from "../../components/inputField";
import NormalButton from "../../components/NormalButton";
import DatePicker from "../../components/DatePicker";
import NormalSelect from "../../components/NormalSelect";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/Toast";
import { getVendors } from "../../redux/reducers/vendorsSlice";

function CreateInvoice() {
  let navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nameOptions, setNameOptions] = useState([]);
  const [dueselectedDate, setDueSelectedDate] = useState(null);

  useEffect(() => {
    getVendors()
      .then((res) => {
        console.log(res.data);
        const temp = res.data.map((list) => {
          return { value: list.name, label: list.name };
        });
        setNameOptions(temp);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);
  const handleDateChangeDue = (date) => {
    setDueSelectedDate(date);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleToCancel = () => {
    navigate("/main/pay");
  };
  const handleToBackToPay = () => {
    navigate("/main/pay");
  };
  const handleTOSave = () => {
    Toast({
      type: "success",
      message: "saved Successfully",
    });
    navigate(-1);
  };

  const handleUpload = () => {
    Toast({
      type: "success",
      message: "Uploaded Successfully",
    });
  }
  const options = [
    {
      label: "select",
      value: "select",
    },
    {
      label: "select",
      value: "select",
    },
    {
      label: "select",
      value: "select",
    },
  ];
  return (
    <>
      <div className="create-invoice-main-container">
        <div
          onClick={handleToBackToPay}
          className="create-invoice-back-button d-flex align-items-center cursor-pointer"
        >
          <div>
            <img
              src={assets.Icons.leftArrow}
              alt="backList"
              className="backList-icon"
            />
          </div>
          <div className="backList">Back to Pay List</div>
        </div>
        <div className="create-invoice-container p-5">
          <div className=" create-invoice-title pb-4 ">Create Invoice</div>
          <div className="col create-invoice-form">
            <div>
              <div className="invoice-form">
                <div className="row ">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <label>Issue Date</label>
                    <DatePicker
                calendarStyle={true}
                placeHolder={true}
                isWeekdays={true}
                format={"dd/MM/yyyy"}
                placeholderText="From Date"
                rightIcon
                calendarIcon
                onChange={handleDateChange}
                selected={selectedDate}
                value={selectedDate}
              />
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <label>Due Date</label>
                    <DatePicker
                calendarStyle={true}
                placeHolder={true}
                isWeekdays={true}
                format={"dd/MM/yyyy"}
                placeholderText="DD/MM/YYYY"
                rightIcon
                calendarIcon
                onChange={handleDateChangeDue}
                selected={dueselectedDate}
                minDate={selectedDate} // Set minDate to fromDate
                value={dueselectedDate}
              />
                  </div>
                </div>
                <div className="row col-12">
                  <div className="pt-3 pb-2  vendordetails">
                    Vendor Details:
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <label>Vendor Name</label>
                    <div className="row  d-flex align-items-center create-invoice-select-addbtn">
                      <div className="col-8">
                        <NormalSelect options={nameOptions} />
                      </div>
                      <div className="col-4 create-invoice-add-btn">
                        <NormalButton
                          label="ADD"
                          notifyBtn
                          onClick={() => navigate("/main/add-vendor")}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <label>CIN Number</label>
                    <NormalInput value="12345678" type="text" freeze />
                  </div>

                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <label>VAT Number</label>
                    <NormalInput value="1245678" type="text" freeze />
                  </div>
                </div>
                <div className="row col-12 pt-4">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <label>Reason</label>
                    <NormalSelect options={options} />
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <label>Type</label>
                    <NormalSelect options={options} />
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <label>Total Amount</label>
                    <NormalInput type="text" placeholder="Enter Here" />
                  </div>
                </div>
              </div>
              <div className="create-invoice-or-para">OR</div>
              <div className="upload-invoice">
                <div className="row">
                  <label>Upload Invoice PDF</label>
                  <input type="file" id="upload" hidden onChange={handleUpload}/>
                  <label className="create-invoice-upload-btn" for="upload">
                    Upload
                  </label>
                  <p className="create-invoice-file-note">
                    *Upload file size of max 2mb
                  </p>
                </div>
              </div>
              <div className="create-invoice-save-cancel-btns">
                <div>
                  {" "}
                  <NormalButton
                    label="Cancel"
                    cancelBtn
                    onClick={handleToCancel}
                  />
                </div>
                <div className="create-invoice-save-button">
                  <NormalButton
                    label="Save"
                    onClick={handleTOSave}
                    approveBtn
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateInvoice;
