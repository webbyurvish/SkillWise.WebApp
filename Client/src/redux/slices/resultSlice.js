import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";
import createAxiosInstance from "../../Axios/axiosInstance";
import { calculateAverageRating } from "../../services/MentorServices";

const axiosInstance = createAxiosInstance();

// Async thunk action to fetch mentor data
export const fetchData = createAsyncThunk(
  "results/fetchData",
  async (
    {
      technology,
      country,
      name,
      spokenLanguage,
      currentPage,
      isLiked,
      userId,
      isMostLiked,
      isTopRated,
    },
    { rejectWithValue }
  ) => {
    try {
      const params = {
        technology,
        country,
        name,
        spokenLanguage,
        pageNumber: currentPage,
        pageSize: 3,
        isLiked,
        userId,
      };

      // Remove empty or null parameters from the params object
      Object.keys(params).forEach((key) => {
        if (params[key] === "" || params[key] === null) {
          delete params[key];
        }
      });

      const queryString = qs.stringify(params, { encode: false });

      // Remove pageSize parameter from the queryString
      const modifiedQueryString = queryString.replace(
        /(^|&)pageSize=([^&]*)(&|$)/,
        "$1"
      );

      const url = `/mentors${
        modifiedQueryString ? `?${modifiedQueryString}` : ""
      }`;

      const response = await axiosInstance.get(url);
      let mentors = null;

      if (isMostLiked) {
        mentors = response.data.items
          .filter((item) => item.userId !== userId)
          .sort((a, b) => b.likes.length - a.likes.length);
      } else {
        mentors = response.data.items.filter((item) => item.userId !== userId);
      }

      if (isTopRated) {
        mentors.sort((a, b) => {
          // Calculate the average rating for mentor 'a'
          const averageRatingA = calculateAverageRating(a.ratings);

          // Calculate the average rating for mentor 'b'
          const averageRatingB = calculateAverageRating(b.ratings);

          // Compare the average ratings
          if (averageRatingA > averageRatingB) {
            return -1; // 'a' comes before 'b'
          } else if (averageRatingA < averageRatingB) {
            return 1; // 'b' comes before 'a'
          } else {
            return 0; // No change in order
          }
        });
      }

      const totalPageCount = response.data.totalPages;

      // Update URL with query parameters
      const newUrl = `${window.location.origin}${window.location.pathname}${
        modifiedQueryString ? `?${modifiedQueryString}` : ""
      }`;

      window.history.replaceState(null, null, newUrl);

      return { mentors, totalPageCount };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const resultSlice = createSlice({
  name: "results",
  initialState: {
    mentors: [],
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setMentors: (state, action) => {
      state.mentors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        // Set loading state when fetching mentor data
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        // Reset loading state and store fetched mentor data
        state.loading = false;
        state.error = null;
        state.mentors = action.payload.mentors;
        state.totalPages = action.payload.totalPageCount;
      })
      .addCase(fetchData.rejected, (state, action) => {
        // Reset loading state and display error message when fetching mentor data fails
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default resultSlice.reducer;
