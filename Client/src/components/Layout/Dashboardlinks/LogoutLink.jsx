import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../../redux/slices/authSlice";

////////// ---- logout link ---- //////////

export default function LogoutLink() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <a
      onClick={handleLogout}
      className="sc-crHmcD sc-ksdxgE layWKW feLfRC krxgFs"
    >
      <i className="fa-solid fa-right-from-bracket"></i>
      <div className="sc-bqiRlB bfSpmb">Logout</div>
    </a>
  );
}
