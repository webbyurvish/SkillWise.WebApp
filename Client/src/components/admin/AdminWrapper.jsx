import React from "react";
import "../MentorPanel/styles/Account.css";
import ConnectLink from "../Layout/Dashboardlinks/ConnectLink";
import MentorspageLink from "../Layout/Dashboardlinks/MentorspageLink";
import LogoutLink from "../Layout/Dashboardlinks/LogoutLink";
import RequestsLink from "../Layout/Dashboardlinks/RequestsLink";
import HomeLink from "../Layout/Dashboardlinks/HomeLink";
import StatesLink from "../Layout/Dashboardlinks/StatesLink";

//////////////////// ---- Wrapper component for admin Dashboard ---- ////////////////////

const AdminWrapper = ({ children }) => {
  return (
    <div>
      <div className="managment-account">
        <div className="container-fluid">
          <nav style={{ width: "77px" }} className="sc-iqseJM eWrBEk">
            <img
              src="/images/coding.png"
              alt="Logo"
              className="sc-egiyK dhAbpN"
            />
            {/* Admin Dashboard home */}
            <HomeLink />

            {/* All statistics */}
            <StatesLink />

            {/* Dashboard Users Requests to become a mentor */}
            <RequestsLink />

            {/* Dashboard Chat and video call to mentors and users */}
            <ConnectLink />

            {/* Main mentors list page */}
            <MentorspageLink />

            {/* Logout */}
            <LogoutLink />
          </nav>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminWrapper;
