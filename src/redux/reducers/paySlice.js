import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const paySlice = createSlice({
  name: "pay",
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
export const getPay = (url) => {
  return new Promise((resolve, reject) => {
    request({
      url: `penny/pay${url}`,
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

export const { saveData, saveTotalPage } = paySlice.actions;

export default paySlice.reducer;
