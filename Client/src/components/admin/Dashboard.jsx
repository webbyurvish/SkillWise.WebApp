import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../MentorPanel/styles/Account.css";

import { fetchAllMentors } from "../../redux/slices/dataSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../Layout/Loading/Loading";
import AdminWrapper from "./AdminWrapper";
import ChangePasswordModal from "../Layout/ChangePassword/ChangePasswordModal";
import Home from "../Layout/Home/Home";

//////////////////// ---- Home component for admin Dashboard ---- ////////////////////

export default function Admin() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { mentors, loading } = useSelector((state) => state.data);
  const { paswordloading } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);

  return (
    <AdminWrapper>
      <ToastContainer />
      {loading || paswordloading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Home name={"Home"} />

          <div className="account-profile">
            <div className="accound-cover">
              <div className="row justify-content-center">
                <div className="col-lg-4">
                  <div className="profile-details">
                    <img src="img/navlogo.jpg" alt="" />

                    {/* ----- Name of admin ----- */}
                    <h2> {user.name}</h2>
                    <p>Admin of Tech-mentor</p>
                    <img
                      style={{ marginTop: "20px" }}
                      alt="admin profile"
                      src={user.imageUrl}
                    />

                    {/* ----- Total mentors card ----- */}
                    <div className="likes-card">
                      <h3>Total Mentors</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {mentors?.length}
                      </p>
                    </div>

                    {/* ----- Change Password Link ----- */}
                    <a data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <div className="saveorclose-btn">
                        <button>change password</button>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}

      {/* -------------------- Change password Modal -------------------- */}

      <ChangePasswordModal />
    </AdminWrapper>
  );
}
