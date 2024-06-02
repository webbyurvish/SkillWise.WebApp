import React from "react";
import {
  calculateAverageRating,
  getActiveStars,
} from "../../services/MentorServices";
import { DashboardRating } from "../Layout/Rating/DashboardRating";
import { useSelector } from "react-redux";

export const RatingCard = () => {
  const mentor = useSelector((state) => state.mentor.details);
  const averageRating = calculateAverageRating(mentor.ratings);

  return (
    <div>
      <div className="likes-card">
        <div className="mentorratingcard">
          <div className="row justify-content-left d-flex">
            <div
              style={{
                justifyContent: "center",
                marginLeft: "-16px",
                marginRight: "16px",
              }}
              className="col-md-4 d-flex flex-column"
            >
              <div className="mentor-rating-box">
                <h5
                  className="pt-2"
                  style={{ color: "black", marginLeft: "7%" }}
                >
                  {averageRating.toFixed(1)}
                </h5>
                <p style={{ border: "none", font: "bold" }}>out of 5</p>
              </div>
              <div style={{ width: "168%", marginLeft: "-28px" }}>
                {getActiveStars(averageRating)}
              </div>
            </div>
            <div className="col-md-8">
              <div className="rating-bar0 justify-content-center">
                <table className="text-left mx-auto" style={{ width: "221px" }}>
                  <DashboardRating mentor={mentor} />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
