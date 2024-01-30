import React from "react";
import "./styles.scss";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashCard = ({ icon, title, amount, totalAmount, plugins }) => {
  let ChartComponent = Doughnut;
  const percentage = (amount / totalAmount) * 100;

  //   const newPercentage = Math.round(percentage);
  const totalPercentage = 100 - percentage;
  const data = {
    labels: [`${Math.round(percentage)}%`],
    datasets: [
      {
        data: [percentage, totalPercentage],
        backgroundColor: [
          `${title === "Payables" ? "#FC605B" : "#3CF368"}`,
          `${title === "Payables" ? "#FFC9C8" : "#C2FDD0"}`,
        ],
        // borderColor: ["#9AE2A9", "#FFE188"],
        // borderWidth: 0,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "inside",
        labels: {
          display: true,
          boxWidth: 0,
          position: "inside",
          textAlign: "center",
          font: "Poppins",
          color: "#8D8D8D",
        },
      },
    },
    cutout: 40,
  };

  const formattedAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };
  return (
    <div className="dashboard-card-container">
      <div className="card-left-container">
        <div className="dollar-icon-container">
          <img src={icon} alt="dollar" className="dollar-icon" />
        </div>
        <span className="card-title">{title}</span>
        <span className="card-amount">{formattedAmount(amount)}</span>
        <span className="card-total">{formattedAmount(totalAmount)}</span>
      </div>
      <div className="chart-container">
        <ChartComponent
          data={data}
          options={options}
          width="116px"
          height="116px"
          plugins={plugins}
        />
      </div>
    </div>
  );
};

export default DashCard;
