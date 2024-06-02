import React from "react";
import "./about.css";
import { Link } from "react-router-dom";

//////////////////// ---- About Component ---- ////////////////////

export default function About() {
  return (
    <div>
      <div id="___gatsby">
        <div
          style={{ outline: "none" }}
          tabindex="-1"
          role="group"
          id="gatsby-focus-wrapper"
        >
          <nav className="bg-primary-light py-4">
            <div className="container-fluid">
              <ul className="inline-block">
                <li className="mr-3 inline-block md:mr-8">
                  <Link to={"/"} className="header-cover">
                    Mentors
                  </Link>
                </li>
                <li className="mr-3 inline-block md:mr-8">
                  <a className="header-cover" href="/about">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <section className="py-32">
            <div className="container-fluid d-flex align-items-center md:flex-row-reverse">
              <div className="md:flex-1 mr-6 md:flex md:flex-col md:items-end md:pl-16">
                <img
                  src="https://codingcoach.io/static/about-01142835027ed21d551128444ff6d5a0.svg"
                  alt="Illustration"
                />
              </div>
              <div className="mt-16 md:mt-0 md:w-2/5 text-right">
                <h3 className="text-6xl font-display font-normal uppercase leading-tight mb-6 border-b border-secondary-lightest text-primary-light md:text-right">
                  About
                </h3>
                <p className="text-lg text-secondary-dark leading-normal font-body md:text-right">
                  Tech-Mentor is a free, open-source platform which aims to
                  connect software developers and mentors all over the world. It
                  is built by a group of talented and passionate developers,
                  designers, engineers, and humans who want to make the
                  engineering world a better place to collaborate. This project
                  was born out of a desire to provide a platform to connect
                  mentors and mentees throughout the world at no cost.
                  Tech-Mentor is created by the people, for the people.
                </p>
              </div>
            </div>
          </section>
          <section className="py-32 bg-primary-lighter bg-band bg-band-primary-lighter">
            <div className="container-fluid lighter-tigh-cover md:flex md:flex-row">
              <div className="md:flex-1 md:flex md:flex-col md:pr-16">
                <h3 className="text-6xl font-display font-normal uppercase leading-tight-2 mb-6 border-b border-secondary-lightest text-secondary-dark">
                  Mission
                </h3>
                <p className="text-lg text-secondary-dark leading-normal font-body">
                  We believe that mentorship should be accessible to all people
                  regardless of location or financial standing. In pursuit of
                  this goal we will provide a free and open source platform to
                  facilitate mentorship connections. Our mission is to foster a
                  greater sense of collaboration and inclusiveness in the
                  technical industry by providing a platform to aid the
                  mentorship process.
                </p>
              </div>
              <div className="mt-16 md:mt-0 md:w-2/5">
                <img
                  src="https://codingcoach.io/static/mission-3c72b01c43a10d34c2d828b13c14bfd0.svg"
                  alt="Illustration"
                />
              </div>
            </div>
          </section>
          <section className="py-32">
            <div className="container-fluid d-flex align-items-center md:flex md:flex-row-reverse">
              <div className="mt-16 md:mt-0 md:w-2/5">
                <img
                  src="https://codingcoach.io/static/contact-ba7a97dc3f4b9e2ec032e0374192c668.svg"
                  alt="Illustration"
                  style={{ width: "100%", maxWidth: "600px" }}
                />
              </div>
              <div className="md:flex-1 text-right md:flex md:flex-col md:items-end md:pl-16">
                <h3 className="leading-tight" style={{ width: "250px" }}>
                  Contact
                </h3>
                <p className="leading-normal">
                  We want to hear your thoughts! Feel free to send us an email
                  at webbyurvish@gmail.com
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
