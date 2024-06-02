import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

////////// ---- chat interface link ---- //////////

export default function ConnectLink() {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Link
        to={`/${user.role}/${user.id}/chat`}
        className={`sc-crHmcD layWKW ${
          location.pathname === `/${user.role}/${user.id}/chat` ? "active" : ""
        } `}
      >
        <i className="fas fa-comments"></i>
        <div className="sc-bqiRlB bfSpmb">Connect</div>
      </Link>
    </div>
  );
}
