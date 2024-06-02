import React, { useEffect, useState } from "react";
import "../../components/MentorPanel/styles/EditMentor.css";
import { Link } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Layout/Loading/Loading";
import UserWrapper from "./UserWrapper";
import {
  fetchCountries,
  fetchLanguages,
  fetchSkills,
} from "../../redux/slices/dataSlice";
import { addMentor } from "../../redux/slices/mentorsSlice";

export default function BecomeMentor() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.mentors.loading);

  const { skills, countries, languages } = useSelector((state) => state.data);

  // State variables
  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [errors, setErrors] = useState({
    titleError: "",
    countryError: "",
    aboutError: "",
    selectedLanguagesError: "",
    selectedSkillsError: "",
  });

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleLanguagesSelection = (selectedList, selectedItem) => {
    const ids = selectedList.map((item) => item.id);
    setSelectedLanguages(ids);
  };

  const handleSkillsSelection = (selectedList, selectedItem) => {
    const ids = selectedList.map((item) => item.id);
    setSelectedSkills(ids);
  };

  useEffect(() => {
    // Fetch all data for the form (countries, languages, and skills)
    dispatch(fetchCountries());
    dispatch(fetchLanguages());
    dispatch(fetchSkills());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    let valid = true;
    const newErrors = {
      titleError: "",
      countryError: "",
      aboutError: "",
      selectedLanguagesError: "",
      selectedSkillsError: "",
    };

    if (title.trim() === "") {
      newErrors.titleError = "Title is required";
      valid = false;
    }

    if (country === "") {
      newErrors.countryError = "Country is required";
      valid = false;
    }

    if (about.trim() === "") {
      newErrors.aboutError = "About is required";
      valid = false;
    } else if (about.length > 400) {
      newErrors.aboutError = "About must be less than 400 characters";
      valid = false;
    }

    if (selectedLanguages.length === 0) {
      newErrors.selectedLanguagesError = "Please select at least one language";
      valid = false;
    }

    if (selectedSkills.length === 0) {
      newErrors.selectedSkillsError = "Please select at least one skill";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Prepare mentor data object
    const mentorData = {
      name,
      title,
      about,
      email: user.email,
      country,
      languageIds: selectedLanguages,
      skillIds: selectedSkills,
      available: isChecked,
    };

    // Dispatch the action to add the mentor
    dispatch(addMentor(mentorData));

    // Reset the errors
    setErrors({
      titleError: "",
      countryError: "",
      aboutError: "",
      selectedLanguagesError: "",
      selectedSkillsError: "",
    });
  };

  return (
    <UserWrapper>
      <div className="mainwrapper">
        <ToastContainer />
        {!countries || !skills || !languages || loading ? (
          <Loading />
        ) : (
          <div className="editprofile">
            <div>
              <div className="edit-profile">
                <h2>Become a Mentor</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Name input (disabled) */}
                    <div className="col-lg-6">
                      <div className="profile-input">
                        <label htmlFor="text">
                          <p>Name </p>
                        </label>
                        <input
                          disabled
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                    </div>
                    {/* Mentor Title input */}
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
                        {errors.titleError && (
                          <p className="error">{errors.titleError}</p>
                        )}
                      </div>
                    </div>
                    {/* About textarea input */}
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
                        {errors.aboutError && (
                          <p className="error">{errors.aboutError}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile-input">
                        {/* Country input dropdown */}
                        <label htmlFor="text">Country</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={country}
                          onChange={handleCountryChange}
                        >
                          <option value="">Select your Country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        {errors.countryError && (
                          <p className="error">{errors.countryError}</p>
                        )}
                      </div>
                    </div>

                    {/* Multiselect for languages */}
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
                        {errors.selectedLanguagesError && (
                          <p className="error">
                            {errors.selectedLanguagesError}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Multiselect for skills */}
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
                        {errors.selectedSkillsError && (
                          <p className="error">{errors.selectedSkillsError}</p>
                        )}
                      </div>
                    </div>
                    {/* Email input (disabled) */}
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
                      Please define how would you like to drive the mentorship
                      and how many mentees you can take.
                    </span>

                    {/* Checkbox for user availability for mentorship */}
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
                      <button type="submit">Send Request</button>
                      <Link
                        to="javascript:void(0)"
                        onClick={() => window.history.back()}
                      >
                        Close
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserWrapper>
  );
}
