import React from "react";

export default function Social() {
  return (
    <div>
      <div className="social-icon">
        <ul>
          <li>
            <a href="#">
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="social-link">
        <ul>
          <li>
            <a href="#">Cookies policy</a>
          </li>
          <li>
            <a href="#">Code of Conduct</a>
          </li>
          <li>
            <a href="#">Terms & Conditions</a>
          </li>
          <li>
            <a href="#">Privacy Statement</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
