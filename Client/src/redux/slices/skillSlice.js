import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import createAxiosInstance from "../../Axios/axiosInstance";

const axiosInstance = createAxiosInstance();

// Async thunk action for updating mentor details
export const updateMentorDetails = createAsyncThunk(
  "mentor/update",
  async ({ mentorData, dispatch }, { rejectWithValue }) => {
    try {
      // Send PUT request to update mentor details
      await axiosInstance.put("/mentors/update", mentorData);

      // Dispatch action to fetch updated mentor details
      dispatch(getMentorDetails(mentorData.email));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action for fetching mentor details
export const getMentorDetails = createAsyncThunk(
  "mentor/get",
  async (email, { rejectWithValue }) => {
    try {
      // Send GET request to fetch mentor details
      const response = await axiosInstance.get(`/mentors/get/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    details: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMentorDetails.pending, (state) => {
        // Set loading state when updating mentor details
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMentorDetails.fulfilled, (state, action) => {
        // Reset loading state and display success message
        state.loading = false;
        state.error = null;
        toast.success(action.payload);
      })
      .addCase(updateMentorDetails.rejected, (state, action) => {
        // Reset loading state and display error message
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getMentorDetails.pending, (state) => {
        // Set loading state when fetching mentor details
        state.loading = true;
        state.error = null;
      })
      .addCase(getMentorDetails.fulfilled, (state, action) => {
        // Reset loading state and store fetched mentor details
        state.loading = false;
        state.error = null;
        state.details = action.payload;
      })
      .addCase(getMentorDetails.rejected, (state, action) => {
        // Reset loading state and display error message when fetching mentor details fails
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mentorSlice.reducer;
