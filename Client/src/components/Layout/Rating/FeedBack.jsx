import React from "react";
import "../../Mentor/styles/Mentor.css";
import { useDispatch } from "react-redux";
import { setSelectedStars } from "../../../redux/slices/dataSlice";
import {
  Rating0svg,
  Rating1svg,
  Rating2svg,
  Rating3svg,
  Rating4svg,
  Rating5svg,
} from "../Icons/Ratingsvg";

//////////////////// ---- Rating and feedback component ---- ////////////////////

export const FeedBack = () => {
  const dispatch = useDispatch();

  /////////// ---- Star select handler ---- ///////////

  const handleSelectedStars = (stars) => {
    dispatch(setSelectedStars(stars));
  };

  const stars = [5, 4, 3, 2, 1];

  return (
    <div>
      <div className="feedback">
        <div className="rating">
          {/* ////////// ------ Stars ------ //////////  */}
          {stars.map((star, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  type="radio"
                  name="rating"
                  id={`rating-${star}`}
                  onClick={() => handleSelectedStars(star)}
                />
                <label htmlFor={`rating-${star}`}></label>
              </React.Fragment>
            );
          })}

          {/* ////////// ------- SVGs ------- ////////// */}
          <div className="emoji-wrapper">
            <div className="emoji">
              <Rating0svg />

              <Rating1svg />

              <Rating2svg />

              <Rating3svg />

              <Rating4svg />

              <Rating5svg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
