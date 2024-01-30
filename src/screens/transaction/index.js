import React, { useState, useEffect } from "react";
import assets from "../../assets";

import NormalInput from "../../components/inputField";
import NormalSelect from "../../components/NormalSelect";
import NormalButton from "../../components/NormalButton";
import NormalTable from "../../components/NormalTable";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/Toast";
import {
  getTransaction,
  transactionExport,
} from "../../redux/reducers/transactionsSlice";
import { getAccounts } from "../../redux/reducers/accountsSlice";
import Pagination from "../../components/pagination";
function Transaction() {
  const [searchIconHandle, setSearchIconHandle] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [transactiontableRows, setTransactionTableRows] = useState([]);
  const [allBankAccounts, setAllBankAccounts] = useState([]);
  const navigate = useNavigate();
  const [pageMeta, setPageMeta] = useState({
    pageCount: 0,
  });
  const [page, setPage] = useState(1);
  const [sortedTable, setSortedTable] = useState({
    sorted: "iDate",
    reversed: false,
  });
  const [selectedBank, setSelectedBank] = useState("");
  const [selectMonth, setSelectMonth] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    getTransactionApi(selectedBank, selectMonth);
    getBankAccounts();
  }, [selectedBank, selectMonth, page, searchText]);

  const getTransactionApi = (dataBank, monthData) => {
    if (searchText.trim() === "") {
      getTransaction(
        `?month=${monthData}&page=${page - 1}&size=${10}&bank=${dataBank}`
      )
        .then((res) => {
          const filteredRows = res.data.content.filter((row) =>
            row.vendor.toLowerCase().includes(searchText.toLowerCase())
          );

          setTransactionTableRows(filteredRows);
          console.log(filteredRows, "Search");

          setPageMeta({ pageCount: res?.data?.totalPages });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getTransaction(`?month=${monthData}&size=${100}&bank=${dataBank}`)
        .then((res) => {
          const filteredRows = res.data.content.filter((row) =>
            row.vendor.toLowerCase().includes(searchText.toLowerCase())
          );
          const sortedFilterRows = filteredRows.slice(
            (page - 1) * 10,
            (page - 1) * 10 + 10
          );

          setTransactionTableRows(sortedFilterRows);
          console.log(filteredRows, "Search");
          const totalPages = Math.ceil(filteredRows.length / 10);
          setPageMeta({ pageCount: totalPages });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getBankAccounts = () => {
    getAccounts()
      .then((res) => {
        const tempValues = res.data.map((item) => {
          return { value: item.bankName, label: item.bankName };
        });
        const allBankOptions = [
          ...tempValues,
          {
            label: "All Bank Accounts",
            value: "",
          },
        ];
        setAllBankAccounts(allBankOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const duration = [
    {
      label: "Last 3Months",
      value: 3,
    },
    {
      label: "Last 6Months",
      value: 6,
    },
    {
      label: "Last 9Months",
      value: 9,
    },
  ];

  const transactiontableHeader = [
    { label: "" },
    {
      label: "Date",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "iDate", reversed: !sortedTable.reversed });
        const payDataCopy = [...transactiontableRows];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            let dateA = new Date(a.date.split("-").reverse().join("/"));
            let dateB = new Date(b.date.split("-").reverse().join("/"));

            return dateA - dateB;
          });
        } else {
          payDataCopy.sort((a, b) => {
            let dateA = new Date(a.date.split("-").reverse().join("/"));
            let dateB = new Date(b.date.split("-").reverse().join("/"));

            return dateB - dateA;
          });
        }
        setTransactionTableRows(payDataCopy);
      },
    },
    {
      label: "Counter Party",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "vendor", reversed: !sortedTable.reversed });
        const payDataCopy = [...transactiontableRows];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            if (a.vendor.toLowerCase() < b.vendor.toLowerCase()) {
              return -1;
            }
            if (a.vendor.toLowerCase() > b.vendor.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          payDataCopy.sort((a, b) => {
            if (a.vendor.toLowerCase() < b.vendor.toLowerCase()) {
              return 1;
            }
            if (a.vendor.toLowerCase() > b.vendor.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          });
        }

        setTransactionTableRows(payDataCopy);
      },
    },
    {
      label: "Reference No",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "INumber", reversed: !sortedTable.reversed });
        const payDataCopy = [...transactiontableRows];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            return a.referenceNumber - b.referenceNumber;
          });
        } else {
          payDataCopy.sort((a, b) => {
            return b.referenceNumber - a.referenceNumber;
          });
        }
        setTransactionTableRows(payDataCopy);
      },
    },
    {
      label: "Category",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "vendor", reversed: !sortedTable.reversed });
        const payDataCopy = [...transactiontableRows];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            if (a.category.toLowerCase() < b.category.toLowerCase()) {
              return -1;
            }
            if (a.category.toLowerCase() > b.category.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          payDataCopy.sort((a, b) => {
            if (a.category.toLowerCase() < b.category.toLowerCase()) {
              return 1;
            }
            if (a.category.toLowerCase() > b.category.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          });
        }

        setTransactionTableRows(payDataCopy);
      },
    },
    {
      label: "Total amount",
      sortKey: true,
      singleClickFunc: () => {
        setSortedTable({ sorted: "INumber", reversed: !sortedTable.reversed });
        const payDataCopy = [...transactiontableRows];
        if (sortedTable.reversed) {
          payDataCopy.sort((a, b) => {
            return a.totalAmount - b.totalAmount;
          });
        } else {
          payDataCopy.sort((a, b) => {
            return b.totalAmount - a.totalAmount;
          });
        }
        setTransactionTableRows(payDataCopy);
      },
    },
    { label: "Bank" },
    { label: "Bill No." },
  ];

  const handleInvoiceNavigate = (id) => {
    navigate(`/main/invoice-details/${id}`, { state: { transaction: true } });
  };

  function handleToDownload() {
    Toast({
      type: "success",
      message: "Download Successfully",
    });
  }
  const handleDownload = () => {
    transactionExport().then((res) => {
      console.log(res, "res");
      const csvData = res.data;
      const blob = new Blob([csvData], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "exported_data.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      Toast({
        type: "success",
        message: "Downloaded Successfully",
      });
    });
  };

  return (
    <div className="transaction-history-main-container ">
      <div className="transaction-history-header-container  d-lg-flex flex-lg-row flex-md-column col-12 gap-2">
        <div className="transaction-history-header1-left col-lg-6 col-md-12">
          <div className="transition-search-input col-lg-10 col-md-12 col-sm-12">
            <NormalInput
              onClick={() => setSearchIconHandle(false)}
              searchIcon={searchIconHandle}
              leftIcon
              type="text"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="transaction-history-header2-right  mt-sm-2 mt-md-2 mt-lg-0 row col-lg-6   col-md-12">
          <div className="year col-md-4 col-sm-6">
            <NormalSelect
              options={allBankAccounts}
              value={selectedBank}
              onChange={(selectedOption) =>
                setSelectedBank(selectedOption.target.value)
              }
            />
          </div>
          <div className="duration col-md-4 col-sm-6">
            <NormalSelect
              options={duration}
              value={selectMonth}
              onChange={(selectedOption) => {
                setSelectMonth(selectedOption.target.value);
                console.log(selectedOption.target.value, "KKKKKK");
              }}
            />
          </div>
          <div className="transition-download-btn  mt-sm-2 mt-md-0 mt-lg-0 col-md-4 col-sm-12  ">
            <NormalButton
              label="Download"
              transition_download_btn
              onClick={handleDownload}
            />
          </div>
        </div>
      </div>

      <div className="transaction-history-table-container">
        <NormalTable
          headerDetails={transactiontableHeader}
          transionTable
          // pagination={true}
        >
          {transactiontableRows.length > 0
            ? transactiontableRows.map((list) => {
                const formattedDate =
                  list.date && list.date.split("T")[0].split("-").join("/");
                return (
                  <>
                    <tr className="px-3 ">
                      <td>
                        {}
                        {list.status === "Fail" ? (
                          <img
                            className="bank-image"
                            src={assets.Icons.red}
                            alt="debit"
                          />
                        ) : (
                          <img
                            className="bank-image"
                            alt="credit"
                            src={assets.Icons.green}
                          />
                        )}
                      </td>
                      <td>{formattedDate}</td>
                      <td>{list.vendor}</td>
                      <td>{list.referenceNumber}</td>
                      <td>{list.category}</td>
                      <td>{list.totalAmount}</td>{" "}
                      <td>
                        {list.bank === "ICICI" ? (
                          <img
                            className="bank-image"
                            src={assets.Icons.icici}
                            alt="ICICI Logo"
                          />
                        ) : list.bank === "HDFC" ? (
                          <img
                            className="bank-image"
                            alt="hdfc"
                            src={assets.Icons.hdfc}
                          />
                        ) : list.bank === "Kotak" ? (
                          <img
                            className="bank-image"
                            src={assets.Icons.Kotak}
                            alt="Kotak Logo"
                          />
                        ) : list.bank === "SBI" ? (
                          <img
                            className="bank-image"
                            src={assets.Icons.sbi}
                            alt="sbi Logo"
                          />
                        ) : list.bank === "MIB" ? (
                          <img
                            className="bank-image"
                            src={assets.Icons.mib}
                            alt="mib Logo"
                          />
                        ) : (
                          ""
                        )}

                        {list.bank}
                      </td>
                      <td>{list.billNumber}</td>
                      <td>
                        <span
                          className="anchor "
                          onClick={() => handleInvoiceNavigate(list.txnId)}
                        >
                          Review
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })
            : "No Data"}
        </NormalTable>
        {pageMeta?.pageCount > 1 && (
          <div className="paginationStyle">
            {" "}
            <Pagination
              totalPage={pageMeta?.pageCount}
              pageChange={(res) => setPage(res)}
            />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Transaction;
