import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import createAxiosInstance from "../../Axios/axiosInstance";

const axiosInstance = createAxiosInstance();

// Async thunk for handling the submission of password change form
export const handleResetPasswordSubmit = createAsyncThunk(
  "passwordChange/submit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/account/changepassword",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for password change state management
const accountSlice = createSlice({
  name: "passwordChange",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleResetPasswordSubmit.pending, (state) => {
        // Set loading to true and clear any previous errors
        state.loading = true;
        state.error = null;
      })
      .addCase(handleResetPasswordSubmit.fulfilled, (state, action) => {
        // Set loading to false, clear error, and display success toast
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(handleResetPasswordSubmit.rejected, (state, action) => {
        // Set loading to false, set error message, and display error toast
        state.loading = false;
        state.error = action.payload.message;
        toast.error(action.payload.message);
      });
  },
});

export default accountSlice.reducer;
