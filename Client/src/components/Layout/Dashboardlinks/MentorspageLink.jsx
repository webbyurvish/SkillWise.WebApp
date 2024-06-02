import React from "react";
import { Link } from "react-router-dom";

////////// ---- Mentors list page link ---- //////////

export default function MentorspageLink() {
  return (
    <div>
      <Link to={`/`} className="sc-crHmcD layWKW">
        <i className="fa-solid fa-people-arrows"></i>
        <div className="sc-bqiRlB bfSpmb">Mentors</div>
      </Link>
    </div>
  );
}
