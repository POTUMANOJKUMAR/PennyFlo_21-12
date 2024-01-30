import React, { useEffect } from "react";
import NormalModal from "../../components/NormalModal";
import { useState } from "react";
import "./styles.scss";
import assets from "../../assets";
import { Bar, Doughnut } from "react-chartjs-2";
import NormalInput from "../../components/inputField";
import NormalButton from "../../components/NormalButton";
import NormalSelect from "../../components/NormalSelect";
import DatePicker from "../../components/DatePicker";
import { useNavigate } from "react-router-dom";
import {
  getForecast,
  exportForecast,
  foreCastViewDetail,
} from "../../redux/reducers/forecastSlice";
import { Toast } from "../../components/Toast";

function Forecast() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [dropdown, setDropDown] = useState(3);
  const [showCreateScenario, setShowCreateScenario] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dynamicFlow, setDynamicFlow] = useState({});
  const [viewDetail, setViewDetail] = useState([]);
  const [cashFlowForecast, setCashFlowForecast] = useState({});
  const [scenarios, setScenarios] = useState({});
  const [cashFlowPosition, setCashFlowPosition] = useState({});
  const [dynamicCashFlow, setDynamicCashFlow] = useState([]);
  const [cashFlowForecastMoneyFlow, setCashFlowForecastMoneyFlow] = useState(
    []
  );
  const [scenarioCashFlow, setScenarioCashFlow] = useState([]);
  const [positionCashFlows, setPositionCashFlows] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [selectDuration, setSelectDuration] = useState("");
  const [dynamicFlowOption, setDynamicFlowOption] = useState("");

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
          setPositionCashFlows(res.data.cashFlowPosition.positionCashFlows);
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
          setPositionCashFlows(res.data.cashFlowPosition.positionCashFlows);
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

  const handleFromDate = (date) => {
    setFromDate(date);
  };
  const handleToDate = (date) => {
    setToDate(date);
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

 
  const [activeMenu, setActiveMenu] = useState("Charts");
  const travelOptions = [
    { label: "Travel", value: 1 },
    { label: "Month", value: 2 },
    { label: "Week", value: 3 },
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

  const handleMenuClick = (menu, link) => {
    setActiveMenu(menu);
    navigate(link);
  };
  function handleCreateScenario() {
    setShowCreateScenario(!showCreateScenario);
  }
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
  return (
    <>
      <div>
        <div className="forecast">
          <div className="forecast-title-container">
            <div className="menus">
              {menus.map(({ title, link }) => (
                <div
                  className={`forecast-menu-item ${
                    activeMenu === title ? "forecast-active" : ""
                  }`}
                  onClick={() => handleMenuClick(title, link)}
                >
                  {title}
                </div>
              ))}
            </div>
            <div className="date-picker">
              <div className="forecast-from-date-container ">
                <DatePicker
                  calendarStyle={true}
                  placeHolder={true}
                  isWeekdays={true}
                  format={"dd-MM-yyyy"}
                  placeholderText="From Date"
                  rightIcon
                  calendarIcon
                  maxDate={new Date()}
                  onChange={handleFromDate}
                  selected={fromDate}
                  value={fromDate}
                />
              </div>

              <div className="forecast-end-date-container ">
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

              <div className="forecast-select-container ">
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
            <div className=" buttonss">
              <div className="exports-lable">
                <NormalButton label={"Export"} exports onClick={handleExport} />
              </div>

              <div className="scenarios-lable">
                <NormalButton
                  label={"Create Scenarios"}
                  scenarios
                  onClick={() => setShowCreateScenario(true)}
                />
              </div>
            </div>
          </div>

          <div className="container-fluid mt-4">
            <div className="row">
              <div className="forecast-card col-xs-12 col-sm-12 col-md-6">
                <div className="card dynamic-chart">
                  <div className="card-body dynamic-chart-container">
                    <div className="d-flex justify-content-between mt-2">
                      <p className="card-title dynamic-expenses">
                        Dynamic Flow
                      </p>
                      <div className="travels-select">
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

              <div className="forecast-card col-xs-12 col-sm-12 col-md-6 ">
                <div className="card cash-forecast-chart-container">
                  <div className="card-body">
                    <div className=" cash-forecast mt-1">
                      <p className="card-title cash-flow pb-2">
                        Cash Flow Forecast
                      </p>
                      <div className="travel-select">
                        <NormalSelect
                          onChange={(e) => setDropDown(e.target.value)}
                          name="Travel"
                          options={optionsForecast}
                          chartSelect
                        />
                      </div>
                      <div className="view-detail">
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

          <div className="container-fluid mt-4">
            <div className="row">
              <div className="col-12 col-md-6 scenario-container">
                <div className="card cashs-forecast-chart-container ">
                  <div className="card-body">
                    <div className="mt-2">
                      <p className="card-title dynamic-expenses">Scenarios</p>
                    </div>
                    <div className="bar-options d-flex gap-3 ">
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
                        Reception of Funding
                      </div>

                      <div className="option-lables">
                        <img
                          src={assets.Icons.travelIcon}
                          alt="optionIcon"
                          className="option-icon"
                        />{" "}
                        Late Payments
                      </div>
                    </div>
                    <div className="dynamic-expenses-chart-container mt-4">
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

              <div className="col-12 col-md-6">
                <div className="card cash-forecast-chart-container">
                  <div className="card-body">
                    <div className=" mt-3">
                      <p className="card-title dynamic-expenses">
                        Cash Flow Position
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
                    <div className="dynamic-expenses-chart-container mt-4">
                      <Bar
                        data={{
                          labels: positionCashFlows.map((item) => {
                            return item.month;
                          }),
                          datasets: [
                            {
                              label: "Profit",
                              data: [
                                180000, 185000, 190000, 195000, 180000, 175000,
                                170000, 165000, 160000, 165000, 170000, 180000,
                              ],
                              backgroundColor: "#ADADAD ",
                              order: 2,
                            },
                            {
                              label: "Loss",
                              data: [
                                100000, 115000, 120000, 125000, 100000, 120000,
                                125000, 130000, 135000, 125000, 120000, 100000,
                              ],
                              backgroundColor: "#ADADAD", // Red color for Loss
                              order: 2,
                            },
                            {
                              type: "line",
                              label: "Main Scenario",
                              data: positionCashFlows.map((item) => {
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
                              label: "Hiring New Staff Member",
                              data: positionCashFlows.map((item) => {
                                return item.hiringNewStaffs;
                              }),
                              borderColor: "#EDC809 ",
                              fill: true,
                              yAxisID: "y",
                              order: 1,
                              pointRadius: 4, // Set pointRadius to 0 to hide dots in the line chart
                            },
                            {
                              type: "line",
                              label: "  Investments",
                              data: positionCashFlows.map((item) => {
                                return item.investment;
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
        show={showCreateScenario}
        customModalClass="createScenarioPopup"
      >
        <div className="formContainer">
          <div className="header">
            <div className="heading">Create Scenarios</div>
            <div>
              <img
                onClick={handleCreateScenario}
                src={assets.Icons.close}
                alt="closeIcon"
              />
            </div>
          </div>
          <hr />
          <div className="mainForm">
            <form action="">
              <div className="formDetails">
                <label htmlFor="scenarioType">Scenario Type</label>
                <NormalSelect options={optionsForecast} />
              </div>
              <div className="formDetails">
                <label htmlFor="avgRevenueMonth">Avg Revenue / Month</label>
                <NormalInput placeholder="0.00" leftIcon dollarIcon />
              </div>
              <div className="formDetails">
                <label htmlFor="avgNoOfCustomers">
                  Avg Number of Customers/ Month
                </label>
                <NormalInput placeholder="No. of Customers" />
              </div>
              <div className="formDetails">
                <label htmlFor="avgRevenueCustomer">
                  Avg. Revenue / Customer
                </label>
                <NormalInput placeholder="No. of Customers" />
              </div>
              <div className="formDetails">
                <label htmlFor="momGrowth">MoM Growth</label>
                <NormalInput placeholder="Enter here" />
              </div>
              <div className="formDetails">
                <label htmlFor="noOfMonths">Number of Months</label>
                <NormalInput placeholder="No. of Months" />
              </div>
              <div className="formDetails">
                <label htmlFor="churnRate">Churn Rate</label>
                <NormalInput placeholder="Enter here" />
              </div>
            </form>
          </div>
          <div className="buttons">
            <NormalButton
              label="Cancel"
              cancelBtn
              onClick={handleCreateScenario}
            />
            <NormalButton
              label="Show"
              showBtn
              onClick={() => navigate("/main/forecast-payment")}
            />
          </div>
        </div>
      </NormalModal>
    </>
  );
}

export default Forecast;
