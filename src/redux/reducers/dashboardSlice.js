import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: [],
    totalPages: 0,
    showNotifications: true,
  },
  reducers: {
    saveData: (state, action) => {
      state.data = action.payload;
    },
    saveTotalPage: (state, action) => {
      state.totalPages = action.payload;
    },
    toggleNotifications: (state) => {
      state.showNotifications = !state.showNotifications;
    },
  
  },
});
export const getDashboards = (url) => {
  return new Promise((resolve, reject) => {
    request({
      url: `penny/dashboard${url}`,
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

export const { saveData, saveTotalPage, toggleNotifications } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
