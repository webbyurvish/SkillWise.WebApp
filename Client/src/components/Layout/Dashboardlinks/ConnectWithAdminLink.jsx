import React from "react";
import { Link, useLocation } from "react-router-dom";

////////// ---- chat interface with admin link ---- //////////

export default function ConnectWithAdminLink() {
  const location = useLocation();

  return (
    <div>
      <Link
        to={`/chatwithadmin/webbyurvish`}
        className={`sc-crHmcD layWKW ${
          location.pathname === `/chatwithadmin/webbyurvish` ? "active" : ""
        } `}
      >
        <i className="fa-solid fa-house-signal"></i>
        <div className="sc-bqiRlB bfSpmb">
          Connect with <br />
          Admin
        </div>
      </Link>
    </div>
  );
}
