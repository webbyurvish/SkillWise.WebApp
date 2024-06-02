import React from "react";
import "../../MentorPanel/styles/Account.css";

//////// ---- Upper Home component for all dashboard wrappers ---- //////////

export default function Home({ name }) {
  return (
    <div>
      <div className="account-right-side">
        <div className="accont-home">
          <h2>{name}</h2>
        </div>
      </div>
    </div>
  );
}
