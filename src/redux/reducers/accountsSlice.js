import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const accountsSlice = createSlice({
  name: "accounts",
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
export const getAccounts = () => {
  return new Promise((resolve, reject) => {
    request({
      url: Exported.Endpoints.ACCOUNTS,
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

export const { saveData, saveTotalPage } = accountsSlice.actions;

export default accountsSlice.reducer;
