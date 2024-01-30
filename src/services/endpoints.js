const Endpoints = {
  LOGIN: "penny/login",
  DASHBOARD: "penny/dashboard",
  PAY: "penny/pay/Scheduled",
  SCHEDULED: "penny/pay/Unpaid",
  TRANSACTION: "penny/transactions",
  PROFILEDATA: "penny/profile?username=eanok@doodleblue.in",
  INTEGRATION: "penny/get_integrations",
  NETWORKING: "penny/get_networks",
  ACCOUNTS: "penny/get_banks",
  VENDORS: "penny/vendors",
  INSIGHTS: "penny/insights",
  FORECAST: "penny/forecast",
  FORECASTREVENUE: "penny/forecast/revenue",
  BUDGECTING: "penny/budget",
  EXPORTCSV: "penny/forecast/export/csv",
  TRANSACTIONEXPORT: "penny/transaction/export/csv",
  GETPAID: "penny/pay/Process",
  VENDORDETAILS: "penny/vendor/David Jhon",
  PROFITANDLOSS: "penny/forecast/profit_loss",
  INVOICE: "penny/invoice/:id",
  EXPORTPROFIT: "penny/forecast/profit_loss/export/csv",
};

const APIMethods = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const Exported = {
  Endpoints,
  APIMethods,
};

export default Exported;
