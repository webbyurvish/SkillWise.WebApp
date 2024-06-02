import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

////////// ---- become a mentor form link ---- //////////

export default function RatingsLink() {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Link
        className={`sc-crHmcD layWKW ${
          location.pathname === `/mentor/${user.id}/reviews` ? "active" : ""
        } `}
        to={`/mentor/${user.id}/reviews `}
      >
        <i class="fa-brands fa-squarespace"></i>
        <div className="sc-bqiRlB bfSpmb">Ratings</div>
      </Link>
    </div>
  );
}
