import React from "react";
import { useState, useEffect } from "react";
import NormalSelect from "../../components/NormalSelect";
import DatePicker from "../../components/DatePicker";
import { Bar, Doughnut } from "react-chartjs-2";
import "./styles.scss";
import assets from "../../assets";
import { Col, Container, Row, Form } from "react-bootstrap";
import { getBudgecting } from "../../redux/reducers/budgecting";
import { useNavigate } from "react-router-dom";
const Budgeting = () => {
  const [activeMenu, setActiveMenu] = useState("Charts");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectDuration, setSelectDuration] = useState("");
  const [selectExpense, setSelectExpense] = useState("");
  const navigate = useNavigate();
  const [employeeExpense, setEmployeeExpence] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [expenseChart, setExpenseChart] = useState([]);
  const options = [
    { label: "This Year", value: "year" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
  ];
  const travelOptions = [
    { label: "Travel", value: "travel" },
    { label: "Food", value: "food" },
    { label: "Rent", value: "rent" },
  ];
  const menus = [
    {
      id: 1,
      title: "Charts",
      link: "/main/budgeting",
    },
    {
      id: 1,
      title: "Add Employee",
      link: "/main/add-employe",
    },
  ];

  useEffect(() => {
    getBudgectingApi(toDate, selectDuration);
  }, [toDate, selectDuration]);
  useEffect(() => {
    getExpensesCategoryApi(selectExpense);
  }, [selectExpense]);

  const getExpensesCategoryApi = (category) => {
    getBudgecting(`/expense_category?category=${category}`)
      .then((res) => {
        console.log(res, "expppp");
        setExpenseCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBudgectingApi = (toDate, duration) => {
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

      getBudgecting(`?from=${formattedFromDate}&to=${formattedToDate}`)
        .then((res) => {
          console.log(res);

          setEmployeeExpence(res.data.employeeExpense);
          setExpenseChart(res.data.expenseChart);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getBudgecting(`?duration=${duration}`)
        .then((res) => {
          console.log(res);

          setEmployeeExpence(res.data.employeeExpense);

          setExpenseChart(res.data.expenseChart);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log("cccc", employeeExpense);
  };

  const handleFromDate = (date) => {
    setFromDate(date);
  };
  const handleToDate = (date) => {
    setToDate(date);
  };

  const handleMenuClick = (title, link) => {
    setActiveMenu(title);
    navigate(link);
    sessionStorage.setItem("activeMenu", title);
  };

  const pieChartData = employeeExpense.map((employee, index) => {
    const chartData = {
      labels: ["Travel", "others", "Rent", "Food"],
      datasets: [
        {
          data: [
            employee.travel,
            employee.others,
            employee.rent,
            employee.food,
          ],
          backgroundColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
          borderColor: ["#E36668", "#BA619A", "#153BA2", "#F3D573"],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
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
    };
    const employeename = employee.empName;

    return {
      id: index + 1,
      chartData,
      chartOptions,
      employeename,
    };
  });

  console.log(pieChartData);

  return (
    <div>
      <div className="budgeting">
        <div className="budgeting-title-container">
          <div className="menusss">
            {menus.map(({ title, link }) => (
              <div
                className={`budgeting-menu-item ${
                  activeMenu === title ? "budgeting-active" : ""
                }`}
                onClick={() => handleMenuClick(title, link)}
              >
                {title}
              </div>
            ))}
          </div>
          <div className="date-pickersss">
            <div className="budgeting-from-date-container ">
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

            <div className="budgeting-end-date-container ">
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

            <div className="budgeting-select-container ">
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
        </div>

        <div className="pie-charts-container">
          <div className="d-flex justify-content-between">
            <p className="cash-flow1">Expense Distribution Employee Wise</p>
          </div>
          <div className="pie-charts">
            {pieChartData.map((list, index) => (
              <div className="pie-charts-data" key={list.id}>
                <Doughnut
                  data={list.chartData}
                  options={list.chartOptions}
                  width="5%"
                  height="5%"
                />
                <div className="employee-label">{list.employeename}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="pie-options d-flex ">
              <div className="option-lable">
                <img
                  src={assets.Icons.travelIcon}
                  alt="optionIcon"
                  className="option-icon"
                />{" "}
                Travel
              </div>
              <div className="option-lable">
                <img
                  src={assets.Icons.foodIcon}
                  alt="optionIcon"
                  className="option-icon"
                />{" "}
                Food
              </div>
              <div className="option-lable">
                <img
                  src={assets.Icons.rentIcon}
                  alt="optionIcon"
                  className="option-icon"
                />{" "}
                Rent
              </div>
              <div className="option-lable">
                <img
                  src={assets.Icons.otherIcon}
                  alt="optionIcon"
                  className="option-icon"
                />{" "}
                Others
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-12 col-md-6 overall-chart">
              <div className="card ">
                <div className="card-body ">
                  <div className="d-flex justify-content-between mt-2">
                    <p className="overall-expenses">Overall Expenses Chart</p>
                  </div>
                  <div className=" mt-3">
                    <Bar
                      data={{
                        labels: expenseChart.map((item) => {
                          return item.month;
                        }),
                        datasets: [
                          {
                            label: "expense",
                            data: expenseChart.map((item) => {
                              return item.expense;
                            }),
                            backgroundColor: "#4FF5C3",
                            order: 2,
                            barThickness: 10,
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
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card travel-container">
                <div className="card-body">
                  <div className="justify-content-between category-title">
                    <p className="overall-expenses">
                      Company Expenses Category Wise
                    </p>
                    <div className="yearsss-select">
                      {" "}
                      <NormalSelect
                        name="Travel"
                        options={travelOptions}
                        value={selectExpense}
                        onChange={(selectedOption) =>
                          setSelectExpense(selectedOption.target.value)
                        }
                        chartSelect
                      />
                    </div>
                  </div>

                  <div className="dynamic-expenses-chart-containers mt-4">
                    <Bar
                      data={{
                        labels: expenseCategory.map((item) => {
                          return item.month;
                        }),
                        datasets: [
                          {
                            label: "expense",
                            data: expenseCategory.map((item) => {
                              return item.expense;
                            }),
                            backgroundColor: "#7E57FF",
                            barThickness: 10,
                            order: 2,
                            barPercentage: 0.8,
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgeting;
