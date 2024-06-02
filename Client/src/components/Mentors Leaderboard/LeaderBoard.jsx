import React, { useEffect } from "react";
import Header from "../Layout/Header";
import "./styles/Leaderboard.css";
import Loading from "../Layout/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMentors } from "../../redux/slices/dataSlice";
import { Link } from "react-router-dom";
import {
  calculateAverageRating,
  extractUsername,
  getSortedMentors,
} from "../../services/MentorServices";

export default function LeaderBoard() {
  const dispatch = useDispatch();
  const { mentors, loading } = useSelector((state) => state.data);

  // find sorted mentors by like and ratings
  const sortedMentors = getSortedMentors(mentors);

  // top three mentors
  const threementors = sortedMentors.slice(0, 3);

  // fetch all mentors
  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <div className="leaderbody">
            <section className="leadermain-content">
              <div
                style={{
                  width: "100%",
                  boxShadow: "none",
                  backgroundColor: "rgb(9 226 176 / 35%)",
                  padding: "57px",
                }}
                className="container"
              >
                <h1>Top Mentors</h1>
                <br />
                <br />

                {/* top 3 mentors */}
                <div className="row">
                  {threementors.map((mentor) => {
                    return (
                      <div className="col-sm-4">
                        <div
                          className={`leaderboard-card ${
                            threementors.indexOf(mentor) == 0
                              ? "leaderboard-card--first"
                              : ""
                          }`}
                        >
                          <div className="leaderboard-card__top">
                            <h3 className="text-center">
                              {calculateAverageRating(mentor?.ratings).toFixed(
                                2
                              )}
                              <i
                                className="fa-solid fa-star fa-2xs"
                                style={{ paddingLeft: "6px", color: "#02f6c0" }}
                              ></i>
                            </h3>
                          </div>
                          <div className="leaderboard-card__body">
                            <div className="text-center">
                              <img
                                src={mentor.imageUrl}
                                className="circle-img mb-2"
                                alt="User Img"
                              />
                              <h5 className="mb-0">{mentor.name}</h5>
                              <p className="text-muted mb-0">{mentor.email}</p>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center">
                                <span>
                                  <i
                                    className="fa-solid fa-location-dot"
                                    style={{
                                      paddingRight: "7px",
                                      color: "000000",
                                    }}
                                  ></i>
                                  {mentor.country}
                                </span>
                                <Link
                                  to={`/chatwithmentor/${extractUsername(
                                    mentor.email
                                  )}`}
                                >
                                  <p>
                                    <i
                                      class="fa-solid fa-comments"
                                      style={{ color: "black" }}
                                    ></i>
                                  </p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Mentor</th>
                      <th>Likes</th>
                      <th>Ratings</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Communicate</th>
                    </tr>
                  </thead>

                  {/* other top mentors */}
                  <tbody>
                    {sortedMentors?.slice(3, 10).map((mentor, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={mentor.imageUrl}
                                className="circle-img circle-img--small mr-2"
                                alt="User Img"
                              />
                              <div className="user-info__basic">
                                <h6 className="mb-0">{mentor.name}</h6>
                                <p className="text-muted mb-0">
                                  {mentor.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-baseline">
                              <h4 className="mr-1">{mentor.likes.length}</h4>
                              <small className="text-success">
                                {/* <i className="fa fa-arrow-up"></i>5% */}
                              </small>
                            </div>
                          </td>
                          <td>
                            {calculateAverageRating(mentor?.ratings).toFixed(2)}
                          </td>
                          <td>{mentor.email}</td>
                          <td>{mentor.country}</td>
                          <td>
                            <Link
                              to={`/chatwithmentor/${extractUsername(
                                mentor.email
                              )}`}
                            >
                              <p>
                                <i
                                  class="fa-solid fa-comments"
                                  style={{ color: "black" }}
                                ></i>
                              </p>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
