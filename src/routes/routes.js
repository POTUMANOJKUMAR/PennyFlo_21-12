const routes = [
  {
    layout: "AuthLayout",
    path: "/auth",
    isSecure: false,
    childrens: [
      {
        screen: "Login",
        childPath: "/login",
      },
      {
        screen: "ForgotPassword",
        childPath: "/forgot-password",
      },
    ],
  },
  {
    layout: "MainLayout",
    path: "/main",
    isSecure: false,
    childrens: [
      {
        screen: "Dashboard",
        childPath: "/dashboard",
      },
      {
        screen: "Pay",
        childPath: "/pay",
      },
      {
        screen: "GetPaid",
        childPath: "/get-paid",
      },
      {
        screen: "Forecast",
        childPath: "/forecast",
      },
      {
        screen: "CreateInvoice",
        childPath: "/create-invoice",
      },
      {
        screen: "Transaction",
        childPath: "/transaction",
      },
      {
        screen: "ProfileData",
        childPath: "/profile",
      },
      {
        screen: "integration",
        childPath: "/integration",
      },
      {
        screen: "networking",
        childPath: "/networking",
      },
      {
        screen: "vendor",
        childPath: "/vendor",
      },
      {
        screen: "notification",
        childPath: "/notification",
      },
      {
        screen: "AddVendor",
        childPath: "/add-vendor",
      },
      {
        screen: "ExpenseCard",
        childPath: "/expense-card",
      },
      {
        screen: "VendorDetails",
        childPath: "/vendor-details/:id/:source",
      },
      {
        screen: "Budgeting",
        childPath: "/budgeting",
      },
      {
        screen: "InvoiceDetails",
        childPath: "/invoice-details",
      },
      {
        screen: "AddEmploye",
        childPath: "/add-employe",
      },
      {
        screen: "InvoiceDetails",
        childPath: "/invoice-details/:id",
      },
      {
        screen: "Email",
        childPath: "/email-notification",
      },
      {
        screen: "ForeCastPayment",
        childPath: "/forecast-payment",
      },
      {
        screen: "Insights",
        childPath: "/insights",
      },
      {
        screen: "ProfitAndLoss",
        childPath: "/profit-loss",
      },
      {
        screen: "AddBankAccount",
        childPath: "/add-bank-account",
      },
      {
        screen: "Accounts",
        childPath: "/accounts",
      },
    ],
  },

  {
    init: "/auth/login",
    path: "/",
  },
  {
    component: "Page404",
    path: "*",
  },
];

export default routes;
