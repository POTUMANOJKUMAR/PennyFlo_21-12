import React from "react";
import "./styles.scss";
import assets from "../../assets";
import { useNavigate } from "react-router";
const Email = () => {
  let navigate = useNavigate();
  return (
    <div>
      <div className="email-container ">
        <div className="email-background">
          <div className="email-header">
            <div className="email-image">
              <img
                src={assets.Icons.emailPf}
                alt="logo"
                className="email-pf-logo"
              />
            </div>
            <div className="email-white"></div>
          </div>
        </div>

        <div className="email-overlay">
          <div className="email-center">
            <p className="email-text">Your Invoice from Apple Due in 2 days</p>

            <p className="email-text2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </p>

            <div className="email-table">
              <div className="table-head">
                <p>Invoice Details</p>
              </div>
              <div className="table-body">
                <div className="row">
                  <div className="col">
                    <div className="th">Issue Date</div>
                    <div className="fw-bold pt-1">25/9/2023</div>
                  </div>
                  <div className="col">
                    <div className="th">Due Date</div>
                    <div className="fw-bold pt-1">30/09/2023</div>
                  </div>
                  <div className="col">
                    <div className="th">Vendor</div>
                    <div className="fw-bold pt-1">Christoph Scheuer</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="th pt-2">Invoice Number</div>
                    <div className="fw-bold pt-1">123456789</div>
                  </div>
                  <div className="col">
                    <div className="th pt-2">Days exceed</div>
                    <div className="fw-bold text-danger pt-1">42</div>
                  </div>
                  <div className="col">
                    <div className="th pt-2">Total amount</div>
                    <div className="t-amount pt-1">$790.80</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="email-check px-4 pt-3 cursor-pointer"
              onClick={() => navigate("/main/invoice-details/3")}
            >
              Check Invoice
            </div>

            <div className="email-work">
              If that doesn’t work, copy and paste the following link in your
              browser:
            </div>

            <div class="email-id">www.pennyflo.com/invoice_information</div>

            <div className="email-question">
              If you have any questions, Raise your concerns via email to{" "}
              <span className="email-address">support@pennyflo.com</span> happy
              to help out.
            </div>
          </div>
        </div>

        <div className="email-footer">
          <div className="cheers text-light text-center pt-2">
            <div className="d-flex flex-column ">
              <span className="pt-2">Cheers!</span>
              <span className="pennyflo-team pt-2">Pennyflo Team</span>
            </div>
          </div>

          <div className="email-privacy text-center pt-2 pb-3">
            Privacy Policy | Terms & Conditions | Unsubscribe
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;
