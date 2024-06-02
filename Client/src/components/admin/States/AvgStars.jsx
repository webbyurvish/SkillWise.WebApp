import React from "react";

import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { countMentorsbyAvgStars } from "../../../services/StatesServices";

export default function AvgStars() {
  const { mentors } = useSelector((state) => state.data);

  //   ////////// ---- count mentors by average count of stars given in rating ---- //////////

  const starCounts = countMentorsbyAvgStars(mentors);

  ////////// ---- Rating stars data ---- //////////
  const data = {
    labels: ["5 Star", "4 Star", "3 Star", "2 Star", "1 star"],
    datasets: [
      {
        label: "Mentors",
        data: starCounts,
        backgroundColor: [
          "rgba(255, 178, 0, 0.8)",
          "rgba(31, 0, 63, 0.8)",
          "rgba(255, 9, 81, 0.8)",
          "rgba(68, 209, 88, 0.8)",
          "rgba(0, 10, 160, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="profile-details">
        <div className="doughnut-chart-container">
          <h3
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              marginTop: "25px",
            }}
            className="chart-title"
          >
            Rating States
          </h3>
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
}
