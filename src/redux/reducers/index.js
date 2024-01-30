import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dashboardSlice from "./dashboardSlice";
import paySlice from "./paySlice";
import transactionsSlice from "./transactionsSlice";
import profileDataSlice from "./profileDataSlice";
import integrationSlice from "./integrationSlice";
import networkingSlice from "./networkingSlice";
import accountsSlice from "./accountsSlice";
import vendorsSlice from "./vendorsSlice";
import  insightsSlice  from "./insightsSlice";
import forecastSlice from "./forecastSlice";
import  budgectingSlice  from "./budgecting";

import getPaidSlice from "./getPaidSlice";
import vendorDetailsSlice from "./vendorDetailsSlice";
import profitAndLossSlice from "./profitAndLossSlice";
import invoiceSlice from "./invoiceSlice";
import  hambergerSlice  from "./headerSlice";
const reducers = combineReducers({
  auth: authSlice,
  dashboard: dashboardSlice,

  transaction: transactionsSlice,
  profileData: profileDataSlice,
  integration: integrationSlice,
  networking: networkingSlice,
  accounts: accountsSlice,
  vendors: vendorsSlice,
  insights: insightsSlice,
  forecast: forecastSlice,
  budgecting: budgectingSlice,
  invoice: invoiceSlice,
  pay: paySlice,
  getPaid: getPaidSlice,
  vendorDetails: vendorDetailsSlice,
  profitAndLoss: profitAndLossSlice,
  hamberger:hambergerSlice
});

export default reducers;
