import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    data: [],
    totalPages: 0,
  },
  reducers: {
    savePayData: (state, action) => {
      state.data = action.payload;
    },
    savePayTotalPage: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});
export const getTransaction = (url) => {
  return new Promise((resolve, reject) => {
    request({
      url: `penny/transactions${url}`,
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
export const transactionExport = () => {
  return new Promise((resolve, reject) => {
    request({
      url: Exported.Endpoints.TRANSACTIONEXPORT,
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

export const { savepayData, savepayTotalPage } = transactionsSlice.actions;

export default transactionsSlice.reducer;
