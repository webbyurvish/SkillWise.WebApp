import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/slices/authSlice";

export default function ChangePasswordModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //////////////////// ---- Change password submit handler ---- ////////////////////

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: user.email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    dispatch(changePassword(data));
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div style={{ width: "75%" }} className="modal-content">
          {user && (
            <React.Fragment>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Change Password
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div style={{ marginLeft: "20px" }} className="modal-body">
                <div>
                  <label
                    style={{
                      display: "flex",
                      fontStyle: "italic",
                      fontWeight: 700,
                    }}
                    htmlFor="oldpassword"
                  >
                    Old Password
                  </label>
                  <input
                    style={{ width: "86%" }}
                    name="oldpassword"
                    id="oldpassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <label
                    style={{
                      display: "flex",
                      fontStyle: "italic",
                      fontWeight: 700,
                    }}
                    htmlFor="newpassword"
                  >
                    New Password
                  </label>
                  <input
                    style={{ width: "86%" }}
                    name="newpassword"
                    id="newpassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
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
                  onClick={handleResetPasswordSubmit}
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
  );
}
