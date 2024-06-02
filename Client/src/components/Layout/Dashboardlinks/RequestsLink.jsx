import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

////////// ---- Users requests to become a mentor page link ---- //////////

export default function RequestsLink() {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Link
        to={`/admin/${user.id}/requests`}
        className={`sc-crHmcD layWKW ${
          location.pathname.includes(`/admin/${user.id}/requests`)
            ? "active"
            : ""
        } `}
      >
        <i className="fa-solid fa-user-plus"></i>
        <div className="sc-bqiRlB bfSpmb ">Requests</div>
      </Link>
    </div>
  );
}
