import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../services";
import Exported from "../../services/endpoints";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isRememberMe: false,
    userData: null,
  },
  reducers: {
    saveRememberMe: (state, action) => {
      state.isRememberMe = action.payload;
    },
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const login = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: Exported.Endpoints.LOGIN,
      method: Exported.APIMethods.POST,
      data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const { saveRememberMe, saveUserData } = authSlice.actions;

export default authSlice.reducer;
