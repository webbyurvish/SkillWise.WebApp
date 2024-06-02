import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { batch } from "react-redux";
import createAxiosInstance from "../../Axios/axiosInstance";
import { extractUsername } from "../../services/MentorServices";

const axiosInstance = createAxiosInstance();

const CometChatUrl = process.env.REACT_APP_COMETCHAT_URL;

// Thunk action to add a mentor
export const addMentor = createAsyncThunk(
  "mentors/add",
  async (mentorData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/mentors/add", mentorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to approve a request
export const approveRequest = createAsyncThunk(
  "requests/approve",
  async (email) => {
    try {
      const response = await axiosInstance.put(
        "/admin/approve",
        JSON.stringify(email)
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Thunk action to reject a request
export const rejectRequest = createAsyncThunk(
  "requests/reject",
  async ({ email, rejectmessage }) => {
    try {
      const response = await axiosInstance.delete("/admin/reject", {
        data: { email, rejectmessage },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);

// Thunk action to delete a mentor
export const DeleteMentor = createAsyncThunk(
  "requests/reject",
  async ({ email, rejectmessage }) => {
    try {
      const response = await axiosInstance.delete("/admin/reject", {
        data: { email, rejectmessage },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);

// Thunk action to delete a mentor permanently
export const DeleteMentorPermanent = createAsyncThunk(
  "mentor/delete",
  async ({ email, navigate, dispatch }) => {
    try {
      const response = await axiosInstance.delete("/mentors/delete", {
        data: email,
      });
      dispatch(DeleteCometChatUser(email));
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  }
);

// Thunk action to delete a Comet Chat user
export const DeleteCometChatUser = (email) => {
  const authKey = process.env.REACT_APP_COMETCHAT_API_KEY;
  const uid = extractUsername(email);
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      apikey: authKey,
    },
    body: JSON.stringify({ permanent: true }),
  };

  fetch(`${CometChatUrl}/${uid}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

// Thunk action to fetch mentor requests
export const fetchRequests = createAsyncThunk(
  "requests/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/requests");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const mentorsSlice = createSlice({
  name: "mentors",
  initialState: {
    requests: [],
    mentors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMentor.pending, (state) => {
        // Set loading state when adding a mentor
        state.loading = true;
        state.error = null;
      })
      .addCase(addMentor.fulfilled, (state, action) => {
        // Reset loading state and display success toast when mentor is added
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(addMentor.rejected, (state, action) => {
        // Reset loading state and display error toast when adding mentor fails
        state.loading = false;
        state.error = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(fetchRequests.pending, (state) => {
        // Set loading state when fetching mentor requests
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        // Reset loading state and store fetched mentor requests
        state.loading = false;
        state.error = null;
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        // Reset loading state and set error when fetching mentor requests fails
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveRequest.pending, (state, action) => {
        // Set loading state when approving a request
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        // Reset loading state, display success toast, and remove approved request from the list
        state.loading = false;
        state.error = null;

        batch(() => {
          toast.success(action.payload.message);
          state.requests = state.requests.filter(
            (request) => request.email !== action.meta.arg
          );
        });
      })
      .addCase(approveRequest.rejected, (state, action) => {
        // Reset loading state and display error toast when approving request fails
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })
      .addCase(rejectRequest.pending, (state, action) => {
        // Set loading state when rejecting a request
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        // Reset loading state, display success toast, and remove rejected request from the list
        state.loading = false;
        state.error = null;
        batch(() => {
          toast.success(action.payload.message);
          state.requests = state.requests.filter(
            (request) => request.email !== action.meta.arg.email
          );
        });
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        // Reset loading state and display error toast when rejecting request fails
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })
      .addCase(DeleteMentorPermanent.pending, (state, action) => {
        // Set loading state when deleting a mentor permanently
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteMentorPermanent.fulfilled, (state, action) => {
        // Reset loading state and display success toast when mentor is deleted permanently
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(DeleteMentorPermanent.rejected, (state, action) => {
        // Reset loading state and display error toast when deleting mentor permanently fails
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default mentorsSlice.reducer;
