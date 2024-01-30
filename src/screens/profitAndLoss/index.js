import React, { useState, useEffect } from "react";
import "./styles.scss";
import DatePicker from "../../components/DatePicker";
import NormalSelect from "../../components/NormalSelect";
// import NormalButton from '../../components/NormalButton';
import { Doughnut, Bar } from "react-chartjs-2";
import assets from "../../assets/index";
import NormalButton from "../../components/NormalButton";
import { useNavigate } from "react-router-dom";
import {
  getProfitAndLoss,
  exportProfit,
} from "../../redux/reducers/profitAndLossSlice";
import { Toast } from "../../components/Toast";

const ProfitAndLoss = () => {
  const [profitLossTotal, setProfitLossTotal] = useState([]);
  const [profitLossExpenseTrends, setProfitLossExpenseTrends] = useState([]);
  const [netIncomeTrend, setNetIncomeTrend] = useState([]);
  const [pieChartData1, setPieChartData1] = useState([]);
  const [pieChartData2, setPieChartData2] = useState([]);
  let navigate = useNavigate();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectDuration, setSelectDuration] = useState("");
  const [netIncomePercent,setNetIncomePercent] =useState({});
  const [expensesTrend,setExpensesTrend] =useState({});


  useEffect(() => {
    getProfitAndLossApi(toDate, selectDuration);
  }, [toDate, selectDuration]);

  const getProfitAndLossApi = (toDate, duration) => {
    // dispatch(
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
      getProfitAndLoss(`?from=${formattedFromDate}&to=${formattedToDate}`)
        .then((res) => {
          console.log(res.data,"lll");
          setNetIncomePercent(res.data.netIncome);
          setExpensesTrend(res.data.expenseByDepartment);
          setProfitLossExpenseTrends(res.data.expenseTrends);
          setNetIncomeTrend(res.data.netIncomeTrends);
          setProfitLossTotal([
            res.data.netIncome.total,
            res.data.expenseByDepartment.total,
          ]);
          setPieChartData1([
            {
              id: 1,
              chartData: {
                // labels: ["EU", "AUS", "IND", "US"],
                datasets: [
                  {
                    data: [
                      res.data.netIncome.revenues,
                      res.data.netIncome.interestIncome,
                      res.data.netIncome.donations,
                    ],
                    backgroundColor: ["#0010F7", "#55B1F3", "#1BE7FF"],
                    borderColor: ["#0010F7", "#55B1F3", "#1BE7FF"],
                    borderWidth: 1,
                  },
                ],
              },

              chartOptions: {
                centerText: {
                  display: true,
                  text: `90%`,
                },
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
                cutout: 75,
                center: {
                  text: "Center Label",
                  color: "#000000",
                  // Set the color of the center label
                },
              },
            },
          ]);
          setPieChartData2([
            {
              id: 1,
              chartData: {
                // labels: ["EU", "AUS", "IND", "US"],
                datasets: [
                  {
                    data: [
                      res.data.expenseByDepartment.travel,
                      res.data.expenseByDepartment.rent,
                      res.data.expenseByDepartment.others,
                    ],
                    backgroundColor: ["#0010F7", "#55B1F3", "#1BE7FF"],
                    borderColor: ["#0010F7", "#55B1F3", "#1BE7FF"],
                    borderWidth: 1,
                  },
                ],
              },

              chartOptions: {
                centerText: {
                  display: true,
                  text: `90%`,
                },
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
                cutout: 75,
                center: {
                  text: "Center Label",
                  color: "#000000",
                  // Set the color of the center label
                },
              },
            },
          ]);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    } else {
      getProfitAndLoss(`?duration=${duration}`)
        .then((res) => {
          console.log(res.data,"lll");
          setProfitLossExpenseTrends(res.data.expenseTrends);
          setNetIncomeTrend(res.data.netIncomeTrends);
          setNetIncomePercent(res.data.netIncome);
          setExpensesTrend(res.data.expenseByDepartment);
          setProfitLossTotal([
            res.data.netIncome.total,
            res.data.expenseByDepartment.total,
          ]);
          setPieChartData1([
            {
              id: 1,
              chartData: {
                // labels: ["EU", "AUS", "IND", "US"],
                datasets: [
                  {
                    data: [
                      res.data.netIncome.revenues,
                      res.data.netIncome.interestIncome,
                      res.data.netIncome.donations,
                    ],
                    backgroundColor: ["#0010F7", "#55B1F3", "#1BE7FF"],
                    borderColor: ["#0010F7", "#55B1F3", "#1BE7FF"],
                    borderWidth: 1,
                  },
                ],
              },

              chartOptions: {
                centerText: {
                  display: true,
                  text: `90%`,
                },
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
                cutout: 75,
                center: {
                  text: "Center Label",
                  color: "#000000",
                  // Set the color of the center label
                },
              },
            },
          ]);
          setPieChartData2([
            {
              id: 1,
              chartData: {
                // labels: ["EU", "AUS", "IND", "US"],
                datasets: [
                  {
                    data: [
                      res.data.expenseByDepartment.travel,
                      res.data.expenseByDepartment.rent,
                      res.data.expenseByDepartment.others,
                    ],
                    backgroundColor: ["#0010F7", "#55B1F3", "#1BE7FF"],
                    borderColor: ["#0010F7", "#55B1F3", "#1BE7FF"],
                    borderWidth: 1,
                  },
                ],
              },

              chartOptions: {
                centerText: {
                  display: true,
                  text: `90%`,
                },
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
                cutout: 75,
                center: {
                  text: "Center Label",
                  color: "#000000",
                  // Set the color of the center label
                },
              },
            },
          ]);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
    // );
  };

  const handleFromDate = (date) => {
    setFromDate(date);
  };
  const handleToDate = (date) => {
    setToDate(date);
  };

  const [activeMenu, setActiveMenu] = useState("Profit & Loss");
  const handleMenuClick = (menu, link) => {
    setActiveMenu(menu);
    navigate(link);
  };

  const menus = [
    {
      id: 1,
      title: "Charts",
      link: "/main/forecast",
    },
    {
      id: 2,
      title: "Profit & Loss",
      link: "/main/profit-loss",
    },
  ];

  const yearOptions = [
    { value: "", label: "This Year" },
    { value: "1", label: "This Month" },
    { value: "2", label: "This Week" },
  ];

  const textCenter1 = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "600 16px poppins";
      ctx.fillStyle = "#373D3F";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let text = `$${Math.round(profitLossTotal[0] * 100) / 100}`;
      let textHeight =
        ctx.measureText(text).actualBoundingBoxAscent +
        ctx.measureText(text).actualBoundingBoxDescent;
      ctx.fillText(
        text,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + textHeight / 2
      );
    },
  };
  const textCenter2 = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "600 16px poppins";
      ctx.fillStyle = "#373D3F";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let text = `$${Math.round(profitLossTotal[1] * 100) / 100}`;
      let textHeight =
        ctx.measureText(text).actualBoundingBoxAscent +
        ctx.measureText(text).actualBoundingBoxDescent;
      ctx.fillText(
        text,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + textHeight / 2
      );
    },
  };
  const textCenterDown = {
    id: "textCenterDown",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "400 16px poppins";
      ctx.fillStyle = "#373D3F";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let text = `Total`;
      let textHeight =
        ctx.measureText(text).actualBoundingBoxAscent +
        ctx.measureText(text).actualBoundingBoxDescent;
      ctx.fillText(
        text,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y - textHeight / 2
      );
    },
  };

  const handleExport = () => {
    exportProfit().then((res) => {
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
    <div className="profitLossContainer">
      <div className="profit-title-container">
        <div className="menuItemContainer d-flex">
          {menus.map(({ title, link }) => (
            <div
              className={`profit-menu-item ${
                activeMenu === title ? "profit-active" : ""
              }`}
              onClick={() => handleMenuClick(title, link)}
            >
              {title}
            </div>
          ))}
        </div>
        <div className="profit-from-date-container ">
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

        <div className="profit-end-date-container ">
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

        <div className="profit-select-container ">
          <NormalSelect
            name="year"
            options={yearOptions}
            value={selectDuration}
            onChange={(selectedOption) =>
              setSelectDuration(selectedOption.target.value)
            }
          />
        </div>

        <div className="profit-and-loss-exports-lable">
          {" "}
          <NormalButton
            label={"Export"}
            profitLossExportBtn
            onClick={handleExport}
          />{" "}
          {/* //api integration has to be done */}
        </div>
      </div>
      <div className="profitLossChartContainer">
        <div className="net-income-pie-chart">
          <h2>Net Income</h2>
          {pieChartData1.map((list) => (
            <div className="pie-chart-data-full">
              <div className="pie-chart-data1">
                <Doughnut
                  data={list.chartData}
                  options={list.chartOptions}
                  //   width="116px"
                  //   // className="me-5"
                  //   height="116px"
                  plugins={[textCenter1, textCenterDown]}
                  className="label-top label-bottom"
                />
              </div>
              <div className="profitLossPieOptions">
                <div className="profitLossPieOptionsIn">
                  <img src={assets.Icons.revenueIcon} alt="" />
                  Revenues ({Math.round((netIncomePercent.revenues/netIncomePercent.total)*100)}%)
                </div>
                <div className="profitLossPieOptionsIn">
                  <img src={assets.Icons.interestIcon} alt="" />
                  Interest Income ({Math.round((netIncomePercent.interestIncome/netIncomePercent.total)*100)}%)
                </div>
                <div className="profitLossPieOptionsIn">
                  <img src={assets.Icons.donationIcon} alt="" />
                  Donations ({Math.round((netIncomePercent.donations/netIncomePercent.total)*100)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="netIncomeTrendChartContainer">
          <h2>Net Income Trend</h2>
          <div className="overall-expenses-chart-container">
            <Bar
              data={{
                labels: netIncomeTrend.map((item) => {
                  return item.month;
                }),
                datasets: [
                  {
                    label: "Profit",
                    data: netIncomeTrend.map((item) => {
                      return item.amount;
                    }),
                    backgroundColor: "#4FF5C3",
                    order: 2,
                    barThickness: 5,
                    // barPercentage: 50,
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
        <div className="net-income-pie-chart">
          <h2
            onClick={() => console.log(netIncomePercent, expensesTrend, "kkk")}
          >
            Expense by Department
          </h2>
          {pieChartData2.map((list) => (
            <div className="pie-chart-data-full">
              <div className="pie-chart-data1">
                <Doughnut
                  data={list.chartData}
                  options={list.chartOptions}
                  //   width="116px"
                  //   // className="me-5"
                  //   height="116px"
                  plugins={[textCenter2, textCenterDown]}
                  className="label-top label-bottom"
                />
              </div>
              <div className="profitLossPieOptions">
                <div className="profitLossPieOptionsIn">
                  <img src={assets.Icons.revenueIcon} alt="" />
                  Travel ({Math.round((expensesTrend.travel/expensesTrend.total)*100)}%)
                </div>
                <div className="profitLossPieOptionsIn">
                  <img src={assets.Icons.interestIcon} alt="" />
                  Rent ({Math.round((expensesTrend.rent/expensesTrend.total)*100)}%)
                </div>
                <div className="profitLossPieOptionsIn">
                  <img src={assets.Icons.donationIcon} alt="" />
                  Others ({Math.round((expensesTrend.others/expensesTrend.total)*100)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="netIncomeTrendChartContainer">
          <h2>Expenses Trend</h2>
          <div className="overall-expenses-chart-container">
            <Bar
              data={{
                labels: profitLossExpenseTrends.map((item) => {
                  return item.month;
                }),
                datasets: [
                  {
                    label: "Profit",
                    data: profitLossExpenseTrends.map((item) => {
                      return item.amount;
                    }),
                    backgroundColor: "#4FF5C3",
                    order: 2,
                    barThickness: 5,
                    // barPercentage: 50,
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
  );
};

export default ProfitAndLoss;
