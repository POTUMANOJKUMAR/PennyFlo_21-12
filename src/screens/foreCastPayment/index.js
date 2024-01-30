import React from "react";
import { useState, useEffect } from "react";
import NormalSelect from "../../components/NormalSelect";
import DatePicker from "../../components/DatePicker";
import { Bar, Doughnut } from "react-chartjs-2";
import "./styles.scss";
import assets from "../../assets";
import { Col, Container, Row, Form } from "react-bootstrap";
import NormalButton from "../../components/NormalButton";
import NormalTable from "../../components/NormalTable";
import NormalModal from "../../components/NormalModal";
import {
  exportForecast,
  getForecast,
} from "../../redux/reducers/forecastSlice";
import {
  getForecastRevenue,
  foreCastViewDetail,
} from "../../redux/reducers/forecastSlice";
import { Toast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
const ForeCastPayment = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Charts");
  const [fromDate, setFromDate] = useState("");
  const [show, setShow] = useState(false);
  const [toDate, setToDate] = useState("");
  const [dynamicFlow, setDynamicFlow] = useState({});
  const [dropdown, setDropDown] = useState(3);
  const [cashFlowForecast, setCashFlowForecast] = useState({});
  const [pieChartData, setPieChartData] = useState([]);
  const [scenarios, setScenarios] = useState({});
  const [selectDuration, setSelectDuration] = useState("");
  const [dynamicCashFlow, setDynamicCashFlow] = useState([]);
  const [dynamicFlowOption, setDynamicFlowOption] = useState("");
  const [viewDetail, setViewDetail] = useState([]);
  const [cashFlowPosition, setCashFlowPosition] = useState({});
  const [cashFlowForecastMoneyFlow, setCashFlowForecastMoneyFlow] = useState(
    []
  );
  const [scenarioCashFlow, setScenarioCashFlow] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    getForecastRevenueApi();
  }, []);

  const getForecastRevenueApi = () => {
    getForecastRevenue()
      .then((res) => {
        console.log(res);
        setDynamicFlow(res.data.dynamicFlow);
        setDynamicCashFlow(res.data.dynamicFlow.cashFLow);
        setCashFlowForecast(res.data.cashFlowForecast);
        setCashFlowForecastMoneyFlow(res.data.cashFlowForecast.moneyFlow);
        setScenarios(res.data.scenarios);
        setScenarioCashFlow(res.data.scenarios.scenarioCashFlow);
        setRevenue(res.data.revenue);
      })
      .catch((err) => console.log(err));
  };

  const options = [
    { label: "This Year", value: "year" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
  ];
  const optionsForecast = [
    { label: "3 Months", value: "3" },
    { label: "6 Months", value: "6" },

    { label: "9 Months", value: "9" },

    { label: "Next Year", value: "12" },
  ];
  const menus = [
    {
      id: 1,
      title: "Charts",
      link: "/main/forecast",
    },
    {
      id: 1,
      title: "Profit & Loss",
      link: "/main/profit-loss",
    },
  ];

  const headerDetails = [
    { label: "Months", sortKey: false },
    { label: "Customer Growth", sortKey: false },
    { label: "ChurnAdded", sortKey: false },
    { label: "Revenue", sortKey: false },
  ];

  const [payData] = useState([
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
    {
      id: 1,
      months: "1",
      customerGrowth: "300",
      churnAdded: "295.5",
      revenue: "$ 14,775.00",
    },
  ]);

  useEffect(() => {
    getForecastApi(toDate, selectDuration);
  }, [toDate, selectDuration]);

  useEffect(() => {
    getForecastViewDetailApi(dropdown);
  }, [dropdown]);

  useEffect(() => {
    getDynamicFlowApi(dynamicFlowOption);
  }, [dynamicFlowOption]);

  useEffect(() => {
    getCashFlowForecastApi(dropdown);
  }, [dropdown]);
  const getCashFlowForecastApi = (duration) => {
    getForecast(`/cash_flow?duration=${duration}`)
      .then((res) => {
        // console.log(res,"mmmmmmmm");
        setCashFlowForecastMoneyFlow(res.data.moneyFlow);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };
  const handleExport = () => {
    exportForecast().then((res) => {
      console.log(res, "res");
      const csvData = res.data;
      const blob = new Blob([csvData], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "exported_data.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      Toast({
        type: "success",
        message: "Downloaded Successfully",
      });
    });
  };
  const getDynamicFlowApi = (duration) => {
    getForecast(`/dynamic_flow?duration=${duration}`)
      .then((res) => {
        // console.log(res,"mmmmmmmm");
        setDynamicCashFlow(res.data.cashFLow);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };
  const getForecastApi = (toDate, duration) => {
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

      getForecast(`?from=${formattedFromDate}&to=${formattedToDate}`)
        .then((res) => {
          console.log(res);
          setCashFlowForecastMoneyFlow(res.data.cashFlowForecast.moneyFlow);
          setDynamicCashFlow(res.data.dynamicFlow.cashFLow);
          setDynamicFlow(res.data.dynamicFlow);
          setCashFlowForecast(res.data.cashFlowForecast);
          setScenarios(res.data.scenarios);
          setScenarioCashFlow(res.data.scenarios.scenarioCashFlow);
          setCashFlowPosition(res.data.cashFlowPosition);
          // setPositionCashFlows(res.data.cashFlowPosition.positionCashFlows);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getForecast(`?duration=${duration}`)
        .then((res) => {
          console.log(res);
          setCashFlowForecastMoneyFlow(res.data.cashFlowForecast.moneyFlow);
          setDynamicCashFlow(res.data.dynamicFlow.cashFLow);
          setDynamicFlow(res.data.dynamicFlow);
          setCashFlowForecast(res.data.cashFlowForecast);
          setScenarios(res.data.scenarios);
          setScenarioCashFlow(res.data.scenarios.scenarioCashFlow);
          setCashFlowPosition(res.data.cashFlowPosition);
          // setPositionCashFlows(res.data.cashFlowPosition.positionCashFlows);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getForecastViewDetailApi = (data) => {
    foreCastViewDetail(data)
      .then((res) => {
        // console.log(res,"vieew");
        setViewDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMenuClick = (menu, link) => {
    setActiveMenu(menu);
    navigate(link);
  };
  const [isOverlayVisible, setOverlayVisibility] = useState(true);

  const handleCloseClick = () => {
    console.log("Close icon clicked");
    setOverlayVisibility(false);
  };
  useEffect(() => {
    if (viewDetail.length > 0) {
      const newData = [
        {
          id: 1,
          name: "Profit",
          percentage: `${viewDetail[0].monthOverGrowth}%`,
          chartData: {
            datasets: [
              {
                data: [
                  viewDetail[0].monthOverGrowth,
                  100 - viewDetail[0].monthOverGrowth,
                ],
                backgroundColor: ["#FF796E", "#F2F2F2D9"],
                borderRadius: [15, 0],
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
            cutout: 13,
          },
        },
        {
          id: 2,
          name: "Loss",
          percentage: `${viewDetail[0].loss}%`,
          chartData: {
            datasets: [
              {
                data: [viewDetail[0].loss, 100 - viewDetail[0].loss],
                backgroundColor: ["#FF796E", "#F2F2F2D9"],
                borderRadius: [15, 0],
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
            cutout: 13,
          },
        },
        {
          id: 3,
          name: "profit",
          percentage: `${viewDetail[0].profit}%`,
          chartData: {
            datasets: [
              {
                data: [viewDetail[0].profit, 100 - viewDetail[0].profit],
                backgroundColor: ["#FF796E", "#F2F2F2D9"],
                borderRadius: [15, 0],
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
            cutout: 13,
          },
        },
      ];

      setPieChartData(newData);
    }
  }, [viewDetail]);

  const handleFromDate = (date) => {
    setFromDate(date);
  };
  const handleToDate = (date) => {
    setToDate(date);
  };
  return (
    <div>
      <div className="forecastpay">
        <div className="forecastpay-title-container">
          <div className="menuspay">
            {menus.map(({ title, link }) => (
              <div
                className={`forecastpay-menu-item ${
                  activeMenu === title ? "forecastpay-active" : ""
                }`}
                onClick={() => handleMenuClick(title, link)}
              >
                {title}
              </div>
            ))}
          </div>
          <div className="date-pickerpay">
            <div className="forecastpay-from-date-container ">
              <DatePicker
                calendarStyle={true}
                placeHolder={true}
                isWeekdays={true}
                format={"dd-MM-yyyy"}
                placeholderText="From Date"
                rightIcon
                calendarIcon
                onChange={handleFromDate}
                selected={fromDate}
                maxDate={new Date()}
                value={fromDate}
              />
            </div>

            <div className="forecastpay-end-date-container ">
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

            <div className="forecastpay-select-container ">
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
          <div className=" buttonsss">
            <div className="exports-lables">
              <NormalButton label={"Export"} exports onClick={handleExport} />
            </div>

            <div className="scenarios-lables">
              <NormalButton
                label={"Create Scenarios"}
                scenarios
                // onClick={() => setShowCreateScenario(true)}
              />
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row">
            <div className="forecastpay-card col-xs-12 col-sm-12 col-md-6">
              <div className="card dynamic-chart">
                <div className="card-body dynamic-chart-container">
                  <div className="d-flex justify-content-between mt-2">
                    <p className="card-title dynamic-expenses">Dynamic Flow</p>
                    <div className="travel-select">
                      <NormalSelect
                        name="Travel"
                        options={optionsForecast}
                        chartSelect
                        value={dynamicFlowOption}
                        onChange={(e) => setDynamicFlowOption(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="dynamic-expenses-chart-container mt-3">
                    <Bar
                      data={{
                        labels: dynamicCashFlow.map((item) => {
                          return item.month;
                        }),
                        datasets: [
                          {
                            type: "line",
                            label: "Net",
                            data: dynamicCashFlow.map((item) => {
                              return item.cash;
                            }),

                            borderColor: "#7E57FF",
                            fill: true,
                            yAxisID: "y",
                            order: 1,
                            pointRadius: 4,
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
                              stepSize: 10000,
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
              </div>
            </div>

            <div className="forecastpay-card col-xs-12 col-sm-12 col-md-6 ">
              <div className="card cash-forecastpay-chart-container">
                <div className="card-body">
                  <div className=" cash-forecastpay  mt-1">
                    <p className="card-title cash-flows-forecast pb-2">
                      Cash Flow Forecast
                    </p>
                    <div className="year-select">
                      <NormalSelect
                        onChange={(e) => setDropDown(e.target.value)}
                        name="Travel"
                        options={optionsForecast}
                        chartSelect
                      />
                    </div>
                    <div className="view-button">
                      <NormalButton
                        label={"VIEW DETAIL"}
                        notifyBtn
                        onClick={() => setShow(true)}
                      />
                    </div>
                  </div>
                  <div className="bar-option  d-flex gap-3 mt-3">
                    <div className="option-lables">
                      <img
                        src={assets.Icons.rentIcon}
                        alt="optionIcon"
                        className="option-icons"
                      />{" "}
                      Net Cash flow
                    </div>
                    <div className="option-lables">
                      <img
                        src={assets.Icons.foodIcon}
                        alt="optionIcon"
                        className="option-icons"
                      />{" "}
                      Cash In
                    </div>

                    <div className="option-lables">
                      <img
                        src={assets.Icons.travelIcon}
                        alt="optionIcon"
                        className="option-icon"
                      />{" "}
                      Expenses
                    </div>
                  </div>
                  <div className="dynamic-expenses-chart-containers mt-4">
                    <Bar
                      data={{
                        labels: cashFlowForecastMoneyFlow.map((item) => {
                          return item.month;
                        }),
                        datasets: [
                          {
                            type: "line",
                            label: " Net Cash flow",
                            data: cashFlowForecastMoneyFlow.map((item) => {
                              return item.netCash;
                            }),
                            borderColor: "#7E57FF", // Purple color for the line
                            fill: true,
                            yAxisID: "y",
                            order: 1,
                            pointRadius: 4, // Set pointRadius to 0 to hide dots in the line chart
                          },
                          {
                            type: "line",
                            label: "Cash In",
                            data: cashFlowForecastMoneyFlow.map((item) => {
                              return item.cashIn;
                            }),
                            borderColor: "#EDC809 ",
                            fill: true,
                            yAxisID: "y",
                            order: 1,
                            pointRadius: 4, // Set pointRadius to 0 to hide dots in the line chart
                          },
                          {
                            type: "line",
                            label: "Expenses",
                            data: cashFlowForecastMoneyFlow.map((item) => {
                              return item.expense;
                            }),
                            borderColor: " #FF796E ",
                            fill: true,
                            yAxisID: "y",
                            order: 1,
                            pointRadius: 4, // Set pointRadius to 0 to hide dots in the line chart
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
                              stepSize: 10000,
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
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6 RevenueScenario-card">
              <div className="card cash-forecastpay-charts-container">
                <div className="card-body">
                  <div className=" mt-3">
                    <p className="card-title dynamics-expenses">
                      Revenue Scenario
                    </p>
                  </div>
                  <div className="bar-options d-flex gap-3">
                    <div className="option-lables">
                      <img
                        src={assets.Icons.rentIcon}
                        alt="optionIcon"
                        className="option-icons"
                      />{" "}
                      Main Scenario
                    </div>
                    <div className="option-lables">
                      <img
                        src={assets.Icons.foodIcon}
                        alt="optionIcon"
                        className="option-icons"
                      />{" "}
                      Hiring New Staff Member
                    </div>
                    <div className="option-lables">
                      <img
                        src={assets.Icons.travelIcon}
                        alt="optionIcon"
                        className="option-icon"
                      />{" "}
                      Investments
                    </div>
                  </div>
                  <div className="dynamic-expenses-charts-container mt-4">
                    <Bar
                      data={{
                        labels: scenarioCashFlow.map((item) => {
                          return item.month;
                        }),
                        datasets: [
                          {
                            label: "Profit",
                            data: [
                              100000, 115000, 120000, 125000, 100000, 120000,
                              125000, 130000, 135000, 125000, 120000, 100000,
                            ],
                            backgroundColor: "#4FF5C3",
                            order: 2,
                          },
                          {
                            label: "Loss",
                            data: [
                              180000, 185000, 190000, 195000, 180000, 175000,
                              170000, 165000, 160000, 165000, 170000, 180000,
                            ],
                            backgroundColor: "#FF9CA9", // Red color for Loss
                            order: 2,
                          },
                          {
                            type: "line",
                            label: "Main Scenario",

                            data: scenarioCashFlow.map((item) => {
                              return item.mainScenario;
                            }),
                            borderColor: "#7E57FF", // Purple color for the line
                            fill: true,
                            yAxisID: "y",
                            order: 1,
                            pointRadius: 4, // Set pointRadius to 0 to hide dots in the line chart
                          },
                          {
                            type: "line",
                            label: " Reception of Funding",
                            data: scenarioCashFlow.map((item) => {
                              return item.receptionOfFunding;
                            }),
                            borderColor: "#EDC809 ",
                            fill: true,
                            yAxisID: "y",
                            order: 1,
                            pointRadius: 4, // Set pointRadius to 0 to hide dots in the line chart
                          },
                          {
                            type: "line",
                            label: "Late Payments",
                            data: scenarioCashFlow.map((item) => {
                              return item.latePayments;
                            }),
                            borderColor: " #FF796E ",
                            fill: true,
                            yAxisID: "y",
                            order: 1,
                            pointRadius: 4, // Set pointRadius to 0 to hide dots in the line chart
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
                              stepSize: 10000,
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
              </div>
            </div>

            <div className="col-md-6">
              <div className="card cash-forecastpay-charts-container">
                <div className="card-body">
                  <div className="mt-2">
                    <p className="card-title dynamics-expenses">
                      Revenue Overview
                    </p>
                  </div>
                  <div className="dynamic-table-charts-container">
                    <NormalTable headerDetails={headerDetails}>
                      {revenue.length > 0
                        ? revenue.map((list) => {
                            return (
                              <>
                                <tr className="px-3">
                                  <td>{list.month}</td>
                                  <td>{list.customerGrowth}</td>
                                  <td>{list.churnAdded}</td>
                                  <td className="revenue">{list.revenue}</td>
                                </tr>
                              </>
                            );
                          })
                        : "No Data"}
                    </NormalTable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NormalModal show={show}
      setModal={setShow}>
        <div className="forecast-pie-chart-container">
          <div className="forecast-popup-header-container">
            <p>Cash Flow Forecast Details</p>

            <img
              src={assets.Icons.close_btn}
              alt="close-btn"
              onClick={() => setShow(!show)}
            />
          </div>

          <hr></hr>
          <div className="forecast-main-chart-container">
            {pieChartData.map((list) => (
              <div className="forcast-chart-container" key={list.id}>
                <div>
                  <p className="chart-name">{list.name}</p>
                </div>

                <div className="pie-chart-and-percentage">
                  <div className="pie-chart-data">
                    <Doughnut
                      data={list.chartData}
                      options={list.chartOptions}
                    />
                  </div>
                  <div className="chart-percentage">{list.percentage}</div>
                </div>
              </div>
            ))}
          </div>

          {viewDetail.map((item) => (
            <div>
              <div className="forecast-popup-values">
                <div className="">
                  <div className="forecast-header-values">NetRunWay</div>
                  <div className="forecast-header-values1">
                    {item.netRunWay} Months
                  </div>
                </div>
                <div className="">
                  <div className="forecast-header-values">Burn Rate</div>
                  <div className="forecast-header-values1">
                    ${item.burnRate.toFixed(2)}
                  </div>
                </div>
                <div className="">
                  <div className="forecast-header-values">Investments</div>
                  <div className="forecast-header-values1">
                    ${item.investment.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="forecast-popup-values1">
                <div className="">
                  <div className="forecast-header-values">
                    Monthly Cash Needs
                  </div>
                  <div className="forecast-header-values1">
                    ${item.monthlyCaseNeeds}
                  </div>
                </div>
                <div className="">
                  <div className="forecast-header-values">
                    Yearly Cash Needs
                  </div>
                  <div className="forecast-header-values1">
                    ${item.yearlyCashNeeds}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NormalModal>
      <NormalModal
        show={isOverlayVisible}
        setModal={setOverlayVisibility}
        customModalClass="forecastCancel"
      >
        <div className="recalculate-overlay container">
          <div className="redcircle-container">
            <img
              src={assets.Icons.redcircle}
              alt="optionIcon"
              className="redcircle"
              onClick={handleCloseClick}
            />
            <img
              src={assets.Icons.redcanclebutton}
              alt="optionIcon"
              className="redcanclebutton"
              onClick={handleCloseClick}
            />
          </div>
          <div className="recalculate d-flex gap-5">
            <p className="mb-0">
              Recalculate the forecast considering 30% growth in sales and churn
              at 1.5%
            </p>
            <NormalButton label="Cancel" approveBtn />
          </div>
        </div>
      </NormalModal>
    </div>
  );
};

export default ForeCastPayment;
