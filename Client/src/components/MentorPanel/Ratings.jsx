import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../services/MentorServices";
import { MentorWrapper } from "./MentorWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "../Layout/Home/Home";

export default function Reviews() {
  const mentor = useSelector((state) => state.mentor.details);
  console.log(mentor);

  return (
    <MentorWrapper>
      <ToastContainer />

      <Home name={"Ratings"} />

      <div className="account-profile">
        <div className="accound-cover">
          <div className="row justify-content-center">
            <div style={{ marginBottom: "50px" }} className="col-lg-9">
              <div className="profile-details">
                <img src="img/navlogo.jpg" alt="" />

                {mentor.ratings.length > 0 ? (
                  <div>
                    {mentor.ratings.map((rating) => (
                      <React.Fragment>
                        <div
                          style={{
                            width: "100%",
                            background: "#a7ffdf",
                            marginBottom: "15px",
                          }}
                          className=" d-flex"
                        >
                          <div
                            style={{
                              marginBottom: "25px",
                              width: "55%",
                              marginRight: "10%",
                            }}
                            className="d-flex flex-column text-left"
                          >
                            <p
                              style={{
                                border: "none",
                                backgroundColor: "#a7ffdf",
                                fontFamily: "cursive",
                                padding: "20px 15px",
                                fontSize: "16px",
                              }}
                              className="content mt-3"
                            >
                              {rating.comment}
                            </p>
                          </div>
                          {/* <div> */}
                          <div
                            style={{ marginRight: "20px", paddingTop: "23px" }}
                          >
                            <img
                              className="profile-pic"
                              src={rating.user.imageUrl}
                            />
                          </div>
                          <div
                            style={{ marginRight: "35px", paddingTop: "30px" }}
                            className="d-flex flex-column"
                          >
                            <h6 className="mt-2 mb-0">{rating.user.name}</h6>
                            <div>
                              <p
                                style={{ border: "none" }}
                                className="text-left"
                              >
                                <span className="text-muted">
                                  {rating.stars.toFixed(1)} &nbsp;
                                </span>
                                {[...Array(Math.floor(rating.stars))].map(
                                  (_, index) => (
                                    <span
                                      className="fa fa-star star-active"
                                      key={index}
                                    ></span>
                                  )
                                )}
                                {[...Array(5 - Math.floor(rating.stars))].map(
                                  (_, index) => (
                                    <span
                                      className="fa fa-star star-inactive"
                                      key={index}
                                    ></span>
                                  )
                                )}
                              </p>
                            </div>
                          </div>
                          <div
                            style={{ paddingTop: "23px" }}
                            className="ml-auto"
                          >
                            <p
                              style={{ border: "none" }}
                              className="text-muted pt-5 pt-sm-3"
                            >
                              {formatDate(rating.dateRated)}
                            </p>
                          </div>
                          {/* </div> */}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <p>No Ratings to show</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MentorWrapper>
  );
}
