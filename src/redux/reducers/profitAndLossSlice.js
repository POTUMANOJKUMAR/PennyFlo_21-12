import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const profitLossSLice = createSlice({
  name: "profitAndLoss",
  initialState: {
    data: [],
    totalPages: 0,
  },
  reducers: {
    saveData: (state, action) => {
      state.data = action.payload;
    },
    saveTotalPage: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});
export const getProfitAndLoss = (url) => {
  return new Promise((resolve, reject) => {
    request({
      url: `penny/forecast/profit_loss${url}`,
      method: Exported.APIMethods.GET,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const exportProfit = () => {
  return new Promise((resolve, reject) => {
    request({
      url: Exported.Endpoints.EXPORTPROFIT,
      method: Exported.APIMethods.GET,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const { saveData, saveTotalPage } = profitLossSLice.actions;

export default profitLossSLice.reducer;
