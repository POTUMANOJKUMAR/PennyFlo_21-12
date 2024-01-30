import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const integrationSlice = createSlice({
  name: "integration",
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
export const getIntegration = () => {
  return new Promise((resolve, reject) => {
    request({
      url: Exported.Endpoints.INTEGRATION,
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

export const { savepayData, savepayTotalPage } = integrationSlice.actions;

export default integrationSlice.reducer;
