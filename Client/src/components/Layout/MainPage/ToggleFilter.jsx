import React from "react";
import {
  handleLikedChange,
  handleMostLikedChange,
  handleTopRatedChange,
} from "../../../services/OnChangeHandlers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

//////////////////// ---- Toggle Filters component ---- ////////////////////

export default function ToggleFilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector((state) => state.filters);

  return (
    <div>
      {/* //////////////////// ---- Favourites Filter ---- //////////////////// */}

      <div className="myfavourits">
        <p>MY FAVORITES</p>
        <label className="switch">
          <input
            checked={filters.isLiked}
            onChange={handleLikedChange(dispatch, navigate)}
            type="checkbox"
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* //////////////////// ---- Most Liked Filter ---- //////////////////// */}

      <div className="myfavourits">
        <p>MOST LIKED</p>
        <label className="switch">
          <input
            checked={filters.isMostLiked}
            onChange={handleMostLikedChange(dispatch, navigate)}
            type="checkbox"
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* //////////////////// ---- Top Rated Filter ---- //////////////////// */}

      <div className="myfavourits">
        <p>TOP RATED</p>
        <label className="switch">
          <input
            checked={filters.isTopRated}
            onChange={handleTopRatedChange(dispatch, navigate)}
            type="checkbox"
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}
