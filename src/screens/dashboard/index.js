import React, { useEffect } from "react";
import "./styles.scss";
import assets from "../../assets";
import "../../components/header/styles.scss";
import { useState } from "react";
import { helper } from "../../services/helper";
import NormalButton from "../../components/NormalButton";
import DashCard from "../../components/dashboardCard";
import NormalSelect from "../../components/NormalSelect";
import DatePicker from "../../components/DatePicker";
import { Bar, Doughnut } from "react-chartjs-2";
import { getDashboards } from "../../redux/reducers/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "../../components/Toast";

const Dashboard = ({ open }) => {
  const [activeMenu, setActiveMenu] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dashApi, setDashApi] = useState([]);
  const [dashboardCashFlow, setDashboardCashFlow] = useState([]);
  const [pieChartTotal, setPieChartTotal] = useState([]);
  const [selectDuration, setSelectDuration] = useState("");
  const [expenseDuration, setExpenseDuration] = useState("");
  const [approvalStatus, setApprovalStatus] = useState({});
  const cashFlowDisplayValues = [0, 0, 0];
  const dispatch = useDispatch();
  const {state}=useLocation()
  console.log(state)
  const options = [
    { label: "This Year", value: "year" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
  ];
  const [cardData, setCardData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const navigate = useNavigate();

  const showNotifications = useSelector(
    (state) => state.dashboard.showNotifications
  );

  const handleToApproved = (notificationId) => {
    setApprovalStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus };
      if (updatedStatus[notificationId] === undefined) {
        updatedStatus[notificationId] = true;
      }
      return updatedStatus;
    });
    Toast({
      type: "success",
      message: "Transaction Approved",
    });
  };
  const navigateToAccounts = () => {
    let title = "Accounts";
    navigate("/main/accounts");
    sessionStorage.setItem("activeMenu", title);
  };
  useEffect(() => {
    getDashboardApi(toDate, selectDuration);
  }, [toDate, selectDuration]);
  useEffect(() => {
    getExpensesApi(expenseDuration);
  }, [expenseDuration]);
  const getExpensesApi = (duration) => {
    getDashboards(`/get_expenses?duration=${duration}`)
      .then((res) => {
        // console.log(res.data,"exxxxpppp");
        setPieChartData([
          {
            id: 1,
            chartData: {
              labels: ["Food", "Travel", "Rent", "Others"],
              datasets: [
                {
                  data: [
                    res.data[0].food,
                    res.data[0].travel,
                    res.data[0].rent,
                    res.data[0].others,
                  ],
                  backgroundColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
                  borderColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
                  borderWidth: 1,
                },
              ],
            },

            chartOptions: {
              plugins: {
                legend: {
                  display: true,
                  position: "outside",
                },
                labels: {
                  position: "outside",
                  textStrokeColor: "transparent",
                  color: "rgba(0, 0, 0, 0)",
                },
              },

              cutout: 60,
            },
          },
          {
            id: 2,
            chartData: {
              labels: ["Food", "Travel", "Rent", "Others"],
              datasets: [
                {
                  data: [
                    res.data[1].food,
                    res.data[1].travel,
                    res.data[1].rent,
                    res.data[1].others,
                  ],
                  backgroundColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
                  borderColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
                  borderWidth: 1,
                },
              ],
            },

            chartOptions: {
              plugins: {
                legend: {
                  display: true,
                  position: "outside",
                },
                labels: {
                  position: "outside",
                  textStrokeColor: "transparent",
                  color: "rgba(0, 0, 0, 0)",
                },
              },
              cutout: 60,
            },
          },
          {
            id: 3,
            chartData: {
              labels: ["Food", "Travel", "Rent", "Others"],
              datasets: [
                {
                  data: [
                    res.data[2].food,
                    res.data[2].travel,
                    res.data[2].rent,
                    res.data[2].others,
                  ],
                  backgroundColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
                  borderColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
                  borderWidth: 1,
                },
              ],
            },

            chartOptions: {
              plugins: {
                legend: {
                  display: true,
                  position: "outside",
                },
                labels: {
                  position: "outside",
                  textStrokeColor: "transparent",
                  color: "rgba(0, 0, 0, 0)",
                },
              },
              cutout: 60,
            },
          },
          {
            id: 4,
            chartData: {
              labels: ["Food", "Travel", "Rent", "Others"],
              datasets: [
                {
                  data: [
                    res.data[3].food,
                    res.data[3].travel,
                    res.data[3].rent,
                    res.data[3].others,
                  ],
                  backgroundColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
                  borderColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
                  borderWidth: 1,
                },
              ],
            },

            chartOptions: {
              plugins: {
                legend: {
                  display: true,
                  position: "outside",
                },
                labels: {
                  position: "outside",
                  textStrokeColor: "transparent",
                  color: "rgba(0, 0, 0, 0)",
                },
              },
              cutout: 60,
            },
          },
        ]);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const getDashboardApi = (toDate, duration) => {
    let formattedFromDate = "";
    let formattedToDate = "";
    if (toDate) {
      formattedFromDate = `${
        (fromDate.getDate() < 10 ? "0" : "") + fromDate.getDate()
      }/${
        (fromDate.getMonth() + 1 < 10 ? "0" : "") + (fromDate.getMonth() + 1)
      }/${fromDate.getFullYear()}`;
      formattedToDate = `${
        (toDate.getDate() < 10 ? "0" : "") + toDate.getDate()
      }/${
        (toDate.getMonth() + 1 < 10 ? "0" : "") + (toDate.getMonth() + 1)
      }/${toDate.getFullYear()}`;

      getDashboards(`?from=${formattedFromDate}&to=${formattedToDate}`)
        .then(async (res) => {
          setDashApi(res.data);
          setPieChartTotal([
            res.data.payable,
            res.data.receivable,
            res.data.total,
          ]);
          // console.log(dashApi, "dashapi");
          setDashboardCashFlow(res.data.cashFlow);
          setCardData([
            {
              id: 1,
              icon: assets.Icons.dollar,
              title: "Payables",
              amount: res.data.payable,
              totalAmount: res.data.total,

              chartData: {
                datasets: [
                  {
                    data: [],
                    backgroundColor: [
                      "#9AE2A9",
                      "#FFE188",
                      "#DDCDF7",
                      "#6796AB",
                    ],
                    borderColor: ["#9AE2A9", "#FFE188", "#DDCDF7", "#6796AB"],
                    borderWidth: 1,
                  },
                ],
              },

              chartOptions: {
                plugins: {
                  legend: {
                    display: true,
                    position: "outside",
                  },
                  labels: {
                    position: "outside",
                    textStrokeColor: "transparent",
                    color: "rgba(0, 0, 0, 0)",
                  },
                },
              },
            },
            {
              id: 1,
              icon: assets.Icons.dollar,
              title: "Receivables",
              amount: res.data.receivable,
              totalAmount: res.data.total,
            },
          ]);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    } else {
      getDashboards(`?duration=${duration}`)
        .then(async (res) => {
          setDashApi(res.data);
          setPieChartTotal([
            res.data.payable,
            res.data.receivable,
            res.data.total,
          ]);
          console.log(dashApi, "dashapi");
          setDashboardCashFlow(res.data.cashFlow);
          setCardData([
            {
              id: 1,
              icon: assets.Icons.dollar,
              title: "Payables",
              amount: res.data.payable,
              totalAmount: res.data.total,

              chartData: {
                datasets: [
                  {
                    data: [],
                    backgroundColor: [
                      "#9AE2A9",
                      "#FFE188",
                      "#DDCDF7",
                      "#6796AB",
                    ],
                    borderColor: ["#9AE2A9", "#FFE188", "#DDCDF7", "#6796AB"],
                    borderWidth: 1,
                  },
                ],
              },

              chartOptions: {
                plugins: {
                  legend: {
                    display: true,
                    position: "outside",
                  },
                  labels: {
                    position: "outside",
                    textStrokeColor: "transparent",
                    color: "rgba(0, 0, 0, 0)",
                  },
                },
              },
            },
            {
              id: 1,
              icon: assets.Icons.dollar,
              title: "Receivables",
              amount: res.data.receivable,
              totalAmount: res.data.total,
            },
          ]);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }

    // );
  };

  const a = () => {
    console.log(dashApi);
  };

  const handleFromDate = (date) => {
    setFromDate(date);
    console.log(date, "fromdata");
  };
  const handleToDate = (date) => {
    setToDate(date);
  };
  const textCenterDown = [
    {
      id: "textCenterDown",
      beforeDatasetsDraw(chart) {
        const { ctx } = chart;
        let Total = `${Math.round(
          (pieChartTotal[0] / pieChartTotal[2]) * 100
        )}%`;

        ctx.save();
        ctx.font = "400 16px Poppins";
        ctx.fillStyle = "#373D3F";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let textHeight =
          ctx.measureText(Total).actualBoundingBoxAscent +
          ctx.measureText(Total).actualBoundingBoxDescent;
        ctx.fillText(
          Total,
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y
        );
        ctx.restore();
      },
    },
    {
      id: "textCenterDown",
      beforeDatasetsDraw(chart) {
        const { ctx } = chart;
        let Total = `${Math.round(
          (pieChartTotal[1] / pieChartTotal[2]) * 100
        )}%`;

        ctx.save();
        ctx.font = "400 16px Poppins";
        ctx.fillStyle = "#373D3F";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let textHeight =
          ctx.measureText(Total).actualBoundingBoxAscent +
          ctx.measureText(Total).actualBoundingBoxDescent;
        ctx.fillText(
          Total,
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y
        );
        ctx.restore();
      },
    },
  ];
  const menus = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Payments",
    },
    {
      id: 3,
      title: "Others",
    },
  ];

  const formattedAmount = (amount, isTotal) => {
    return isTotal
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(amount)
      : new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
        }).format(amount);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  const extractProfileInitial = (notificationMsg) => {
    const names = notificationMsg.match(/[A-Z][a-z]*/g);
    if (!names || names.length === 0) {
      return null;
    }
    return (
      names[0][0] + (names.length > 1 ? names[names.length - 1][0] : "")
    ).toUpperCase();
  };
  const getRandomColor = () => {
    const lightColors = ["#87CEEB", "#FFB6C1", "#98FB98", "#FFD700", "#FFA07A"];
    return lightColors[Math.floor(Math.random() * lightColors.length)];
  };
  // const formatNameInBold = (notificationMsg) => {
  //   const names = notificationMsg.match(/[A-Z][a-z]*/g);
  //   console.log(names, "names");
  //   if (!names || names.length === 0) {
  //     return notificationMsg;
  //   }

  //   const firstName = names[0];
  //   const lastName = names.length > 1 ? names[names.length - 1] : "";
  //   console.log(firstName, lastName, "firstName");
  //   const boldName = `<strong>${firstName} ${lastName}</strong>`;
  //   return notificationMsg.replace(`${firstName} ${lastName}`, boldName);
  // };

  let totalBalance = 0;

  const handleAbort = () => {
    Toast({
      type: "error",
      message: "This Transaction has been Aborted",
    });
  };

  const handleDeny = (id) => {
    const updatedNotifications = dashApi.notifications.filter(
      (item) => item.notificationId !== id
    );

    // Update the state with the filtered notifications
    setDashApi((prevDashApi) => ({
      ...prevDashApi,
      notifications: updatedNotifications,
    }));

    Toast({
      type: "error",
      message: "Transaction Denied",
    });
  };

  return (
    <div className="dashboard-main-container">
      <div
        className={
          !showNotifications
            ? "dashboard-left-full-container"
            : "dashboard-left-container"
        }
      >
        <div className="dashboard-date-container">
          <div className="dashboard-from-date-container ">
            <DatePicker
              calendarStyle={true}
              placeHolder={true}
              isWeekdays={true}
              format={"dd-MM-yyyy"}
              placeholderText="From Date"
              rightIcon
              calendarIcon
              onChange={handleFromDate}
              maxDate={new Date()}
              selected={fromDate}
              value={fromDate}
            />
          </div>
          <div className="dashboard-from-date-container">
            <DatePicker
              calendarStyle={true}
              placeHolder={true}
              isWeekdays={true}
              format={"dd-MM-yyyy"}
              placeholderText="To Date"
              rightIcon
              calendarIcon
              onChange={handleToDate}
              selected={toDate}
              minDate={fromDate} // Set minDate to fromDate
              value={toDate}
            />
          </div>
          <div className="dashboard-select-container">
            <NormalSelect
              name="year"
              options={options}
              value={selectDuration}
              onChange={(selectedOption) =>
                setSelectDuration(selectedOption.target.value)
              }
            />
          </div>
        </div>
        <div className="doughnutCards d-flex ">
          {cardData.map((data, index) => (
            <div className="col-md-6 pe-2">
              <DashCard
                icon={data.icon}
                title={data.title}
                amount={data.amount}
                totalAmount={data.totalAmount}
                data={data.chartData}
                options={data.chartOptions}
                plugins={
                  index === 0 ? [textCenterDown[0]] : [textCenterDown[1]]
                }
              />
            </div>
          ))}
        </div>
        <div className="main-chart-container">
          <p onClick={a} className="cash-flow">
            Cash Flow
          </p>
          <div className="dashboard-bar-chart-icons">
            <div className="option-lable">
              <img
                src={assets.Icons.voilet}
                alt="optionIcon"
                className="option-icon"
              />{" "}
              {dashboardCashFlow.forEach((item) => {
                cashFlowDisplayValues[0] =
                  cashFlowDisplayValues[0] + item.average;
                cashFlowDisplayValues[1] =
                  cashFlowDisplayValues[1] + item.receivable;
                cashFlowDisplayValues[2] =
                  cashFlowDisplayValues[2] + item.payable;
              })}
              {`$${Math.round(cashFlowDisplayValues[0] * 100) / 100}`}
            </div>

            <div className="option-lable">
              <img
                src={assets.Icons.aqua}
                alt="optionIcon"
                className="option-icon"
              />{" "}
              {`$${Math.round(cashFlowDisplayValues[1] * 100) / 100}`}
            </div>
            <div className="option-lable">
              <img
                src={assets.Icons.lightpink}
                alt="optionIcon"
                className="option-icon"
              />{" "}
              {`$${Math.round(cashFlowDisplayValues[2] * 100) / 100}`}
            </div>
          </div>
          <div className="mixed-chart-container">
            <Bar
              data={{
                labels: dashboardCashFlow.map((item) => {
                  return item.month;
                }),
                datasets: [
                  {
                    label: "Receivable",
                    data: dashboardCashFlow.map((item) => {
                      return item.receivable;
                    }),
                    backgroundColor: "#4FF5C3",
                    order: 2,
                  },
                  {
                    label: "Payable",
                    data: dashboardCashFlow.map((item) => {
                      return item.payable;
                    }),
                    backgroundColor: "#FF9CA9", // Red color for Loss
                    order: 2,
                  },
                  {
                    type: "line",
                    label: "Net",
                    data: dashboardCashFlow.map((item) => {
                      return item.average;
                    }),
                    borderColor: "#7E57FF", // Purple color for the line
                    fill: true,
                    yAxisID: "y",
                    order: 1,
                    pointRadius: 0, // Set pointRadius to 0 to hide dots in the line chart
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false, // Set to false to control aspect ratio
                aspectRatio: 6,
                scales: {
                  x: {
                    beginAtZero: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#B2BEC3",
                    },
                    axis: {
                      display: false,
                    },
                  },
                  y: {
                    beginAtZero: false,
                    grid: {
                      display: true,
                    },
                    border: {
                      display: false,
                    },
                    ticks: {
                      stepSize: 1000,
                      color: " #B2BEC3 ",
                      callback: function (value, index, values) {
                        return value > 1000 ? value / 1000 + "k" : "";
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="pie-chart-container">
          <div className="d-flex justify-content-between">
            <p className="cash-flow">Expenses</p>
            <NormalSelect
              name="year"
              options={options}
              chartSelect
              value={expenseDuration}
              onChange={(selectedOption) =>
                setExpenseDuration(selectedOption.target.value)
              }
            />
          </div>
          <div className="pie-chart">
            {pieChartData.map((list) => (
              <div className="pie-chart-data1">
                <Doughnut
                  data={list.chartData}
                  options={list.chartOptions}
                  width="116px"
                  // className="me-5"
                  height="116px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {showNotifications && (
        <div className="dashboard-right-container">
          <div className="over-due-main-container">
            <div className="over-due-container">
              <img
                src={assets.Icons.overDuePay}
                alt="overDuePay"
                className="overdue-icon"
              />
              <div className="overdue-text-container">
                <p className="overdue-text">Overdue Payables</p>
              </div>
              <p className="overdue-data">7</p>
              <img
                src={assets.Icons.rightArrow}
                alt="rightIcon"
                className="right-icon cursor-pointer"
                onClick={() => navigate("/main/pay")}
              />
            </div>
            <div className="over-due-container">
              <img
                src={assets.Icons.overDueReceive}
                alt="overDuePay"
                className="overdue-icon"
              />
              <div className="overdue-text-container">
                <p className="overdue-text">Overdue Receivables</p>
              </div>
              <p className="overdue-data">6</p>
              <img
                src={assets.Icons.rightArrow}
                alt="rightIcon"
                className="right-icon cursor-pointer"
                onClick={() => navigate("/main/get-paid")}
              />
            </div>
          </div>
          <div className="banks-main-container">
            <p className="banks-text">Banks</p>
            {dashApi &&
              dashApi.banks &&
              dashApi.banks.map(
                (list, index) => (
                  (totalBalance = totalBalance + list.balance),
                  (
                    <div className="banks-container">
                      <div className="connected-icon-container">
                        <img
                          src={`data:image/jpeg;base64,${list.image}`}
                          alt="connected-accounts-icon"
                          className="connected-account-icon"
                        />
                      </div>
                      <div className="bank-title-container">
                        <p className="bank-title">{list.currency}</p>
                        {list.status && (
                          <span
                            className="bank-default"
                            style={{ display: "none" }}
                          >
                            Default
                          </span>
                        )}
                      </div>
                      <p className="bank-amount">
                        {" "}
                        {formattedAmount(list.balance, list.total)}
                      </p>
                      <img
                        src={assets.Icons.rightArrow}
                        alt="rightIcon"
                        className="bank-right-icon cursor-pointer"
                        onClick={navigateToAccounts}
                      />
                    </div>
                  )
                )
              )}
            <div className="total-container">
              <p className="total-title">Total Balance</p>
              <p className="total-amount">
                {formattedAmount(totalBalance, true)}
              </p>
            </div>
          </div>
          <div className="notification-main-container">
            <p className="banks-text">Notifications</p>
            <div className="menu-container">
              {menus.map(({ title }) => (
                <div
                  className={`menu-item ${
                    activeMenu === title ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(title)}
                >
                  {title}
                </div>
              ))}
            </div>

            {activeMenu === "All"
              ? dashApi &&
                dashApi.notifications &&
                dashApi.notifications.map((list, index) => (
                  <div id={index} className="notification-custom-container">
                    <div className="notification-content">
                      {list.profile ? (
                        <img
                          src={list.profile}
                          alt="notification-profile"
                          className="notification-profile"
                        />
                      ) : (
                        <div>
                          <div
                            className="notification-profile-generator"
                            style={{ backgroundColor: getRandomColor() }}
                          >
                            {extractProfileInitial(list.notificationMsg)}
                          </div>
                        </div>
                      )}
                      <div className="ms-1">
                        <p className="notification-text">
                          {list.notificationMsg}
                        </p>
                        {list.type === "PAYMENT" ? (
                          <div className="d-flex ">
                            <div className="btn-container">
                              {list.paymentView ? (
                                <NormalButton
                                  notifyBtn
                                  label="View"
                                  onClick={() => navigate("/main/get-paid")}
                                />
                              ) : (
                                <NormalButton
                                  onClick={() =>
                                    handleToApproved(list.notificationId)
                                  }
                                  approveBtn
                                  label={
                                    approvalStatus[list.notificationId]
                                      ? "Approved"
                                      : "Approve"
                                  }
                                />
                              )}
                            </div>
                            <div
                              className={
                                list.paymentView
                                  ? "btn-container-abort"
                                  : "btn-container"
                              }
                            >
                              {list.paymentView ? (
                                <NormalButton
                                  notifyBtn
                                  label="Abort Transaction"
                                  onClick={handleAbort}
                                />
                              ) : (
                                <NormalButton
                                  notifyBtn
                                  label="Deny"
                                  onClick={() =>
                                    handleDeny(list.notificationId)
                                  }
                                />
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : activeMenu === "Payments"
              ? dashApi &&
                dashApi.notifications &&
                dashApi.notifications.map((list, index) => (
                  <>
                    {list.type === "PAYMENT" && (
                      <div id={index} className="notification-custom-container">
                        <div className="notification-content">
                          {list.profile ? (
                            <img
                              src={list.profile}
                              alt="notification-profile"
                              className="notification-profile"
                            />
                          ) : (
                            <div
                              className="notification-profile-generator"
                              style={{ backgroundColor: getRandomColor() }}
                            >
                              {extractProfileInitial(list.notificationMsg)}
                            </div>
                          )}
                          <div className="ms-1">
                            <p className="notification-text">
                              {list.notificationMsg}
                            </p>
                            {list.type === "PAYMENT" ? (
                              <div className="d-flex">
                                <div className="btn-container">
                                  {list.paymentView ? (
                                    <NormalButton notifyBtn label="View" />
                                  ) : (
                                    <NormalButton
                                      onClick={() =>
                                        handleToApproved(list.notificationId)
                                      }
                                      approveBtn
                                      label={
                                        approvalStatus[list.notificationId]
                                          ? "Approved"
                                          : "Approve"
                                      }
                                    />
                                  )}
                                </div>
                                <div
                                  className={
                                    list.paymentView
                                      ? "btn-container-abort"
                                      : "btn-container"
                                  }
                                >
                                  {list.paymentView ? (
                                    <NormalButton
                                      notifyBtn
                                      label="Abort Transaction"
                                    />
                                  ) : (
                                    <NormalButton notifyBtn label="Deny" />
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))
              : dashApi &&
                dashApi.notifications &&
                dashApi.notifications.map((list, index) => (
                  <>
                    {list.type === "OTHER" && (
                      <div id={index} className="notification-custom-container">
                        <div className="notification-content">
                          {list.profile ? (
                            <img
                              src={list.profile}
                              alt="notification-profile"
                              className="notification-profile"
                            />
                          ) : (
                            <div
                              className="notification-profile-generator"
                              style={{ backgroundColor: getRandomColor() }}
                            >
                              {extractProfileInitial(list.notificationMsg)}
                            </div>
                          )}
                          <div className="ms-1">
                            <p className="notification-text">
                              {list.notificationMsg}
                            </p>
                            {list.type === "PAYMENT" ? (
                              <div className="d-flex">
                                <div className="btn-container">
                                  <NormalButton approveBtn label="Approve" />
                                </div>
                                <div className="btn-container">
                                  <NormalButton notifyBtn label="Deny" />
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
