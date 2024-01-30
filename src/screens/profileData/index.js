import React, { useEffect, useState } from "react";
import "./styles.scss";
import assets from "../../assets";
import NormalInput from "../../components/inputField";
import NormalButton from "../../components/NormalButton";
import Profile from "../profileHeader";
import { getProfileData } from "../../redux/reducers/profileDataSlice";
import { Toast } from "../../components/Toast";

function ProfileData() {
  const [profileDataApi, setprofileDataApi] = useState();
  const [editPhoneState, setEditPhoneState] = useState(true);
  const [phNo, setPhNo] = useState("");
  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    getProfileDataApi();
  }, []);
  const getProfileDataApi = () => {
    getProfileData()
      .then((res) => {
        // console.log(res.data);
        setprofileDataApi(res.data);
        setPhNo(res.data.mobileNumber);
        // console.log(phNo,"ll");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const forgetPassword = () => {
    if (changePassword.currentPassword.length <= 0) {
      Toast({
        type: "error",
        message: "Please Enter Current Password",
      });
    } else if (changePassword.newPassword.length <= 0) {
      Toast({
        type: "error",
        message: "New Password is required",
      });
    } else if (changePassword.newPassword === changePassword.confirmPassword) {
      Toast({
        type: "success",
        message: "Password is Updated",
      });
      // Reset the state
      setChangePassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      Toast({
        type: "error",
        message: "Confirm Password does not match with New Password",
      });
    }
  };
  return (
    <>
      {profileDataApi ? (
        <div className="profile-data-main-container">
          <Profile />
          <div className="profile-data">
            <p className="profile-header">Profile</p>
            <hr></hr>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-xl-4">
                <div className="profile-form-data">User Type</div>
                <div className="values">
                  {profileDataApi.authorities[0].authority}
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-xl-4">
                <div className="profile-form-data">Full Name</div>
                <div className="values">{profileDataApi.firstname}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-xl-4">
                <div className="profile-form-data">Employee ID</div>
                <div className="values">{profileDataApi.vendorId}</div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-xl-4">
                <div className="profile-form-data">Email Address</div>
                <div className="values">{profileDataApi.username}</div>
              </div>
              <div className="w-100">
                <div className="profile-form-data">Mobile Number</div>
                {editPhoneState ? (
                  <div className="values">
                    {phNo}
                    <span>
                      <img
                        alt=""
                        className="profileData-edit-icon cursor-pointer"
                        src={assets.Icons.editBtn}
                        onClick={() => setEditPhoneState(!editPhoneState)}
                      />
                    </span>
                  </div>
                ) : (
                  <div className=" col-xs-12 col-sm-12 col-md-6 col-xl-3 d-flex align-items-center">
                    <NormalInput
                      value={phNo}
                      placeholder="Enter here"
                      onChange={(e) => setPhNo(e.target.value)}
                    />
                    <span className="saveButton">
                      <NormalButton
                        label={"Save"}
                        approveBtn
                        onClick={() => setEditPhoneState(!editPhoneState)}
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="change-password-container">
            <p className="profile-change-password-header">Change Password</p>
            <hr></hr>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-xl-4">
                <div className="password-label">Current Password</div>
                <div>
                  <NormalInput
                    type="password"
                    placeholder="Enter here"
                    value={changePassword.currentPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-100"> </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-xl-4">
                <div className="password-label">New Password</div>
                <div>
                  <NormalInput
                    type="password"
                    placeholder="Enter here"
                    value={changePassword.newPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-xl-4">
                <div className="password-label">Confirm New Password</div>
                <div>
                  <NormalInput
                    type="password"
                    placeholder="Enter here"
                    value={changePassword.confirmPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-100"></div>
              <div className="profile-update-btn">
                <NormalButton
                  label="Update"
                  approveBtn
                  onClick={forgetPassword}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ProfileData;
