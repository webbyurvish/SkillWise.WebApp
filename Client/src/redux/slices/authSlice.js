import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { CometChat } from "@cometchat-pro/chat";
import createAxiosInstance from "../../Axios/axiosInstance";

// Create an instance of axios with interceptor
const axiosInstance = createAxiosInstance();

// Async thunk for user login
// export const loginUser = createAsyncThunk(
//   "loginuser",
//   async ({ credentials, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post("/account/login", credentials);
//       navigate("/");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// Async thunk for user sign up
export const signupUser = createAsyncThunk(
  "signupUser",
  async ({ userData, navigate }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("phoneNumber", userData.phoneNumber);
    try {
      const response = await axiosInstance.post("account/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for changing password
// export const changePassword = createAsyncThunk(
//   "changePassword",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(
//         "/account/changepassword",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// Initial state for user data
const initialState = {
  error: null,
  loading: false,
  user: null,
  isAuthenticated: false,
};

// Retrieve token from localStorage
const token =
  typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

// If token exists, decode it and store the data in the user
if (token) {
  const decodedToken = jwtDecode(token);
  initialState.user = decodedToken;
  initialState.isAuthenticated = true;
}

// Create a slice for user data management
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    logout: (state) => {
      // Clear user data, set loading and error to default values, remove token from localStorage
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(loginUser.pending, (state) => {
      //   // Set loading to true and clear any previous errors
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   // Set loading to false, clear error, set user data, store token in localStorage, and display success toast
      //   state.loading = false;
      //   state.error = null;
      //   state.isAuthenticated = true;
      //   state.user = jwtDecode(action.payload.token);
      //   localStorage.setItem("token", action.payload.token);
      //   toast.success("Login successful");
      // })
      // .addCase(loginUser.rejected, (state, action) => {
      //   // Set loading to false, set error message, set isAuthenticated to false, and display error toast
      //   state.loading = false;
      //   state.error = action.payload;
      //   state.isAuthenticated = false;
      //   toast.error(action.payload.message);
      // })
      .addCase(signupUser.pending, (state) => {
        // Set loading to true and clear any previous errors
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        // Set loading to false, clear error, set user data, store token in localStorage, and display success toast
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = jwtDecode(action.payload.token);
        localStorage.setItem("token", action.payload.token);
        toast.success("Signup successful");
      })
      .addCase(signupUser.rejected, (state, action) => {
        // Set loading to false, set error message, set isAuthenticated to false, and display error toast
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        toast.error(action.payload.message);
      })
    // .addCase(changePassword.pending, (state) => {
    //   // Set loading to true and clear any previous errors
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(changePassword.fulfilled, (state, action) => {
    //   // Set loading to false, clear error, and display success toast
    //   state.loading = false;
    //   state.error = null;
    //   toast.success("Password changed successfully");
    // })
    // .addCase(changePassword.rejected, (state, action) => {
    //   // Set loading to false, set error message, and display error toast
    //   state.loading = false;
    //   state.error = action.payload;
    //   toast.error(action.payload.message);
    // });
  },
});

// export const { logout } = dataSlice.actions;

// export const logoutUser = () => (dispatch) => {
//   // Dispatch logout action to clear user data
//   dispatch(logout());

//   // Perform logout from CometChat if needed
//   CometChat.logout().then(
//     () => {
//       console.log("Logout completed successfully");
//     },
//     (error) => {
//       console.log("Logout failed with exception:", { error });
//     }
//   );
// };

export default dataSlice.reducer;
