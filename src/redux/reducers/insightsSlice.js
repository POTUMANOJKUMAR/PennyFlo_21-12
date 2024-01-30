import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const insightsSlice = createSlice({
  name: "insights",
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
export const getInsights = (url) => {
  return new Promise((resolve, reject) => {
    request({
      url: `penny/insights${url}`,
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

export const { savepayData, savepayTotalPage } = insightsSlice.actions;

export default insightsSlice.reducer;
