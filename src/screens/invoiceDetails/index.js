import React, { useState, useEffect } from "react";
import { getPay } from "../../redux/reducers/paySlice";
import assets from "../../assets";
import "./styles.scss";
import NormalInput from "../../components/inputField";
import NormalButton from "../../components/NormalButton";
import NormalSelect from "../../components/NormalSelect";
import DatePicker from "../../components/DatePicker";
import { useForm } from "react-hook-form";
import { Toast } from "../../components/Toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Form } from "react-bootstrap";
import { getVendors } from "../../redux/reducers/vendorsSlice";
import { getInvoice } from "../../redux/reducers/invoiceSlice";

const InvoiceDetails = () => {
  const [nameOptions, setNameOptions] = useState([]);
  const [invoiceApi, setInvoiceApi] = useState({});
  const params = useParams();
  const [selectedVendorName, setSelectedVendorName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(invoiceApi.invoiceDate || "");
  const [selectedReasonOption, setSelectedReasonOption] = useState(
    invoiceApi.reason || ""
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    invoiceApi.currency || ""
  );
  const [selectedStatus, setSelectedStatus] = useState(invoiceApi.status || "");
  const [totalAmount, setTotalAmount] = useState(invoiceApi.totalAmount || "");
  const [invoiceNumber, setInvoiceNumber] = useState(
    invoiceApi.invoiceNumber || ""
  );
  const { state } = useLocation();
  console.log(state, "useLocation");
  // let { transaction } = location.state;

  useEffect(() => {
    getPayApi();
  }, []);

  const getPayApi = () => {
    // dispatch(
    // if (transaction) {
    //   console.log("Transaction");
    // } else {
    console.log(state, "locationState");
    getInvoice(params.id)
      .then((res) => {
        console.log(res.data, "resData");
        setInvoiceApi(res.data);
        setSelectedVendorName(res.data.vendorName || "");
        setSelectedReasonOption(res.data.reason || "");
        setSelectedCurrency(res.data.currency || "");
        setSelectedStatus(res.data.status || "");
        setTotalAmount(res.data.totalAmount || "");
        setInvoiceNumber(res.data.invoiceNumber || "");
        setInvoiceDate(new Date(res.data.invoiceDate) || "");
        setDueDate(new Date(res.data.dueDate) || "");
      })
      .catch((err) => {
        console.log(err, "error");
      });
    // }

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
    // );
  };

  const reasonOptions = [
    { value: "Nothing", label: "Nothing" },
    { value: "Something", label: "Something" },
  ];
  const currencyOptions = [
    { value: "INR", label: "INR" },
    { value: "USD", label: "USD" },
  ];
  const typeOptions = [
    { value: "Invoice", label: "Invoice" },
    { value: "Receipt", label: "Receipt" },
  ];
  const statusOptions = [
    { value: "New", label: "New" },
    { value: "Approved", label: "Approved" },
  ];

  const [selectedValue, setSelectedValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [success, setSuccess] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  let navigate = useNavigate();
  console.log(navigate, "useNavigate");
  const handleEmailChange = async (event) => {
    setSuccess(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const customErrorMessages = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Invalid email address",
    },
  };
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleToPayPage = () => {
    navigate(-1);
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleInvoiceDateChange = (date) => {
    // Update the state with the selected date
    setInvoiceDate(date);
  };
  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleMarkRecurringChange = () => {
    setIsRecurring(!isRecurring);
  };

  const handleStartMonthChange = (date) => {
    setStartMonth(date);
  };

  const handleEndMonthChange = (date) => {
    // Update the state with the selected date
    setEndMonth(date);
  };

  function handleToSave() {
    Toast({
      type: "success",
      message: "Saved Successfully",
    });
    navigate(`/main/pay/`);
  }
  function handleToDelete() {
    Toast({
      type: "error",
      message: "Deleted Successfully",
    });
    navigate(-1);
  }

  function handleToSend() {
    Toast({
      type: "success",
      message: "Send Successfully",
    });
    navigate(`/main/pay/`);
  }

  return (
    <div>
      <div className="invoice">
        <div
          className="backList-container d-flex align-items-center cursor-pointer"
          onClick={handleToPayPage}
        >
          <div>
            <img
              src={assets.Icons.leftArrow}
              alt="backList"
              className="backList-icon"
            />
          </div>
          <div className="backList cursor-pointer">Back to Pay List</div>
        </div>
        <div className="inovice-details-container">
          <div className="invoice-details-head d-lg-flex  d-xs-block">
            <div className="invoice-details">Invoice Details</div>
            <div className="invoice-mark-delete d-lg-flex  d-xs-block">
              <div className="inovice-mark-container">
                <div className="d-flex">
                  <NormalInput
                    type={"checkbox"}
                    checkboxInput
                    onChange={handleMarkRecurringChange}
                  />
                  <p className="mark-checkbox-label ">Mark as Recurring</p>
                </div>
              </div>
              <div className="delete-container" style={{ cursor: "pointer" }}>
                <img
                  src={assets.Icons.bin}
                  alt="delete"
                  className="delete-icon"
                  onClick={handleToDelete}
                />
                <div className="delete-lable" onClick={handleToDelete}>
                  Delete
                </div>
              </div>
            </div>
          </div>

          <hr className="horizontal-line"></hr>
          <div className="custom-form">
            <Row className="mb-3">
              <Col md={4}>
                <label className="fw-bold mb-2">Vendor Name</label>
                <NormalInput
                  name="vertical-dropdown"
                  // options={nameOptions}
                  value={selectedVendorName}
                  // onChange={(selectedOption) =>
                  //   setSelectedVendorName(selectedOption.value)
                  // }
                  register={register}
                  className="vertical-dropdown"
                />
              </Col>
              <Col md={4}>
                <label className="fw-bold mb-2">VAT Number</label>
                <div className="vat-lable">
                  <NormalInput
                    placeholder={123456898}
                    className="vat-lable"
                  ></NormalInput>
                </div>
              </Col>
              <Col md={4}>
                <label className="fw-bold mb-2">Reason (optional)</label>
                <NormalInput
                  name="vertical-dropdown"
                  className="vertical-dropdown1"
                  options={reasonOptions}
                  value={selectedReasonOption}
                  // onChange={(selectedOption) => {
                  //   setSelectedReasonOption(selectedOption.value);
                  //   console.log(selectedOption.value, "jjjjjjjj");
                  // }}
                  register={register}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <label className="fw-bold mb-2">Email</label>
                <NormalInput
                  type={"text"}
                  onChange={handleEmailChange}
                  // value={invoiceApi.vendorName}
                  placeholder={"john@gmail.com"}
                  register={register("email", {
                    required: customErrorMessages.required,
                    pattern: customErrorMessages.pattern,
                  })}
                  error={errors.email}
                  messages={customErrorMessages}
                />
              </Col>
              <Col md={4}>
                <label className="fw-bold mb-2">Invoice Number</label>
                <div className="invoice-number-lable">
                  <NormalInput
                    placeholder={123456}
                    value={invoiceNumber}
                    // onChange={(event) => setInvoiceNumber(event.target.value)}
                  ></NormalInput>
                </div>
              </Col>
              <Col md={4}>
                <label className="fw-bold mb-2">Currency</label>
                <NormalInput
                  name="vertical-dropdown"
                  options={currencyOptions}
                  value={selectedCurrency}
                  // onChange={(selectedOption) =>
                  //   setSelectedCurrency(selectedOption.value)
                  // }
                  register={register}
                  className="vertical-dropdown2"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <label className="fw-bold mb-2">Invoice Date</label>
                <DatePicker
                  value={invoiceDate}
                  // placeholderText=
                  // onChange={handleInvoiceDateChange}
                  format="dd-MM-yyyy"
                  className="invoice-datepicker"
                  invoicePay="true"
                  disabled={true}
                  placeholder={true}
                  placeholderText="10/11/2023"
                />
              </Col>
              <Col md={4}>
                <label className="fw-bold mb-2">Due Date</label>
                <DatePicker
                  value={dueDate}
                  // placeholderText="Select date"
                  // onChange={handleDueDateChange}
                  format="dd-MM-yyyy"
                  className="due-datepicker"
                  duePay="true"
                  disabled={true}
                  placeholder={true}
                  placeholderText="10/11/2023"
                />
              </Col>
              <Col md={4}>
                <label className="fw-bold mb-2">Type</label>
                <NormalInput
                  name="vertical-dropdown"
                  options={typeOptions}
                  value={selectedValue}
                  // onChange={handleSelectChange}
                  register={register}
                  className="vertical-dropdown3"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <label className="fw-bold mb-2">Total Amount</label>
                <div className="amount-lable">
                  <NormalInput
                    type={"text"}
                    placeholder={"Enter here"}
                    value={totalAmount}
                    // onChange={(event) => setTotalAmount(event.target.value)}
                  />
                </div>
              </Col>
              <Col md={4}>
                <label className="fw-bold mb-2">Status</label>
                <NormalInput
                  name="vertical-dropdown"
                  options={statusOptions}
                  value={selectedStatus}
                  // onChange={(selectedOption) =>
                  //   setSelectedStatus(selectedOption.value)
                  // }
                  register={register}
                  className="vertical-dropdown4"
                />
              </Col>
            </Row>
            <Row className="mb-3 notes-input-container">
              <Col md={12}>
                <label className="fw-bold mb-2">Notes</label>
                <NormalInput
                  type={"text"}
                  placeholder={"Loreum ipsum"}
                  className="note-lable"
                />
              </Col>
            </Row>
            {isRecurring && (
              <div className="recurring-details">
                <div className="recurring-lable pt-4">Recurring details</div>
                <Row className="mb-3 mt-3">
                  <Col md={4}>
                    <label className="fw-bold mb-2">Recurring Type</label>
                    <NormalSelect
                      name="vertical-dropdown"
                      options={options}
                      value={selectedValue}
                      onChange={handleSelectChange}
                      register={register}
                      className="vertical-dropdown3"
                    />
                  </Col>
                  <Col md={4}>
                    <label className="fw-bold mb-2">Start Month & year</label>
                    <DatePicker
                      value={startMonth}
                      // placeholderText="Select date"
                      onChange={handleStartMonthChange}
                      format="yyyy-MM-dd"
                      className="invoice-datepicker"
                      invoicePay="true"
                      placeholderText="Nov 2023"
                      placeholder={true}
                      maxDate={new Date()}
                    />
                  </Col>
                  <Col md={4}>
                    <label className="fw-bold mb-2">End Month & year</label>
                    <DatePicker
                      value={endMonth}
                      // placeholderText="Select date"
                      onChange={handleEndMonthChange}
                      format="yyyy-MM-dd"
                      className="due-datepicker"
                      duePay="true"
                      placeholderText="Oct 2024"
                      placeholder={true}
                      minDate={startMonth} // Set minDate to fromDate
                    />
                  </Col>
                </Row>
              </div>
            )}
          </div>
          <Row className="mb-3">
            <Col
              md={12}
              className=" save-button d-md-flex d-sm-flex justify-content-end d-lg-flex  d-xs-block"
            >
              <NormalButton
                label={"Save As Draft"}
                saveindraft
                onClick={handleToSave}
              />
              <NormalButton
                label={"Send Invoice"}
                sendinvoice
                onClick={handleToSend}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
