import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const vendorDetailsSlice = createSlice({
  name: "vendorDetails",
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
export const getVendorDetails = (url) => {
  return new Promise((resolve, reject) => {
    request({
      url: `penny/vendor/${url}`,
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

export const { saveData, saveTotalPage } = vendorDetailsSlice.actions;

export default vendorDetailsSlice.reducer;
