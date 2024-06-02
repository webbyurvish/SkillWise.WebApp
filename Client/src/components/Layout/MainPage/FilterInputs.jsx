import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  handleNameChange,
  handleTechnologyChange,
  handleCountryChangeLayout,
  handleSpokenLanguageChange,
} from "../../../services/OnChangeHandlers";

//////////////////// ---- Filter Inputs component ---- ////////////////////

export default function FilterInputs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector((state) => state.filters);
  const result = useSelector((state) => state.result);
  const { skills, countries, languages } = useSelector((state) => state.data);

  return (
    <div>
      {/* //////////////////// ---- Technology Filter Input ---- //////////////////// */}

      <div className="filter-input">
        <label htmlFor="text">TECHNOLOGY</label>
        <input
          type="text"
          list="skills"
          value={filters.technology || ""}
          onChange={handleTechnologyChange(dispatch, navigate)}
        />
        <datalist id="skills">
          {skills.map((skill, index) => {
            return <option key={index} value={skill.name} />;
          })}
        </datalist>
      </div>

      {/* //////////////////// ---- Country Filter Input ---- //////////////////// */}

      <div className="filter-input">
        <label htmlFor="text">COUNTRY</label>
        <input
          type="text"
          list="countries"
          value={filters.country || ""}
          onChange={handleCountryChangeLayout(dispatch, navigate)}
        />
        <datalist id="countries">
          {countries.map((country, index) => {
            return <option key={index} value={country.name} />;
          })}
        </datalist>
      </div>

      {/* //////////////////// ---- Name Filter Input ---- //////////////////// */}

      <div className="filter-input">
        <label htmlFor="text">NAME</label>
        <input
          type="text"
          value={filters.name || ""}
          list="names"
          onChange={handleNameChange(dispatch, navigate)}
        />
        <datalist id="names">
          {result.mentors.map((mentor, index) => {
            return <option key={index} value={mentor.name} />;
          })}
        </datalist>
      </div>

      {/* //////////////////// ---- Language Filter Input ---- //////////////////// */}

      <div className="filter-input">
        <label htmlFor="text">LANGUAGE </label>
        <input
          type="text"
          list="languages"
          value={filters.spokenLanguage || ""}
          onChange={handleSpokenLanguageChange(dispatch, navigate)}
        />
        <datalist id="languages">
          {languages.map((language, index) => {
            return <option key={index} value={language.name} />;
          })}
        </datalist>
      </div>
    </div>
  );
}
