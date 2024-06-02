import React from "react";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import AdminWrapper from "./AdminWrapper";
import OverallStates from "./States/OverallStates";
import AvgStars from "./States/AvgStars";
import LikesState from "./States/LikesState";
import SentimentRating from "./States/SentimentRating";

//////////////////// ---- Registering chartjs elements for use ---- ////////////////////

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function States() {
  const { mentors } = useSelector((state) => state.data);

  return (
    <AdminWrapper>
      <React.Fragment>
        <ToastContainer />
        <div className="account-right-side">
          <div className="accont-home">
            <h2>States</h2>
          </div>
        </div>

        {mentors && (
          <div className="account-profile">
            <div className="accound-cover">
              <div className="row justify-content-center">
                <div className="col-lg-4">
                  {/* ----- Overall states of website ----- */}
                  <OverallStates />
                </div>

                <div className="col-lg-4">
                  {/* ----- Ratings states by average stars ----- */}
                  <AvgStars />
                </div>
              </div>

              <div
                style={{ marginTop: "3rem" }}
                className="row justify-content-center"
              >
                {/* ----- Likes states by Range ----- */}
                <LikesState />

                {/* ----- Ratings states by positive , negative or neutral ----- */}
                <SentimentRating />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    </AdminWrapper>
  );
}
