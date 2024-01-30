import React, { useState, useEffect } from "react";
import "./styles.scss";
import assets from "../../assets";
import NormalButton from "../../components/NormalButton";
import NormalTable from "../../components/NormalTable";
import NormalInput from "../../components/inputField";
import NormalSelect from "../../components/NormalSelect";
import { getPay } from "../../redux/reducers/paySlice";
import { useNavigate } from "react-router";
import Pagination from "../../components/pagination";
import { getAccounts } from "../../redux/reducers/accountsSlice";
import { useSelector } from "react-redux";
const Pay = () => {
  // const [payDataApi, setPayDataApi] = useState([]);
  const [payData, setPayData] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Unpaid");
  const [pageMeta, setPageMeta] = useState({
    pageCount: 0,
  });
  const [page, setPage] = useState(1);
  const [allBankAccounts, setAllBankAccounts] = useState([]);
  const menus = [
    {
      id: 1,
      title: "Unpaid",
    },
    {
      id: 2,
      title: "Scheduled",
    },
    {
      id: 3,
      title: "Paid",
    },
  ];
  const showNotifications = useSelector(
    (state) => state.dashboard.showNotifications
  );

  useEffect(() => {
    getPayApi(
      activeMenu === "Paid"
        ? "Paid"
        : activeMenu === "Unpaid"
        ? "Unpaid"
        : "Scheduled"
    );
  }, [activeMenu, page]);

  const getPayApi = (data) => {
    // dispatch(
    getPay(`?type=${data}&page=${page - 1}&size=${10}`)
      .then((res) => {
        console.log(res.data, "payRes");
        const newData = res.data.content.map((item) => ({
          ...item,
          selected: false,
        }));
        setPayData(newData);
        setPageMeta({ pageCount: res?.data?.totalPages });
      })
      .catch((err) => {
        console.log(err, "error");
      });
    getAccounts()
      .then((res) => {
        const tempValues = res.data.map((item) => {
          return { value: item.bankName, label: item.bankName };
        });
        const allBankOptions = [...tempValues];
        setAllBankAccounts(allBankOptions);
      })
      .catch((err) => {
        console.log(err);
      });
    // );
  };

  let navigate = useNavigate();
  const [sortedTable, setSortedTable] = useState({
    sorted: "iDate",
    reversed: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleHeaderCheckboxToggle = () => {
    const newPayData = payData.map((item) => ({
      ...item,
      selected: !isChecked,
    }));
    setPayData(newPayData);
    setIsChecked(!isChecked);
  };
  const [readyToPayTableValues, setReadyToPayTableValues] = useState([]);

  const headerDetails = [
    {
      label: (
        <NormalInput
          type={"checkbox"}
          checkboxInput
          checked={isChecked}
          onChange={(e) => {
            handleHeaderCheckboxToggle();
            e.target.checked
              ? setReadyToPayTableValues([])
              : setReadyToPayTableValues([]);
            if (e.target.checked) {
              payData.map((item) => {
                setReadyToPayTableValues((prevValues) => [
                  ...prevValues,
                  {
                    key: item.invoiceIid,
                    dueDate: item.dueDate.split("-").join("/"),
                    invoiceNo: item.invoiceNumber,
                    totalAmount: item.totalAmount,
                  },
                ]);
              });
            }
          }}
        />
      ),
    },
    {
      label: "Issue Date",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "iDate", reversed: !sortedTable.reversed });
        const payDataCopy = [...payData];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            let dateA = new Date(a.issueDate.split("-").reverse().join("/"));
            let dateB = new Date(b.issueDate.split("-").reverse().join("/"));
            // console.log(payData);
            return dateA - dateB;
          });
        } else {
          payDataCopy.sort((a, b) => {
            let dateA = new Date(a.issueDate.split("-").reverse().join("/"));
            let dateB = new Date(b.issueDate.split("-").reverse().join("/"));
            // console.log("dsc");
            return dateB - dateA;
          });
        }
        setPayData(payDataCopy);
      },
    },
    {
      label: "Due Date",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "dDate", reversed: !sortedTable.reversed });
        const payDataCopy = [...payData];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            let dateA = new Date(a.dueDate.split("-").reverse().join("/"));
            let dateB = new Date(b.dueDate.split("-").reverse().join("/"));
            // console.log("asc");
            return dateA - dateB;
          });
        } else {
          payDataCopy.sort((a, b) => {
            let dateA = new Date(a.dueDate.split("-").reverse().join("/"));
            let dateB = new Date(b.dueDate.split("-").reverse().join("/"));
            // console.log("dsc");
            return dateB - dateA;
          });
        }

        setPayData(payDataCopy);
      },
    },
    {
      label: "Vendor",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "vendor", reversed: !sortedTable.reversed });
        const payDataCopy = [...payData];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            if (a.vendorName.toLowerCase() < b.vendorName.toLowerCase()) {
              return -1;
            }
            if (a.vendorName.toLowerCase() > b.vendorName.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          payDataCopy.sort((a, b) => {
            if (a.vendorName.toLowerCase() < b.vendorName.toLowerCase()) {
              return 1;
            }
            if (a.vendorName.toLowerCase() > b.vendorName.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          });
        }

        setPayData(payDataCopy);
      },
    },
    {
      label: "Invoice Number",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "INumber", reversed: !sortedTable.reversed });
        const payDataCopy = [...payData];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            return a.invoiceNumber - b.invoiceNumber;
          });
        } else {
          payDataCopy.sort((a, b) => {
            return b.invoiceNumber - a.invoiceNumber;
          });
        }
        setPayData(payDataCopy);
      },
    },
    { label: "Reason" },
    { label: "Type" },
    { label: "Status" },
    {
      label: "Total amount",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "INumber", reversed: !sortedTable.reversed });
        const payDataCopy = [...payData];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            return a.totalAmount - b.totalAmount;
          });
        } else {
          payDataCopy.sort((a, b) => {
            return b.totalAmount - a.totalAmount;
          });
        }
        setPayData(payDataCopy);
      },
    },
    { label: "" },
  ];

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const readyToPayHeaderDetails = [
    { label: "Invoice Number" },
    { label: "Due Date" },
    { label: "Amount" },
  ];

  const paymentDateOptions = [
    { value: "", label: "Select bank account" },
    { value: "1", label: "Select bank account" },
    { value: "2", label: "Select bank account" },
  ];

  // const readyToPayTotalAmt = 1628;

  let readyToPayTotalAmt = readyToPayTableValues.reduce((acc, cur) => {
    return Math.round((acc + cur.totalAmount) * 100) / 100;
  }, 0);

  const shortReadyToPayTableValues = readyToPayTableValues.slice(0, 4);
  // console.log(shortReadyToPayTableValues);

  const [readMore, setReadMore] = useState(false);

  const toggleReadMore = () => {
    setReadMore((prev) => !prev);
  };

  const handleCheckboxChange = (itemId) => {
    setPayData((prevData) =>
      prevData.map((item) =>
        item.invoiceIid === itemId
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };
  const para = (id) => {
    navigate(`/main/invoice-details/${id}`);
  };

  return (
    <div className="pay-main-container">
      {/* <button onClick={() => console.log(payData)}>kk</button> */}
      <div
        className={
          showNotifications ? "pay-left-container" : "pay-left-full-container"
        }
      >
        <div className="pay-menu-main-container">
          <div className="pay-menu-container">
            {menus.map(({ title }) => (
              <div
                className={`pay-menu-item ${
                  activeMenu === title ? "pay-active" : ""
                }`}
                onClick={() => handleMenuClick(title)}
              >
                {title}
              </div>
            ))}
          </div>
          <div className="d-flex align-item-center smallScreenDiv">
            <div className="pay-filter">
              <img
                src={assets.Icons.filter}
                alt="filter"
                className="filter-icon"
              />
            </div>
            <div className="add-invoice-container">
              <NormalButton
                label="+ Add Invoice"
                addBtn
                onClick={() => navigate("/main/create-invoice")}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 ">
          <NormalTable headerDetails={headerDetails} custom_getpaid_table>
            {payData.length > 0
              ? payData.slice(1, 10).map((list) => {
                  return (
                    <>
                      <tr className="px-3">
                        <td>
                          <NormalInput
                            type={"checkbox"}
                            checkboxInput
                            checked={list.selected}
                            onChange={(e) => {
                              handleCheckboxChange(list.invoiceIid);
                              e.target.checked
                                ? setReadyToPayTableValues([
                                    ...readyToPayTableValues,
                                    {
                                      key: list.invoiceIid,
                                      dueDate: list.dueDate
                                        .split("-")
                                        .join("/"),
                                      invoiceNo: list.invoiceNumber,
                                      totalAmount: list.totalAmount,
                                    },
                                  ])
                                : setReadyToPayTableValues(
                                    readyToPayTableValues.filter(
                                      (selectedId) =>
                                        selectedId.key !== list.invoiceIid
                                    )
                                  );
                            }}
                          />
                        </td>
                        <td>{list.issueDate.split("-").join("/")}</td>
                        <td>{list.dueDate.split("-").join("/")}</td>
                        <td>
                          <div
                            className="blue-color"
                            onClick={() =>
                              navigate(
                                `/main/Vendor-details/${list.vendorName}/${activeMenu}`
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {list.vendorName}
                          </div>
                        </td>
                        <td>{list.invoiceNumber}</td>
                        <td>{list.reason}</td>
                        <td>{list.type}</td>
                        <td>
                          <div
                            className={`${
                              list.status === "Reviewed"
                                ? "yellow"
                                : list.status === "New"
                                ? "blue-color"
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
                          <span
                            className="anchor"
                            onClick={() => para(list.invoiceIid)}
                          >
                            Review
                          </span>
                        </td>
                      </tr>
                    </>
                  );
                })
              : "No Data"}
          </NormalTable>
          <div className="paginationStyle">
            {" "}
            <Pagination
              totalPage={pageMeta?.pageCount}
              pageChange={(res) => setPage(res)}
            />{" "}
          </div>
        </div>
      </div>
      {showNotifications && (
        <div className="pay-right-container">
          <div className="payRightContainerHeader">
            <div>Ready to Pay</div>
            <div className="readyToPayInvoices">{`${readyToPayTableValues.length} Invoices`}</div>
          </div>
          <div className="readyToPayTable">
            {readyToPayTableValues.length > 0 ? (
              <NormalTable headerDetails={readyToPayHeaderDetails}>
                {readMore
                  ? readyToPayTableValues.map((item) => (
                      <tr key={item.key}>
                        <td>{item.invoiceNo}</td>
                        <td>{item.dueDate}</td>
                        <td>{`$${item.totalAmount}`}</td>
                      </tr>
                    ))
                  : shortReadyToPayTableValues.map((item) => (
                      <tr key={item.key}>
                        <td>{item.invoiceNo}</td>
                        <td>{item.dueDate}</td>
                        <td>{`$${item.totalAmount}`}</td>
                      </tr>
                    ))}
              </NormalTable>
            ) : (
              ""
            )}
            {readyToPayTableValues.length < 5 ? (
              <button style={{ display: "none" }}></button>
            ) : (
              <button onClick={toggleReadMore}>
                {readMore ? "View Less " : "View All "}{" "}
                <img
                  src={readMore ? assets.Icons.upArrow : assets.Icons.downArrow}
                  alt="downArrow"
                />
              </button>
            )}
          </div>
          <div className="paymentDateContainer">
            <p>Payment Date</p>
            <div className="paymentDateCheckBoxes">
              <NormalInput type="checkbox" checkboxInput />
              <label htmlFor="">Pay all selected invoices now</label>
            </div>
            <div className="paymentDateCheckBoxes">
              <NormalInput type="checkbox" checkboxInput />
              <label htmlFor="">Schedule payments</label>
            </div>
            <div className="paymentDateSelectBox">
              <NormalSelect options={allBankAccounts} />
            </div>
          </div>
          <div className="readyToPayFooter">
            <div className="readyToPayTotalAmt">
              Total amount (incl. TAX)
              <p>{`$${readyToPayTotalAmt}`}</p>
            </div>
            <div className="readyToPayButton">
              <NormalButton addBtn label="Pay" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay;
