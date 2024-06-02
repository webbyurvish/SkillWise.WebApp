import { createSlice } from "@reduxjs/toolkit";

// Set initial state for filters
const initialState = {
  technology: "", // Filter by technology
  country: "", // Filter by country
  name: "", // Filter by name
  spokenLanguage: "", // Filter by spoken language
  isLiked: false, // Filter by liked mentors
  isMostLiked: false, // Filter by most liked mentors
  isTopRated: false, // Filter by top rated mentors
};

// Create a filters slice for managing state
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTechnology: (state, action) => {
      // Update the technology filter value
      state.technology = action.payload;
    },
    setCountry: (state, action) => {
      // Update the country filter value
      state.country = action.payload;
    },
    setName: (state, action) => {
      // Update the name filter value
      state.name = action.payload;
    },
    setSpokenLanguage: (state, action) => {
      // Update the spoken language filter value
      state.spokenLanguage = action.payload;
    },
    setLiked: (state, action) => {
      // Update the isLiked filter value
      state.isLiked = action.payload;
    },
    setTopRated: (state, action) => {
      // Update the isTopRated filter value
      state.isTopRated = action.payload;
    },
    setMostLiked: (state, action) => {
      // Update the isMostLiked filter value
      state.isMostLiked = action.payload;
    },
    resetallfilters: (state, action) => {
      // Reset all filter values to their initial state
      state.technology = "";
      state.country = "";
      state.name = "";
      state.spokenLanguage = "";
      state.isLiked = false;
    },
  },
});

export const {
  setTechnology,
  setCountry,
  setName,
  setSpokenLanguage,
  setLiked,
  setMostLiked,
  setTopRated,
  resetallfilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
