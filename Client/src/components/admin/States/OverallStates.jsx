import React from "react";
import { useSelector } from "react-redux";
import { countAvailableMentors } from "../../../services/StatesServices";

export default function OverallStates() {
  const { mentors } = useSelector((state) => state.data);

  ////////// ----- Count available / active mentors ----- //////////

  const availableMentorCount = countAvailableMentors(mentors);

  return (
    <div>
      <div className="profile-details">
        <div className="likes-card">
          <h3>Total Mentors</h3>
          <p style={{ border: "none" }} className="likes-count">
            {mentors.length}
          </p>
        </div>

        <div className="likes-card">
          <h3>Total Ratings</h3>
          <p style={{ border: "none" }} className="likes-count">
            {mentors.reduce(
              (count, mentor) => count + mentor.ratings.length,
              0
            )}
          </p>
        </div>

        <div className="likes-card">
          <h3>Total Likes</h3>
          <p style={{ border: "none" }} className="likes-count">
            {mentors.reduce((count, mentor) => count + mentor.likes.length, 0)}
          </p>
        </div>

        <div className="likes-card">
          <h3>Active Mentors</h3>
          <p style={{ border: "none" }} className="likes-count">
            {availableMentorCount}
          </p>
        </div>
      </div>
    </div>
  );
}
