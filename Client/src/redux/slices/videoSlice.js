import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import youtubeApi from "../../services/YoutubeServices";

// Async thunk action for fetching videos based on search term
export const fetchVideos = createAsyncThunk(
  "results/fetchVideos",
  async (searchTerm, { rejectWithValue }) => {
    try {
      // Send GET request to YouTube Data API to search for videos
      const response = await youtubeApi.get("/search", {
        params: {
          q: searchTerm,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    searchTerm: "",
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      // Set the search term in the state
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        // Set loading state when fetching videos
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        // Reset loading state and store fetched videos
        state.loading = false;
        state.error = null;
        state.videos = action.payload.items;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        // Reset loading state and store error message when fetching videos fails
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = videoSlice.actions;

export default videoSlice.reducer;
