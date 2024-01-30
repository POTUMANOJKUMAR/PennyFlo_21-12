import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const networkingSlice = createSlice({
  name: "networking",
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
export const getNetworking = () => {
  return new Promise((resolve, reject) => {
    request({
      url: Exported.Endpoints.NETWORKING,
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

export const { saveData, saveTotalPage } = networkingSlice.actions;

export default networkingSlice.reducer;
