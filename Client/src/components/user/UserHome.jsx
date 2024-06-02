import React from "react";
import UserWrapper from "./UserWrapper";
import { useSelector } from "react-redux";
import "../MentorPanel/styles/Account.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Layout/Loading/Loading";
import ChangePasswordModal from "../Layout/ChangePassword/ChangePasswordModal";
import Home from "../Layout/Home/Home";

export default function UserHome() {
  const user = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.account);

  return (
    <UserWrapper>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <ToastContainer />
          <Home name={"Home"} />

          <div className="account-profile">
            <div className="accound-cover">
              <div className="row justify-content-center">
                <div className="col-lg-4">
                  <div className="profile-details">
                    <img src="img/navlogo.jpg" alt="" />
                    {/* User Name */}
                    <h2 style={{ marginBottom: "30px" }}>{user.name}</h2>
                    {/* User Email */}

                    <h6 style={{ marginBottom: "30px" }}>{user.email}</h6>
                    {/* user's profile image */}
                    <img src={user.imageUrl} alt="" />
                    {/* change password button ( on click its open a modal ) */}
                    <div>
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
          </div>
        </React.Fragment>
      )}

      {/* Change password Modal */}
      <ChangePasswordModal />
    </UserWrapper>
  );
}
