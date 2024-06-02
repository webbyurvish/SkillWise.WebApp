import React, { useEffect, useState } from "react";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Layout/Loading/Loading";
import { getMentorDetails } from "../../redux/slices/mentorSlice";

export default function MentorDetail() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getMentorDetails(user.email));
  }, [user.email]);

  return <div>{loading ? <Loading /> : <Account />}</div>;
}
