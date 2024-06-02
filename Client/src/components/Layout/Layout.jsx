import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Layout.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { fetchData } from "../../redux/slices/resultSlice";
import Loading from "./Loading/Loading";
import {
  fetchCountries,
  fetchSkills,
  fetchLanguages,
} from "../../redux/slices/dataSlice";

import Social from "./MainPage/Social";
import FilterInputs from "./MainPage/FilterInputs";
import ToggleFilter from "./MainPage/ToggleFilter";

//////////////////// ---- Layout component with header and sidebar ---- ////////////////////

export const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const result = useSelector((state) => state.result);
  const user = useSelector((state) => state.auth.user);
  const {
    technology,
    country,
    name,
    spokenLanguage,
    isLiked,
    isMostLiked,
    isTopRated,
  } = useSelector((state) => state.filters);
  const filters = useSelector((state) => state.filters);

  const { currentPage } = useSelector((state) => state.data);

  const userId = user !== null ? Number(user.id) : null;

  //////////////////// ---- Fetch Data whenever any filters field is change including toggle filters ---- ////////////////////

  useEffect(() => {
    dispatch(
      fetchData({
        technology,
        country,
        name,
        spokenLanguage,
        currentPage,
        isLiked,
        userId,
        isMostLiked,
        isTopRated,
      })
    );
  }, [filters, currentPage, dispatch]);

  //////////////////// ---- Fetch countries , languages and skills for dropdown ---- ////////////////////

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchLanguages());
    dispatch(fetchSkills());
  }, []);

  return (
    <div>
      <ToastContainer />
      {!result.mentors ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Header />
          <div className="main-cover">
            <div className="container-fluid">
              <div className="fixed-menu">
                <div className="title-text">
                  <h3>FILTER</h3>
                  <p>{result.mentors.length} MENTORS</p>
                </div>
                <form>
                  <div className="fillter-cover">
                    {/* ----- Filter inputs ----- */}
                    <FilterInputs />
                  </div>
                </form>

                {/* ----- Toggle filters ----- */}
                <ToggleFilter />

                {/* ----- Social links ----- */}
                <Social />
              </div>

              {/* ----- Children components ----- */}
              <div className="right-side-section">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mentor-card">
                      <div>{children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
