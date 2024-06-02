import React from "react";
import {
  Aboutsvg,
  Availablesvg,
  Countrysvg,
  Languagesvg,
  Mailsvg,
  Skillsvg,
  Titlesvg,
} from "../Layout/Icons/Languagesvg";
import "./styles/Ratings.css";
import "./styles/Account.css";
import "./styles/EditMentor.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MentorDetailsCard = () => {
  const user = useSelector((state) => state.auth.user);
  const mentor = useSelector((state) => state.mentor.details);

  return (
    <div className="col-lg-4" style={{ marginBottom: "30px" }}>
      <div className="profile-details details-cover">
        <div className="row align-items-center justify-content-between detail-name">
          <a href="javascript:void(0)">My Profile</a>

          {/* Edit profile link */}
          <Link
            to={{
              pathname: `/mentor/${user.id}/edit`,
              state: { mentor },
            }}
          >
            Edit
          </Link>
        </div>
        <div className="profiles-details-cover">
          <ul>
            <li>
              <Mailsvg />
              <p>{mentor.email}</p>
            </li>

            {/* Languages known by mentor */}
            <li>
              <Languagesvg />
              {mentor.languages.map((language, index) => (
                <React.Fragment key={language}>
                  <p>
                    {language}
                    {index !== mentor.languages.length - 1 && " , "}
                  </p>
                </React.Fragment>
              ))}
            </li>

            {/* Mentor's country */}
            <li>
              <Countrysvg />
              <p>{mentor.country}</p>
            </li>

            {/* Mentor's title */}
            <li>
              <Titlesvg />
              <p>{mentor.title}</p>
            </li>

            {/* Skill list of mentor */}
            <li>
              <Skillsvg />
              {mentor.skills.map((skill, index) => (
                <React.Fragment key={skill}>
                  <p>
                    {skill}
                    {index !== mentor.skills.length - 1 && " , "}
                  </p>
                </React.Fragment>
              ))}
            </li>

            {/* Mentor is available or not */}
            <li>
              <Availablesvg />
              {mentor.available ? <p>available</p> : <p>not available</p>}
            </li>

            {/* about mentor */}
            <li>
              <Aboutsvg />
              <p>{mentor.about}</p>
            </li>
            <li>
              <a data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div className="saveorclose-btn">
                  <button>change password</button>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
