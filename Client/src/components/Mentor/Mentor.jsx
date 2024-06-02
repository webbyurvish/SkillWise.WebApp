import React, { useEffect } from "react";
import "./styles/Mentor.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "../../redux/slices/resultSlice";
import { setTechnology } from "../../redux/slices/filterSlice";
import { addLike } from "../../redux/slices/likeratingSlice";
import { setCurrentPage } from "../../redux/slices/dataSlice";
import { handleCountryChange } from "../../services/OnChangeHandlers";

export default function Mentor({ mentor }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const filters = useSelector((state) => state.filters);
  const {
    technology,
    country,
    name,
    spokenLanguage,
    isLiked,
    isMostLiked,
    isTopRated,
  } = useSelector((state) => state.filters);
  const currentPage = useSelector((state) => state.data.currentPage);

  const userId = user ? Number(user.id) : null;

  // triggered when skill is selected
  const handleskillchange = (skill) => {
    dispatch(setCurrentPage(1));
    dispatch(setTechnology(skill));
  };

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

  // When user like or remove like of a mentor
  const handlelike = async (mentorId) => {
    if (!user) {
      navigate("/login");
    }

    const data = {
      userId,
      mentorId,
      filters,
      currentPage,
      navigate,
      dispatch,
    };

    dispatch(addLike(data));
  };

  return (
    <div className="col-lg-4">
      <ToastContainer />

      <div className="mentor-card-cover">
        <div className="card-inner">
          <div className="row align-items-center justify-content-between mentor-location">
            {/* Country */}
            <div className="location-cover">
              <a
                onClick={(e) => {
                  handleCountryChange(dispatch, mentor.country, navigate);
                }}
              >
                <i
                  className="fa-solid fa-location-dot"
                  style={{ color: "#123268" }}
                ></i>
                <p>{mentor.country}</p>
              </a>
            </div>

            {/* Like */}
            <a onClick={() => handlelike(mentor.id)}>
              <i
                className={
                  user !== null && mentor.likes.includes(Number(userId))
                    ? "fa-solid fa-heart"
                    : "fa-regular fa-heart"
                }
                style={{
                  color:
                    user !== null && mentor.likes.includes(Number(user.id))
                      ? "#e91c1c"
                      : "black",
                }}
              ></i>
            </a>
          </div>

          {/* Mentor Profile Image */}
          <div className="card-img">
            <img src={mentor.imageUrl} alt="" />
          </div>
          {/* Mentor's Name */}
          <h2>{mentor.name}</h2>

          {/* Mentor's Title */}
          <span>{mentor.title}</span>

          {/* About Mentor */}
          <p>{mentor.about}</p>

          <div className="technology">
            {/* List of skills that mentor knows */}
            <ul>
              {mentor.skills.slice(0, 3).map((skill, index) => (
                <li key={index}>
                  <a onClick={() => handleskillchange(skill)} href="#">
                    {skill}
                  </a>
                </li>
              ))}
              {mentor.skills.length > 3 && (
                <li>
                  <p>+{mentor.skills.length - 3}</p>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Link to see profile of a mentor */}
        <div className="go-to-profile">
          <Link to={`/mentor/${mentor.id}/profile`}>
            <i className="fa-regular fa-hand-point-right"></i>
            <p>Go To Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
