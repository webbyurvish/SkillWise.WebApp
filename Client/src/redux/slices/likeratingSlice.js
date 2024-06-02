import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchData } from "./resultSlice";
import createAxiosInstance from "../../Axios/axiosInstance";

const axiosInstance = createAxiosInstance();

// Thunk for submitting a rating
export const submitRating = createAsyncThunk(
  "ratings/submit",
  async (
    { userId, mentorId, filters, currentPage, dispatch, comment, stars },
    { rejectWithValue }
  ) => {
    const data = {
      userId,
      mentorId,
      comment,
      stars,
    };

    try {
      const response = await axiosInstance.post("/rating", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(
        fetchData({
          technology: filters.technology,
          country: filters.country,
          name: filters.name,
          spokenLanguage: filters.spokenLanguage,
          currentPage,
          isLiked: filters.isLiked,
          userId,
        })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for adding a like
export const addLike = createAsyncThunk(
  "like/submit",
  async (
    { userId, mentorId, filters, currentPage, dispatch },
    { rejectWithValue }
  ) => {
    const data = { userId, mentorId };

    try {
      const response = await axiosInstance.post("/like", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(
        fetchData({
          technology: filters.technology,
          country: filters.country,
          name: filters.name,
          spokenLanguage: filters.spokenLanguage,
          currentPage,
          isLiked: filters.isLiked,
          userId,
        })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for managing like and rating state
const likeratingSlice = createSlice({
  name: "likerating",
  initialState: {
    error: null, // Error message
    loading: false, // Loading state indicator
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitRating.pending, (state) => {
        // Set loading state when submitting a rating
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        // Reset loading state and display success toast when rating is submitted
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(submitRating.rejected, (state, action) => {
        // Reset loading state and display error toast when rating submission fails
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })
      .addCase(addLike.pending, (state) => {
        // Set loading state when adding a like
        state.loading = true;
        state.error = null;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        // Reset loading state when like is added
        state.loading = false;
        state.error = null;
      })
      .addCase(addLike.rejected, (state, action) => {
        // Reset loading state and set error when adding like fails
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likeratingSlice.reducer;
