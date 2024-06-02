import React from "react";
import "../MentorPanel/styles/Account.css";
import LogoutLink from "../Layout/Dashboardlinks/LogoutLink";
import HomeLink from "../Layout/Dashboardlinks/HomeLink";
import MentorspageLink from "../Layout/Dashboardlinks/MentorspageLink";
import ConnectLink from "../Layout/Dashboardlinks/ConnectLink";
import BecomeAMentorLink from "../Layout/Dashboardlinks/BecomeAMentorLink";

export default function UserWrapper({ children }) {
  return (
    <div>
      <div className="managment-account">
        <div className="container-fluid">
          <div className="account-side-bar">
            <nav style={{ width: "77px" }} className="sc-iqseJM eWrBEk">
              <img
                src="/images/coding.png"
                alt="Logo"
                className="sc-egiyK dhAbpN"
              />

              {/* User Dashboard home */}
              <HomeLink />

              {/* Link to become a mentor */}
              <BecomeAMentorLink />

              {/* Dashboard Chat and video call with mentors and users */}
              <ConnectLink />

              {/* Main mentors list page */}
              <MentorspageLink />

              {/* Logout link */}
              <LogoutLink />
            </nav>

            {/* children component */}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
