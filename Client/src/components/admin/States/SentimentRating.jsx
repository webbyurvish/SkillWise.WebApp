import React from "react";

import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

import { countSentiments } from "../../../services/StatesServices";

export default function SentimentRating() {
  const { mentors } = useSelector((state) => state.data);

  //////////////////// ---- analyze rating messages by positive , negative and neutral count ---- ////////////////////

  const { positiveCount, negativeCount, neutralCount } =
    countSentiments(mentors);

  const ratingCategories = [positiveCount, neutralCount, negativeCount];

  ////////// ---- positive , negative or neutral feedback data ---- //////////

  const ratingData = {
    labels: ["Positive Feedback", "Neutral Feedback", "Negative Feedback"],
    datasets: [
      {
        label: "Count",
        data: ratingCategories,
        backgroundColor: [
          "rgba(0, 10, 160, 0.8)",
          "rgba(255, 178, 0, 0.8)",
          "rgba(255, 9, 81, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ marginBottom: "50px" }} className="col-lg-4">
      <div className="profile-details">
        <Pie data={ratingData} />
      </div>
    </div>
  );
}
