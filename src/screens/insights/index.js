import React, { useEffect, useState } from "react";
import "./styles.scss";
import assets from "../../assets";
import DatePicker from "../../components/DatePicker";
import NormalSelect from "../../components/NormalSelect";
import { Bar, Line } from "react-chartjs-2";
import { getInsights } from "../../redux/reducers/insightsSlice";
function Insight() {
  const [netCashFlow, setNetcashFlow] = useState({});
  const [moneyFlow, setMoneyFlow] = useState({});
  const [inFlow, setInflow] = useState({});
  const [outFlow, setOutflow] = useState({});
  const [cashFlow, setCashFlow] = useState([]);
  const [nestMoneyFlow, setNestMoneyFlow] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectDuration, setSelectDuration] = useState("");

  useEffect(() => {
    getInsightsApi(toDate,selectDuration);
  }, [toDate,selectDuration]);

  const getInsightsApi = (toDate,duration) => {
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

      getInsights(`?from=${formattedFromDate}&to=${formattedToDate}`)
      .then((res) => {
        // console.log(res)
        setNetcashFlow(res.data.netCashFlow);
        setCashFlow(res.data.netCashFlow.cashFLow);
        setMoneyFlow(res.data.moneyFlow);
        setNestMoneyFlow(res.data.moneyFlow.moneyFlow);
        setInflow(res.data.inflow);

        setOutflow(res.data.outflow);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    else{
      getInsights(`?duration=${duration}`)
      .then((res) => {
        // console.log(res)
        setNetcashFlow(res.data.netCashFlow);
        setCashFlow(res.data.netCashFlow.cashFLow);
        setMoneyFlow(res.data.moneyFlow);
        setNestMoneyFlow(res.data.moneyFlow.moneyFlow);
        setInflow(res.data.inflow);

        setOutflow(res.data.outflow);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  };

  const zeroZeroLines = {
    beforeDatasetsDraw: (chart, args, opts) => {
      const {
        ctx,
        chartArea: { top, bottom, left, right },
        scales: { x, y },
      } = chart;

      const color = opts.color || "black";
      const width = opts.width || 1;

      ctx.beginPath();

      ctx.lineWidth = width;
      ctx.strokeStyle = color;

      ctx.moveTo(x.getPixelForValue(0), bottom);
      ctx.lineTo(x.getPixelForValue(0), top);

      ctx.moveTo(left, y.getPixelForValue(0));
      ctx.lineTo(right, y.getPixelForValue(0));

      ctx.stroke();
    },
  };

  const [fromselectedDate, setFromSelectedDate] = useState(null);
  const [dueselectedDate, setDueSelectedDate] = useState(null);

  const handleDateChangeFrom = (date) => {
    setFromSelectedDate(date);
  };
  const handleDateChangeDue = (date) => {
    setDueSelectedDate(date);
  };

  const [activeMenu, setActiveMenu] = useState("charts");
  const insightOptions = [
    { label: "This Year", value: "year" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
  ]

  const insightTabDetail = [{ id: 1, title: "charts" }];
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  const handleFromDate = (date) => {
    setFromDate(date);
    console.log(date, "fromdate");
  };
  const handleToDate = (date) => {
    setToDate(date);
  };

  return (
    <>
      <div className="insight-main-container">
        <div className="insight-header-container d-lg-flex flex-lg-row flex-md-column">
          <div className="insight-menu-container">
            {insightTabDetail.map(({ title }) => (
              <div
                className={`insight-menu-item ${
                  activeMenu === title ? "insight-active" : ""
                }`}
                onClick={() => handleMenuClick(title)}
              >
                {title}
              </div>
            ))}
          </div>
          <div className="row insight-input-container">
            <div className="col-md-3 col-lg-3 mt-2  ">
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
                value={fromDate}
                maxDate={new Date()}
              />
            </div>
            <div className="col-md-3 col-lg-3 mt-2 ">
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
            <div className="col-md-5 col-lg-4 mt-2">
              <NormalSelect options={insightOptions} 
              value={selectDuration} onChange={(selectedOption) =>
                setSelectDuration(selectedOption.target.value)}/>
            </div>
          </div>
        </div>

        <div className="insight-main-chart-container">
          <div className="top-charts">
            <div className="top-left-line-chart-container">
              <p className="chart-heading">Net Cash Flow</p>
              <div className="insight-up-icons">
                <div className="option-lable">
                  <img
                    src={assets.Icons.voilet}
                    alt="optionIcon"
                    className="option-icon"
                  />{" "}
                  {`$${netCashFlow.total}`}
                </div>
              </div>
              <div className="line-chart">
                <Line
                  data={{
                    labels: cashFlow.map((item) => {
                      return item.month;
                    }),
                    datasets: [
                      {
                        type: "line",
                        label: "Net",
                        data: cashFlow.map((item) => {
                          return item.cash;
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
                    maintainAspectRatio: false,
                    aspectRatio: 6,
                    scales: {
                      x: {
                        beginAtZero: true,
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
                          color: "#B2BEC3",
                          callback: function (value, index, values) {
                            return value >= 1000
                              ? value / 1000 + "k"
                              : value <= 1000
                              ? value / 1000 + "k"
                              : "";
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
            <div className="top-right-bar-chart-container">
              <p className="chart-heading">Money Flows</p>
              <div className="insight-up-icons">
                <div className="option-lable">
                  <img
                    src={assets.Icons.voilet}
                    alt="optionIcon"
                    className="option-icon"
                  />{" "}
                  {`$${moneyFlow.netCashTotal}`}
                </div>

                <div className="option-lable">
                  <img
                    src={assets.Icons.aqua}
                    alt="optionIcon"
                    className="option-icon"
                  />{" "}
                  {`$${moneyFlow.cashInTotal}`}
                </div>
                <div className="option-lable">
                  <img
                    src={assets.Icons.lightpink}
                    alt="optionIcon"
                    className="option-icon"
                  />{" "}
                  {`$${moneyFlow.expenseTotal}`}
                </div>
              </div>
              <div className="bar-chart">
                <Bar
                  data={{
                    labels: nestMoneyFlow.map((item) => {
                      return item.month;
                    }),
                    datasets: [
                      {
                        label: "cashInTotal",
                        data: nestMoneyFlow.map((item) => {
                          return item.cashIn;
                        }),
                        backgroundColor: "#4FF5C3",
                        order: 2,
                        barThickness: 7,
                      },

                      {
                        label: "expenseTotal",
                        data: nestMoneyFlow.map((item) => {
                          return item.expense;
                        }),
                        backgroundColor: "#FF9CA9", // Red color for Loss
                        order: 2,
                        barThickness: 7,
                      },
                      {
                        type: "line",
                        label: "netCashTotal",
                        data: nestMoneyFlow.map((item) => {
                          return item.netCash;
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
                    maintainAspectRatio: false,
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
                          color: "#B2BEC3",
                          callback: function (value, index, values) {
                            return value >= 1000 ? value / 1000 + "k" : value;
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

          <div className="chart-bottom">
            <div className="bottom-left-bar-chart-container">
              <p className="chart-heading">Inflow by Category</p>
              <p className="chart-heading">{`$${inFlow.sumAmount}`}</p>
              <div className="bottom-icon-chart">
                <div className="insight-bottom-icons">
                  <div className="option-lable">
                    <img
                      src={assets.Icons.no_category}
                      alt="optionIcon"
                      className="option-icon"
                    />{" "}
                    No Category
                  </div>
                  <div className="option-lable">
                    <img
                      src={assets.Icons.internatiinal_bal}
                      alt="optionIcon"
                      className="option-icon"
                    />{" "}
                    Internal Balance
                  </div>
                  <div className="option-lable">
                    <img
                      src={assets.Icons.foodIcon}
                      alt="optionIcon"
                      className="option-icon"
                    />{" "}
                    Deposit
                  </div>
                  <div className="option-lable">
                    <img
                      src={assets.Icons.rent}
                      alt="optionIcon"
                      className="option-icon"
                    />{" "}
                    Received
                  </div>
                </div>

                <div className=" bottom-right-bar-chart">
                  <Bar
                    data={{
                      labels: ["", "", "", ""],
                      datasets: [
                        {
                          axis: "y",
                          data: [
                            inFlow.noCategory,
                            inFlow.internalBalance,
                            inFlow.deposit,
                            inFlow.received,
                          ],
                          backgroundColor: [
                            "#B5DFFE",
                            "#B3FDAD",
                            "#FFE5A1",
                            "#CEB0FF",
                          ],
                          order: 2,
                          barThickness: 15,
                        },
                      ],
                    }}
                    options={{
                      indexAxis: "y",
                      maintainAspectRatio: false,
                      aspectRatio: 6,
                      scales: {
                        y: {
                          beginAtZero: false,
                          grid: {
                            display: false,
                          },
                          border: {
                            display: false,
                          },
                          ticks: {
                            color: "#B2BEC3",
                          },
                        },
                        x: {
                          beginAtZero: false,
                          grid: {
                            display: true,
                          },
                          border: {
                            dash: [2, 4],
                          },
                          ticks: {
                            stepSize: 1000,
                            color: "#B2BEC3",
                            callback: function (value, index, values) {
                              return value >= 1000 ? value / 1000 + "k" : value;
                            },
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      categoryPercentage: 0.8,
                      barPercentage: 0.5,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="bottom-right-bar-chart-container">
              <p className="chart-heading">Outflow by Category</p>
              <p className="chart-heading">{`$${outFlow.sumAmount}`}</p>
              <div className="bottom-icon-chart">
                <div className="insight-bottom-icons ">
                  <div className="option-lable">
                    <img
                      src={assets.Icons.no_category}
                      alt="optionIcon"
                      className="option-icon"
                    />{" "}
                    No Category
                  </div>
                  <div className="option-lable">
                    <img
                      src={assets.Icons.internatiinal_bal}
                      alt="optionIcon"
                      className="option-icon"
                    />{" "}
                    Internal Balance Out
                  </div>
                  <div className="option-lable">
                    <img
                      src={assets.Icons.foodIcon}
                      alt="optionIcon"
                      className="option-icon"
                    />{" "}
                    other
                  </div>
                  <div className="option-lable">
                    <img
                      src={assets.Icons.rent}
                      alt="optionIcon"
                      className="option-icon"
                    />{" "}
                    Rent
                  </div>
                  <div className="option-lable">
                    <img
                      src={assets.Icons.taxes}
                      alt="optionIcon"
                      className="option-icon"
                    />{" "}
                    Taxes
                  </div>
                </div>

                <div className="bottom-right-bar-chart">
                  <Bar
                    data={{
                      labels: ["", "", "", "", ""],
                      datasets: [
                        {
                          axis: "y",
                          data: [
                            outFlow.noCategory,
                            outFlow.internalBalance,
                            outFlow.other,
                            outFlow.rent,
                            outFlow.taxes,
                          ],
                          backgroundColor: [
                            "#B5DFFE",
                            "#B3FDAD",
                            "#FFE5A1",
                            "#CEB0FF",
                            "#FFC2CD",
                          ],
                          order: 2,
                          barThickness: 15,
                        },
                      ],
                    }}
                    options={{
                      indexAxis: "y",
                      maintainAspectRatio: false,
                      aspectRatio: 6,
                      scales: {
                        y: {
                          beginAtZero: false,
                          grid: {
                            display: false,
                          },
                          border: {
                            display: false,
                          },
                          ticks: {
                            color: "#B2BEC3",
                          },
                        },
                        x: {
                          beginAtZero: false,
                          grid: {
                            display: true,
                          },
                          border: {
                            dash: [2, 4],
                          },
                          ticks: {
                            stepSize: 1000,
                            color: "#B2BEC3",
                            callback: function (value, index, values) {
                              return value >= 1000 ? value / 1000 + "k" : value;
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
    </>
  );
}

export default Insight;
