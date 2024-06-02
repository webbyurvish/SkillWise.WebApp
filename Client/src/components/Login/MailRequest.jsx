import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/Login.css";

import { sendMail } from "../../services/AuthServices";
import Loading from "../Layout/Loading/Loading";

//////////// ---- Send Mail request component for forgot password ---- //////////

export default function MailRequest() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  //////////// ---- Send Mail handler ---- //////////

  const handleSendMail = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await sendMail(email);

      setLoading(false);
      setSuccessMessage(response.data.message);
      setEmailSent(true);

      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("You are not registered");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="wrapper">
      {loading ? (
        <Loading />
      ) : (
        <div className="passwordcontainer" id="container">
          <div className="form-container passwordsign-in-container">
            {/* ---------- success Message ---------- */}

            {successMessage.length > 0 && (
              <body className="bodyformail">
                <div className="cardformail">
                  <div className="divformail">
                    <i className="checkmark iformail">✓</i>
                  </div>
                  <h1 className="h1formail">Mail Sent</h1>
                  <p className="pformail">
                    We Sent mail for reset password Check your mail !!!
                  </p>
                </div>
              </body>
            )}

            {/* ---------- Mail send form ---------- */}
            {!emailSent && (
              <form className="formmail" onSubmit={handleSendMail}>
                <h1 className="h1mail">Forgot Password</h1>
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Link className="a" to={"/login"}>
                  Go back to login
                </Link>
                <button className="button" type="submit">
                  Send Mail
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
