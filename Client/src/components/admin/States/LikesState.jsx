import React from "react";

import { PolarArea } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { countMentorsByLikes } from "../../../services/StatesServices";

export default function LikesState() {
  const { mentors } = useSelector((state) => state.data);

  ////////// ---- Count mentors by likes ---- //////////

  const likesMentorCount = countMentorsByLikes(mentors);

  ////////// ---- likes states data ---- //////////

  const likesData = {
    labels: [
      "0 - 20 Likes",
      "20 - 40 Likes",
      "40 - 60 Likes",
      "60 - 80 Likes",
      "Above 80 Likes",
    ],
    datasets: [
      {
        label: "Liked Mentors",
        data: likesMentorCount,
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
    <div style={{ marginBottom: "50px" }} className="col-lg-4">
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
            Likes States
          </h3>
          <PolarArea data={likesData} />
        </div>
      </div>
    </div>
  );
}
