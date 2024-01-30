import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const vendorsSlice = createSlice({
  name: "vendors",
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
export const getVendors = () => {
  return new Promise((resolve, reject) => {
    request({
      url: Exported.Endpoints.VENDORS,
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

export const { saveData, saveTotalPage } = vendorsSlice.actions;

export default vendorsSlice.reducer;
