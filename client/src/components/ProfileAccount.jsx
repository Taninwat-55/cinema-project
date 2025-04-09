import React from "react";
import "../styles/ProfileAccount.css";
import { CgProfile } from "react-icons/cg";

const ProfileAccount = () => {
  return (
    <div className="profile-account-container">
      <div className="profile-account-wrapper">
        <div className="profile-account-icon-container">
          <CgProfile className="profile-account-icon" />
        </div>

        <div className="account-name-container">
          <h1>JOE76</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileAccount;
