import React, { useState, useEffect } from "react";
import "./styles.scss";
import assets from "../../assets";
import NormalButton from "../../components/NormalButton";
import NormalTable from "../../components/NormalTable";
import NormalInput from "../../components/inputField";
import NormalModal from "../../components/NormalModal";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/Toast";
import { getGetPaid } from "../../redux/reducers/getPaidSlice";
// import { getPay } from "../../redux/reducers/paySlice";
import Pagination from "../../components/pagination";
import { useSelector } from "react-redux";

const GetPaid = () => {
  const [activeMenu, setActiveMenu] = useState("In process");
  const [payData, setPayData] = useState([]);
  const [show, setShow] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [pageMeta, setPageMeta] = useState({
    pageCount: 0,
  });
  const handleToReload = () => {
    window.location.reload();
  };
  const [page, setPage] = useState(1);
  let navigate = useNavigate();
  const menus = [
    {
      id: 1,
      title: "In process",
    },
    {
      id: 2,
      title: "Scheduled",
    },
    {
      id: 3,
      title: "Received",
    },
  ];

  const [total, settotal] = useState([]);
  const [selectedRow, setSelectedRows] = useState([]);

  // const [automate, setAutomate] = useState(false);
  const [todo, setTodo] = useState([{ id: Math.random(), title: "" }]);
  const [todos, setTodos] = useState([]);
  const [sortedTable, setSortedTable] = useState({
    sorted: "iDate",
    reversed: false,
  });
  const showNotifications = useSelector(
    (state) => state.dashboard.showNotifications
  );

  useEffect(() => {
    getPayApi(
      activeMenu === "In process"
        ? "Process"
        : activeMenu === "Received"
        ? "Received"
        : "Scheduled"
    );
  }, [activeMenu, page]);

  const getPayApi = (data) => {
    // dispatch(
    getGetPaid(`?type=${data}&page=${page - 1}&size=${10}`)
      .then((res) => {
        console.log(res.data.content);
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
    // );
  };

  const toggleReadMore = () => {
    setReadMore((prev) => !prev);
  };

  function handleToSend() {
    // Toast({
    //   type: "success",
    //   message: "send Successfully",
    // });
    navigate("/main/email-notification");
  }
  const handleAddingTodo = () => {
    const newTodo = { id: Math.random(), title: todo[0].title };
    setTodos([...todos, newTodo]);
    setTodo([{ id: Math.random(), title: "" }]);
  };
  function handleTodoDelete(id) {
    setTodos(todos.filter((item) => item.id !== id));
  }

  const headerDetails = [
    {
      label: (
        <NormalInput
          type={"checkbox"}
          checkboxInput
          onChange={(e) => {
            if (e.target.checked) {
              let temp = 0;
              const selectedRows = payData.map((list) => {
                temp += list.totalAmount;
                return list.invoiceIid;
              });
              setSelectedRows(() => selectedRows);
              settotal(Math.round(temp));
            } else {
              setSelectedRows([]);
              settotal(0);
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

            return dateA - dateB;
          });
        } else {
          payDataCopy.sort((a, b) => {
            let dateA = new Date(a.issueDate.split("-").reverse().join("/"));
            let dateB = new Date(b.issueDate.split("-").reverse().join("/"));

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
        setSortedTable({ sorted: "iDate", reversed: !sortedTable.reversed });
        const payDataCopy = [...payData];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            let dateA = new Date(a.dueDate.split("-").reverse().join("/"));
            let dateB = new Date(b.dueDate.split("-").reverse().join("/"));

            return dateA - dateB;
          });
        } else {
          payDataCopy.sort((a, b) => {
            let dateA = new Date(a.dueDate.split("-").reverse().join("/"));
            let dateB = new Date(b.dueDate.split("-").reverse().join("/"));

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
    {
      label: "Days exceed",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "INumber", reversed: !sortedTable.reversed });
        const payDataCopy = [...payData];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            return a.daysExceed - b.daysExceed;
          });
        } else {
          payDataCopy.sort((a, b) => {
            return b.daysExceed - a.daysExceed;
          });
        }
        setPayData(payDataCopy);
      },
    },
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
  ];
  const invoiceDetails = [
    {
      label: "Invoice Number",
    },
    {
      label: "Received Date",
    },
    {
      label: "Amount",
    },
  ];

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleToDashboard = () => {
    navigate("/main/create-invoice");
  };

  function handleGetPayId(id, totalAmount) {
    const isSelected = selectedRow.includes(id);

    if (isSelected) {
      setSelectedRows((prevSelectedRows) => {
        return prevSelectedRows.filter((selectedId) => selectedId !== id);
      });
      settotal((prevTotal) => {
        const newtotal = prevTotal - totalAmount;
        settotal(Math.round(newtotal));
        return newtotal;
      });
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
      settotal((prevTotal) => {
        const newtotal = prevTotal + totalAmount;
        settotal(Math.round(newtotal));
        return newtotal;
      });
    }
  }
  const para = (id) => {
    navigate(`/main/invoice-details/${id}`);
  };

  return (
    <div className="getpaid-main-container">
      <div
        className={
          showNotifications
            ? "getpaid-left-container"
            : "getpaid-left-full-container"
        }
      >
        <div className="getpaid-menu-main-container">
          <div className="getpaid-menu-container">
            {menus.map(({ title }) => (
              <div
                className={`getpaid-menu-item ${
                  activeMenu === title ? "getpaid-active" : ""
                }`}
                onClick={() => handleMenuClick(title)}
              >
                {title}
              </div>
            ))}
          </div>
          <div className="d-flex align-item-center getPaidSmallScreenDiv">
            <div className="getpaid-filter">
              <img
                src={assets.Icons.filter}
                alt="filter"
                className="filter-icon"
              />
            </div>
            <div className="add-invoice-container">
              <NormalButton
                label="+ Add Invoice"
                onClick={handleToDashboard}
                addBtn
              />
            </div>
          </div>
        </div>
        <div className="mt-4 getpaid-table-div">
          <NormalTable
            headerDetails={headerDetails}
            custom_getpaid_table
            check
            // pagination={true}
          >
            {payData.length > 0
              ? payData.slice(1, 10).map((list) => {
                  return (
                    <>
                      <tr className="px-3 ">
                        <td>
                          <NormalInput
                            type={"checkbox"}
                            checkboxInput
                            onChange={() =>
                              handleGetPayId(list.invoiceIid, list.totalAmount)
                            }
                            checked={selectedRow.includes(list.invoiceIid)}
                          />
                        </td>
                        <td>{list.issueDate.split("-").join("/")}</td>
                        <td>{list.dueDate.split("-").join("/")}</td>
                        <td>
                          {" "}
                          <div
                            className="blue-color"
                            onClick={() =>
                              navigate(
                                `/main/Vendor-details/${list.vendorName}/${
                                  activeMenu === "In process"
                                    ? "Process"
                                    : activeMenu
                                }`
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {list.vendorName}
                          </div>
                        </td>
                        <td>{list.invoiceNumber}</td>

                        <td className="text-danger ">{list.daysExceed}</td>
                        <td className="getpaid-total-amount-row">
                          {`$${list.totalAmount}`}
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
              : ""}
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
        <div className="getpaid-right-container">
          <div>
            <p className="invoice-details-header"> Invoice Details</p>
          </div>
          <div>
            {selectedRow.length > 0 ? (
              <NormalTable fontLarge headerDetails={invoiceDetails}>
                {readMore
                  ? selectedRow.map((rowId) => {
                      const finalRow = payData.find(
                        (item) => item.invoiceIid === rowId
                      );

                      return (
                        <>
                          <tr key={finalRow.id}>
                            <td>{finalRow.invoiceNumber}</td>
                            <td>{finalRow.issueDate.split("-").join("/")}</td>
                            <td>{finalRow.totalAmount}</td>
                          </tr>
                        </>
                      );
                    })
                  : selectedRow.slice(0, 4).map((rowId) => {
                      const finalRow = payData.find(
                        (item) => item.invoiceIid === rowId
                      );

                      return (
                        <>
                          <tr key={finalRow.id}>
                            <td>{finalRow.invoiceNumber}</td>
                            <td>{finalRow.issueDate.split("-").join("/")}</td>
                            <td>{finalRow.totalAmount}</td>
                          </tr>
                        </>
                      );
                    })}
              </NormalTable>
            ) : (
              ""
            )}
            {selectedRow.length < 5 ? (
              <button style={{ display: "none" }}></button>
            ) : (
              <button onClick={toggleReadMore} className="get-paid-button">
                {readMore ? "View Less " : "View All "}{" "}
                <img
                  src={readMore ? assets.Icons.upArrow : assets.Icons.downArrow}
                  alt="downArrow"
                />
              </button>
            )}

            <hr></hr>
            <div className="para">
              <p className="para-first">Selected Invoice Details</p>
              <p className="para-second">
                Download Pennyflo consolidate report
              </p>
            </div>
            <div className="button-price-container">
              <div className="price-container">
                <p className="total-amount">Total amount Received</p>
                <p className="total-price">{`$${total}`}</p>
              </div>
              <div className="button-container">
                <NormalButton
                  label="Automate Collection"
                  addBtn
                  onClick={() => setShow(!show)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <NormalModal show={show} setModal={setShow}>
        <div className="getpaid-popup-container">
          <div className="pop">
            <div className="getpaid-popup-header">
              <div>
                <p>
                  Remainder for Automate Collection <br></br> Update
                  Successfully!
                </p>
              </div>
              <div className="automatic-collection-popup-edit-btn">
                <NormalButton label="Edit" notifyBtn onClick={handleToReload} />
              </div>
            </div>
            <div className="getpaid-details">
              <div>
                <p className="getpaid-notification-header">
                  Notification Before Due Date
                </p>
              </div>
              <div className="automatic-collection-icon-color">
                <img
                  className="automatic-collection-icons"
                  src={assets.Icons.at}
                  alt=""
                ></img>
                <label>Email Automatic</label>
              </div>
              <div className="getpaid-labels">
                <label>Trigger:</label>
                Due Date-2days
              </div>
              <div className="getpaid-labels">
                <label>Trigger: </label>
                Notification Before Due Date
              </div>
              <div className="todos">
                <div>
                  <label>Recipient:</label>
                </div>
                <div className="col-8">
                  <NormalInput
                    value={todo[0].title}
                    type="text"
                    onChange={(e) =>
                      setTodo([{ id: Math.random(), title: e.target.value }])
                    }
                    placeholder="Enter Recipient Email/Mobile number"
                  />
                </div>
                <div className="automatic-collection-popup-add-btn">
                  <NormalButton
                    label="ADD"
                    notifyBtn
                    onClick={handleAddingTodo}
                  />
                </div>
              </div>
              <div className="todo">
                {" "}
                {todos.map((item) => (
                  <div className="todo_body">
                    <li key={item.id}>{item.title}</li>
                    <img
                      src={assets.Icons.close_btn}
                      alt="close-btn"
                      onClick={() => handleTodoDelete(item.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="getpaid-details">
              <div>
                <p className="getpaid-notification-header">Call Remainder</p>
              </div>
              <div className="automatic-collection-icon-color">
                <img
                  className="automatic-collection-icons"
                  src={assets.Icons.call}
                  alt=""
                ></img>
                <label className="label">Call</label>
              </div>
              <div className="getpaid-labels">
                <label>Trigger:</label>
                Due Date + 5 days
              </div>
            </div>
            <div className="getpaid-details">
              <div>
                <p className="getpaid-notification-header">
                  Follow Up 1-Physical Letter
                </p>
              </div>
              <div className="automatic-collection-icon-color">
                <img
                  className="automatic-collection-icons"
                  src={assets.Icons.letter}
                  alt=""
                ></img>
                <label className="label">Letter</label>
              </div>
              <div className="getpaid-labels">
                <label>Trigger:</label>
                Due Date + 20 days
              </div>
            </div>

            <div className="automatic-collection-buttons">
              <div className="automatic-collection-popup-cancel-btn">
                <NormalButton
                  label="Cancel"
                  cancelBtn
                  onClick={() => setShow(!show)}
                />
              </div>
              <div className="automatic-collection-popup-send-btn">
                <NormalButton label="Send" onClick={handleToSend} approveBtn />
              </div>
            </div>
          </div>
        </div>
      </NormalModal>
    </div>
  );
};
export default GetPaid;
