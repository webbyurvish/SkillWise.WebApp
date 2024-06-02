import { setCurrentPage } from "../redux/slices/dataSlice";
import {
  setCountry,
  setLiked,
  setMostLiked,
  setName,
  setSpokenLanguage,
  setTechnology,
  setTopRated,
} from "../redux/slices/filterSlice";

//////////////////// ---- country change handler ---- ////////////////////

export const handleCountryChange = (dispatch, country, navigate) => {
  dispatch(setCurrentPage(1));
  navigate("/");
  dispatch(setCountry(country));
};

//////////////////// ---- name change handler ---- ////////////////////

export const handleNameChange = (dispatch, navigate) => (e) => {
  const selectedName = e.target.value;
  dispatch(setCurrentPage(1));
  navigate("/");
  dispatch(setName(selectedName !== "" ? selectedName : null));
};

//////////////////// ---- technology change handler ---- ////////////////////

export const handleTechnologyChange = (dispatch, navigate) => (e) => {
  const selectedTechnology = e.target.value;
  dispatch(setCurrentPage(1));
  navigate("/");
  dispatch(
    setTechnology(selectedTechnology !== "" ? selectedTechnology : null)
  );
};

//////////////////// ---- country change handler for filter ---- ////////////////////

export const handleCountryChangeLayout = (dispatch, navigate) => (e) => {
  const selectedCountry = e.target.value;
  dispatch(setCurrentPage(1));
  navigate("/");
  dispatch(setCountry(selectedCountry !== "" ? selectedCountry : null));
};

//////////////////// ---- favourites / liked change handler ---- ////////////////////

export const handleLikedChange = (dispatch, navigate) => (e) => {
  const checked = e.target.checked; // Use checked instead of value
  navigate("/");
  dispatch(setCurrentPage(1));
  dispatch(setLiked(checked));
  dispatch(setMostLiked(false));
  dispatch(setTopRated(false));
};

//////////////////// ---- most liked change handler ---- ////////////////////

export const handleMostLikedChange = (dispatch, navigate) => (e) => {
  const checked = e.target.checked; // Use checked instead of value
  navigate("/");
  dispatch(setCurrentPage(1));
  dispatch(setMostLiked(checked));
  dispatch(setLiked(false));
  dispatch(setTopRated(false));
};

//////////////////// ---- top rated change handler ---- ////////////////////

export const handleTopRatedChange = (dispatch, navigate) => (e) => {
  const checked = e.target.checked; // Use checked instead of value
  navigate("/");
  dispatch(setCurrentPage(1));
  dispatch(setTopRated(checked));
  dispatch(setMostLiked(false));
  dispatch(setLiked(false));
};

//////////////////// ---- spoken language change handler ---- ////////////////////

export const handleSpokenLanguageChange = (dispatch, navigate) => (e) => {
  const selectedSpokenLanguage = e.target.value;
  dispatch(setCurrentPage(1));
  navigate("/");
  dispatch(
    setSpokenLanguage(
      selectedSpokenLanguage !== "" ? selectedSpokenLanguage : null
    )
  );
};
