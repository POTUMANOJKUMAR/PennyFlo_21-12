// import React from "react";
// import "./styles.scss";
// import assets from "../../assets";

// const NormalTable = ({
//   headerDetails,
//   transionTable,
//   children,
//   custom_getpaid_table,
//   subscriptionTable,
//   fontLarge,
//   vendor_table,
// }) => {
//   return (
//     <div className="table-container">
//       <table className="main-table">
//         <thead
//           className={`${
//             subscriptionTable
//               ? "subscription-table-header"
//               : vendor_table
//               ? "vendor-table"
//               : transionTable
//               ? "transition_table-header"
//               : "normal-table-header"
//           }`}
//         >
//           <tr>
//             {headerDetails.map((header, index) => (
//               <th
//                 key={index}
//                 className={`${
//                   fontLarge ? "custom-table-header" : "table-header"
//                 }`}
//               >
//                 {header.bank && (
//                   <img
//                     src={assets.Icons.hdfc}
//                     alt="sort"
//                     className="sort-icon"
//                   />
//                 )}
//                 {header.label}
//                 {header.sortKey && (
//                   <img
//                     src={assets.Icons.sort}
//                     alt="sort"
//                     className="sort-icon"
//                     onClick={header.singleClickFunc}
//                     style={{ cursor: "pointer" }}
//                   />
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody
//           className={
//             vendor_table
//               ? "vendor-table-body"
//               : custom_getpaid_table
//               ? "custom-getpaid-table-body"
//               : transionTable
//               ? "custom-transition-table-body"
//               : "normal-table-body"
//           }
//         >
//           {children}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NormalTable;
import React from "react";
import "./styles.scss";
import assets from "../../assets";
import Pagination from "../pagination";

const NormalTable = ({
  accountTable,
  headerDetails,
  transionTable,
  children,
  custom_getpaid_table,
  subscriptionTable,
  fontLarge,
  vendor_table,
  pagination,
}) => {
  const handlePageChange = () => {};
  return (
    <div className="table-container">
      <table className="main-table">
        <thead
          className={`${
            subscriptionTable
              ? "subscription-table-header"
              : vendor_table
              ? "vendor-table"
              : transionTable
              ? "transition_table-header"
              : "normal-table-header"
          }`}
        >
          <tr>
            {headerDetails.map((header, index) => (
              <th
                key={index}
                className={`${
                  fontLarge
                    ? "custom-table-header"
                    : accountTable
                    ? "account"
                    : "table-header"
                }`}
                style={{ textAlign: "left" }}
              >
                {header.bank && (
                  <img
                    src={assets.Icons.hdfc}
                    alt="sort"
                    className="sort-icon"
                  />
                )}
                {header.label}

                {header.sortKey && (
                  <img
                    src={assets.Icons.sort}
                    alt="sort"
                    className="sort-icon"
                    onClick={header.singleClickFunc}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={
            vendor_table
              ? "vendor-table-body"
              : custom_getpaid_table
              ? "custom-getpaid-table-body"
              : transionTable
              ? "custom-transition-table-body"
              : "normal-table-body"
          }
          style={{ textAlign: "left" }}
        >
          {children}
        </tbody>
      </table>
      {pagination && (
        <div className="paginationStyle">
          {" "}
          <Pagination pageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default NormalTable;
