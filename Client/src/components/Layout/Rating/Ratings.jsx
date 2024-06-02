import React from "react";
import { formatDate } from "../../../services/MentorServices";

//////////////////// ----- all ratings of a mentor component ----- ////////////////////

export default function Ratings({ mentor }) {
  return (
    <div>
      {mentor.ratings.map((rating) => (
        <React.Fragment>
          <div className="row d-flex">
            {/* ----- User's image ----- */}
            <div>
              <img className="profile-pic" src={rating.user.imageUrl} />
            </div>
            <div className="d-flex flex-column">
              {/* ----- User's Name ----- */}
              <h5 className="mt-2 mb-0">{rating.user.name}</h5>
              <div>
                <p className="text-left">
                  <span className="text-muted">
                    {rating.stars.toFixed(1)} &nbsp;
                  </span>

                  {/* ----- Active stars  ----- */}

                  {[...Array(Math.floor(rating.stars))].map((_, index) => (
                    <span className="fa fa-star star-active" key={index}></span>
                  ))}

                  {/* ----- InActive stars  ----- */}

                  {[...Array(5 - Math.floor(rating.stars))].map((_, index) => (
                    <span
                      className="fa fa-star star-inactive"
                      key={index}
                    ></span>
                  ))}
                </p>
              </div>
            </div>

            {/* ----- Date of Rating ----- */}

            <div className="ml-auto">
              <p className="text-muted pt-5 pt-sm-3">
                {formatDate(rating.dateRated)}
              </p>
            </div>

            {/* ----- Rating message ----- */}

            <div
              style={{ marginBottom: "40px" }}
              className="d-flex flex-column text-left"
            >
              <p className="content mt-3">{rating.comment}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
