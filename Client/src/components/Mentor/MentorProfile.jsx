import React, { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { FeedBack } from "../Layout/Rating/FeedBack";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/dataSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTechnology } from "../../redux/slices/filterSlice";
import { fetchData } from "../../redux/slices/resultSlice";
import Loading from "../Layout/Loading/Loading";
import Overview from "../Layout/Rating/Overview";
import {
  calculateAverageRating,
  extractUsername,
  fetchMentorData,
} from "../../services/MentorServices";
import Ratings from "../Layout/Rating/Ratings";
import { submitRating } from "../../redux/slices/likeratingSlice";
import { handleCountryChange } from "../../services/OnChangeHandlers";
import { DeleteMentorPermanent } from "../../redux/slices/mentorsSlice";

export default function MentorProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const filters = useSelector((state) => state.filters);
  const loading = useSelector((state) => state.result.loading);
  const {
    technology,
    country,
    name,
    spokenLanguage,
    isLiked,
    isMostLiked,
    isTopRated,
  } = useSelector((state) => state.filters);
  const { selectedStars, currentPage } = useSelector((state) => state.data);

  const userId = user ? Number(user.id) : null;

  const handleskillchange = (skill) => {
    navigate("/");
    dispatch(setCurrentPage(1));
    dispatch(setTechnology(skill)); // Dispatch the setTechnology action with the selected skill
  };

  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // average of all ratings
  const averageRating = calculateAverageRating(mentor?.ratings);

  useEffect(() => {
    // fetch mentor details
    async function fetchMentorDatabyid() {
      try {
        const mentorData = await fetchMentorData(id, navigate);
        setMentor(mentorData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMentorDatabyid();
  }, []);

  useEffect(() => {
    dispatch(
      fetchData({
        technology,
        country,
        name,
        spokenLanguage,
        currentPage,
        isLiked,
        userId,
        isMostLiked,
        isTopRated,
      })
    );
  }, [filters, currentPage, dispatch]);

  // submit ratings to mentor
  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId: Number(user.id),
      mentorId: mentor.id,
      filters,
      currentPage,
      navigate,
      dispatch,
      comment: feedbackMessage,
      stars: selectedStars,
    };

    dispatch(submitRating(data));
  };

  const handleDelete = async () => {
    dispatch(
      DeleteMentorPermanent({ email: mentor.email, navigate, dispatch })
    );
    toast.success("mentor deleted successfully");
    navigate("/");
  };

  return (
    <Layout>
      <ToastContainer />
      {!mentor || !user || loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className="row justify-content-center">
            <Link style={{ marginTop: "40px" }} to="/">
              Back to mentors list
            </Link>
          </div>

          {/* Mentors card   */}
          <div className="row justify-content-center">
            <div className="col-lg-8 mentor-detail">
              <div className="mentor-card-cover">
                <div className="card-inner">
                  <div className="row align-items-center justify-content-between mentor-location">
                    {/* Mentor's country */}
                    <div className="location-cover">
                      <a href="javascript:void(0)">
                        <i
                          className="fa-solid fa-location-dot"
                          style={{ color: "#123268" }}
                        ></i>
                        <p
                          onClick={(e) => {
                            handleCountryChange(
                              dispatch,
                              mentor.country,
                              navigate
                            );
                          }}
                        >
                          {mentor.country}
                        </p>
                      </a>
                    </div>
                  </div>
                  {/* Mentor's Profile image */}
                  <div className="card-img">
                    <img src={mentor.imageUrl} alt="" />
                  </div>
                  {/* Mentor Name */}
                  <h2>{mentor.name}</h2>

                  {/* Mentor title */}
                  <span>{mentor.title}</span>

                  {/* About mentor */}
                  <p>{mentor.about}</p>

                  {/* List of Languages that mentor knows */}
                  <i
                    style={{ marginRight: "7px" }}
                    className="fa-solid fa-language"
                  ></i>
                  <span>
                    {mentor.languages.map((language, index) => (
                      <React.Fragment key={index}>
                        {language}
                        {index !== mentor.languages.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </span>

                  {/* List of Skills */}
                  <div className="technology">
                    <ul>
                      {mentor.skills.map((skill, index) => (
                        <li key={index}>
                          <a
                            onClick={() => handleskillchange(skill)}
                            href="javascript:void(0)"
                          >
                            {skill}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <ul style={{ marginTop: "15px" }}>
                      {mentor.available
                        ? "Available For mentorships"
                        : "Not available for mentorships"}
                    </ul>
                  </div>
                </div>

                <div className="go-to-profile">
                  {user.role === "admin" ? (
                    <React.Fragment>
                      <a onClick={handleDelete}>
                        <i class="fa-solid fa-trash"></i>
                        <p>Delete mentor</p>
                      </a>
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </React.Fragment>
                  ) : null}
                  {/* Link for rating mentor ( on click its open a modal ) */}
                  <a
                    href="javascript:vid(0)"
                    // onClick={openModal}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i className="fa-sharp fa-solid fa-face-smile"></i>
                    <p>Rate mentor</p>
                  </a>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  {/* Link to direct chat with mentor */}
                  <Link to={`/chatwithmentor/${extractUsername(mentor.email)}`}>
                    <i className="fa-solid fa-comments"></i> <p>Communicate</p>
                  </Link>
                </div>
              </div>
            </div>

            {mentor.ratings.length > 0 && (
              <div className="ratingbody">
                {/* Rating overview of mentor */}
                <div className="card">
                  <div className="row justify-content-left d-flex">
                    <Overview averageRating={averageRating} mentor={mentor} />
                  </div>
                </div>
                <hr />

                {/* List of ratings */}
                <div className="card">
                  <Ratings mentor={mentor} />
                </div>
              </div>
            )}
          </div>

          {/* Rating modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                {mentor &&
                  user &&
                  mentor.ratings.some(
                    (obj) => obj.userId === Number(user.id)
                  ) && (
                    <p
                      style={{
                        margin: "3rem",
                        padding: "1rem",
                        fontWeight: "bold",
                        fontSize: "2rem",
                      }}
                    >
                      <span>
                        <i
                          className="fa-sharp fa-solid fa-face-smile"
                          style={{ color: "rgb(0 67 217)" }}
                        ></i>
                      </span>
                      &nbsp; You already rated this mentor !!!
                    </p>
                  )}
                {mentor &&
                  !mentor.ratings.some(
                    (obj) => obj.userId === Number(user.id)
                  ) && (
                    <React.Fragment>
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Rating
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <FeedBack />
                      <div className="modal-body">
                        <div className="reject-reason">
                          <label htmlFor="text">Give Feedback</label>
                          <textarea
                            type="text"
                            value={feedbackMessage}
                            onChange={(e) => setFeedbackMessage(e.target.value)}
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
                          onClick={(e) => handleRatingSubmit(e)}
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Submit
                        </button>
                      </div>
                    </React.Fragment>
                  )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </Layout>
  );
}
