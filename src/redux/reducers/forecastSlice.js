import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const forecastSlice = createSlice({
  name: "forecast",
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
export const getForecast = (url) => {
  return new Promise((resolve, reject) => {
    request({
      url: `penny/forecast${url}`,
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
export const getForecastRevenue = () => {
  return new Promise((resolve, reject) => {
    request({
      url: Exported.Endpoints.FORECASTREVENUE,
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
export const exportForecast = () => {
  return new Promise((resolve, reject) => {
    request({
      url: Exported.Endpoints.EXPORTCSV,
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
export const foreCastViewDetail = (dropdown) => {
  return new Promise((resolve, reject) => {
    request({
      url: `penny/forecast/view/${dropdown}`,
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

export const { saveData, saveTotalPage } = forecastSlice.actions;

export default forecastSlice.reducer;
