import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles/admin.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminWrapper from "./AdminWrapper";
import Loading from "../Layout/Loading/Loading";

import { changeRole } from "../../services/ChatServices";
import {
  approveRequest,
  fetchRequests,
  rejectRequest,
} from "../../redux/slices/mentorsSlice";

//////////////////// ---- Requests component for admin Dashboard ---- ////////////////////

export default function Requests() {
  const dispatch = useDispatch();
  const { loading, requests } = useSelector((state) => state.mentors);

  const [rejectmessage, setRejectMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [mail, setMail] = useState("");

  //////////////////// ---- approve request handler ---- ////////////////////

  const handleApprove = async (e) => {
    e.preventDefault();

    dispatch(approveRequest(e.target.value));
    changeRole(e.target.value.split("@")[0]);
    setToggle(false);
  };

  //////////////////// ---- reject request handler ---- ////////////////////

  const handleReject = async (e) => {
    e.preventDefault();

    const email = mail;
    dispatch(rejectRequest({ email, rejectmessage }));
    setToggle(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchRequests());
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <AdminWrapper>
        <ToastContainer />
        {loading ? (
          <Loading />
        ) : (
          <div className="managment-account">
            <div className="container-fluid">
              <div className="account-side-bar">
                <div className="account-right-side">
                  <div className="accont-home">
                    <h2>Requests to become a mentor</h2>
                  </div>
                </div>
                <div className="account-profile">
                  <div className="accound-cover">
                    <div className="row justify-content-center">
                      <div
                        style={{ marginBottom: "40px" }}
                        className="col-lg-4"
                      >
                        <div className="profile-details details-cover">
                          <div className="share-details-2">
                            <p>My Mentorship Requests</p>
                            {requests.length < 1 && (
                              <p>There is no request to become a mentor</p>
                            )}

                            {/* ---------- List of requests to become a mentor ---------- */}

                            {requests.map((request) => {
                              const isToggled =
                                toggle && request.email === toggle;
                              return (
                                <div
                                  key={request.email}
                                  onClick={() => {
                                    setToggle(
                                      isToggled ? false : request.email
                                    );
                                  }}
                                  className={`mentorship-profile-detail ${
                                    isToggled ? "toggled" : ""
                                  }`}
                                >
                                  <a href="javascript:void(0)">
                                    <div className="poifile-details">
                                      <img src={request.imageUrl} alt="" />
                                      <div className="poifile-details-cover">
                                        <p>{request.name}</p>
                                        <span>{request.title}</span>
                                      </div>
                                    </div>
                                    <div className="mentorship-day"></div>
                                  </a>

                                  {/* ----------- User Details ---------- */}

                                  {isToggled && (
                                    <div>
                                      <div className="details-message-cover">
                                        <p>Name</p>
                                        <ul>
                                          <li>{request.name}</li>
                                        </ul>
                                      </div>
                                      <div className="details-message-cover">
                                        <p>Title</p>
                                        <ul>
                                          <li>{request.title}</li>
                                        </ul>
                                      </div>

                                      {/* ---- About User ---- */}
                                      <div className="details-message-cover">
                                        <p>About</p>
                                        <ul>
                                          <li>{request.about}</li>
                                        </ul>
                                      </div>

                                      {/* ---- Languages that user knows ---- */}
                                      <div className="details-message-cover">
                                        <p>Languages known</p>
                                        <ul>
                                          {request.languages.map((language) => (
                                            <li>{language}</li>
                                          ))}
                                        </ul>
                                      </div>

                                      {/* ---- skills of user ---- */}
                                      <div className="details-message-cover">
                                        <p>Skills</p>
                                        <ul>
                                          {request.skills.map((skill) => (
                                            <li>{skill}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="details-link">
                                        {/* ---- Approve button ---- */}
                                        {!loading && (
                                          <button
                                            className="approve-button"
                                            value={request.email}
                                            onClick={handleApprove}
                                          >
                                            Approve
                                          </button>
                                        )}
                                        {loading && (
                                          <button className="approve-button">
                                            Loading...
                                          </button>
                                        )}

                                        {/* ---- Reject Button ---- */}
                                        <button
                                          className="reject-button"
                                          variant="primary"
                                          value={request.email}
                                          data-bs-toggle="modal"
                                          data-bs-target="#exampleModal"
                                          onClick={() => setMail(request.email)}
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminWrapper>

      {/* <!--------------- Modal to give reason of reject user's request ---------------> */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Mentorship Request
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="reject-reason">
                <label htmlFor="text">Reason to reject user's request</label>
                <textarea
                  type="text"
                  value={rejectmessage}
                  onChange={(e) => setRejectMessage(e.target.value)}
                  rows={4}
                  cols={20}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={handleReject}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
