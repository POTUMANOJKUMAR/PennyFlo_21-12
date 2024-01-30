import React from "react";
import "./styles.scss";
import "../inputField/styles.scss";
import FormErrorMessage from "../ErrorMessage";

const NormalSelect = ({
  name,
  options,
  value,
  onChange,
  error,
  messages,
  register,
  chartSelect,
  notification_dropdown
}) => {
  return (
    <div className="select-container">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${chartSelect ? "chart-select" : `${notification_dropdown}`? "notification-dropdown": "select-item"}`}
        {...register}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div>
        <FormErrorMessage error={error} messages={messages} />
      </div>
    </div>
  );
};

export default NormalSelect;
