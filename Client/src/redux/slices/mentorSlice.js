import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import createAxiosInstance from "../../Axios/axiosInstance";

const axiosInstance = createAxiosInstance();

// Thunk for updating mentor details
export const updateMentorDetails = createAsyncThunk(
  "mentor/update",
  async ({ mentorData, dispatch }, { rejectWithValue }) => {
    try {
      await axiosInstance.put("/mentors/update", mentorData);
      dispatch(getMentorDetails(mentorData.email));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for getting mentor details
export const getMentorDetails = createAsyncThunk(
  "mentor/get",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/mentors/get/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for managing mentor state
const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    details: null, // Mentor details
    error: null, // Error message
    loading: false, // Loading state indicator
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
        // Reset loading state and display success toast when mentor details are updated
        state.loading = false;
        state.error = null;
        toast.success(action.payload);
      })
      .addCase(updateMentorDetails.rejected, (state, action) => {
        // Reset loading state and display error toast when updating mentor details fails
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getMentorDetails.pending, (state) => {
        // Set loading state when getting mentor details
        state.loading = true;
        state.error = null;
      })
      .addCase(getMentorDetails.fulfilled, (state, action) => {
        // Reset loading state and store mentor details when mentor details are fetched
        state.loading = false;
        state.error = null;
        state.details = action.payload;
      })
      .addCase(getMentorDetails.rejected, (state, action) => {
        // Reset loading state and set error when getting mentor details fails
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mentorSlice.reducer;
