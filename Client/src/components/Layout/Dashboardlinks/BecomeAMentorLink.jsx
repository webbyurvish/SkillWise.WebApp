import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

////////// ---- become a mentor page link ---- //////////

export default function BecomeAMentorLink() {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Link
        className={`sc-crHmcD layWKW ${
          location.pathname === `/user/${user.id}/become` ? "active" : ""
        } `}
        to={`/user/${user.id}/become`}
      >
        <i className="fa-solid fa-people-carry-box"></i>
        <div className="sc-bqiRlB bfSpmb">
          Become <br /> a mentor
        </div>
      </Link>
    </div>
  );
}
