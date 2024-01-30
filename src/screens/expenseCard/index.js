import React from "react";
import assets from "../../assets";
import "./styles.scss";

const ExpenseCard = () => {
  return (
    <div className="expenseCard">
      <div className="expenseCardContainer">
        <img src={assets.Images.expenseCardProgrammer} alt="programmer Image" />
        <h1>Coming Soon!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default ExpenseCard;
