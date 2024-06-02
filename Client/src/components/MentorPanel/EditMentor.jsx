import React, { useEffect, useState } from "react";
import "./styles/EditMentor.css";
import Multiselect from "multiselect-react-dropdown";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  getMentorDetails,
  updateMentorDetails,
} from "../../redux/slices/mentorSlice";
import {
  fetchCountries,
  fetchLanguages,
  fetchSkills,
} from "../../redux/slices/dataSlice";
import Loading from "../Layout/Loading/Loading";

// Edit mentor's detail component
export default function EditMentor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const { loading, languages, countries, skills } = useSelector(
    (state) => state.data
  );

  const mentor = useSelector((state) => state.mentor.details);

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(mentor.title);
  const [country, setCountry] = useState(mentor.country);
  const [about, setAbout] = useState(mentor.about);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleLanguagesSelection = (selectedList) => {
    const ids = selectedList.map((item) => item.id);
    setSelectedLanguages(ids);
  };

  const handleSkillsSelection = (selectedList) => {
    const ids = selectedList.map((item) => item.id);
    setSelectedSkills(ids);
  };

  useEffect(() => {
    dispatch(getMentorDetails(user.email));
    dispatch(fetchCountries());
    dispatch(fetchLanguages());
    dispatch(fetchSkills());
  }, [user.email]);

  if (!user) {
    navigate("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mentorData = {
      id: user.id,
      name,
      title: title.length > 0 ? title : null,
      about: about.length > 0 ? about : null,
      email: user.email,
      country,
      languageIds: selectedLanguages.length > 0 ? selectedLanguages : null,
      skillIds: selectedSkills.length > 0 ? selectedSkills : null,
      available: isChecked,
    };

    dispatch(updateMentorDetails({ mentorData, dispatch }));
    toast.success("details updated successfully");
  };

  return (
    <div className="mainwrapper">
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div className="editprofile">
          <div>
            <div className="edit-profile">
              <h2>Update Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="profile-input">
                      <label htmlFor="text">
                        <p>Name </p>(Please use your real name)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="profile-input">
                      <label htmlFor="text">
                        <p>Title </p>(e.g. Software Developer)
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="profile-input">
                      <label htmlFor="text">
                        <p>About </p>
                        (Up to 400 characters)
                      </label>
                      <textarea
                        name="text"
                        value={about}
                        onChange={(event) => setAbout(event.target.value)}
                        placeholder="brief about you..."
                        id=""
                        cols="30"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="profile-input">
                      <label htmlFor="text">Country</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={country}
                        onChange={handleCountryChange}
                      >
                        <option selected>Select your Country</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="multiSelect">
                      <label htmlFor="text">Spoken Languages</label>
                      <Multiselect
                        options={languages}
                        selectionLimit="5"
                        displayValue="name"
                        onSelect={handleLanguagesSelection}
                        onRemove={handleLanguagesSelection}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="multiSelect">
                      <label htmlFor="text">Skills (Up to 10)</label>

                      <Multiselect
                        options={skills}
                        selectionLimit="10"
                        displayValue="name"
                        onSelect={handleSkillsSelection}
                        onRemove={handleSkillsSelection}
                        className="multiSelect_field"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="profile-input">
                      <label htmlFor="text">
                        <p>Email </p>
                      </label>
                      <input disabled type="email" value={user.email} />
                    </div>
                  </div>
                </div>
                <div className="form-text">
                  <p>Available for new mentees</p>
                  <span>
                    Please define how would you like to drive the mentorship and
                    how many mentees you can take.
                  </span>
                  <div className="formcheckinput">
                    <label htmlFor="checkbox-text">
                      <input
                        type="checkbox"
                        name=""
                        id="checkbox-text"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      Available for new mentees
                    </label>
                  </div>

                  <div className="saveorclose-btn">
                    <button type="submit">Save</button>
                    <Link onClick={() => window.history.back()}>Close</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
