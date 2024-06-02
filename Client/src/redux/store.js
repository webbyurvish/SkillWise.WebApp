import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mentorReducer from "./slices/mentorSlice";
import resultReducer from "./slices/resultSlice";
import dataReducer from "./slices/dataSlice";
import filterReducer from "./slices/filterSlice";
import mentorsReducer from "./slices/mentorsSlice";
import accountReducer from "./slices/accountSlice";
import likeRatingReducer from "./slices/likeratingSlice";
import videoReducer from "./slices/videoSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  mentor: mentorReducer,
  mentors: mentorsReducer,
  result: resultReducer,
  data: dataReducer,
  filters: filterReducer,
  account: accountReducer,
  likeRating: likeRatingReducer,
  video: videoReducer,
});

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "mentor",
    "result",
    "data",
    "filters",
    "mentors",
    "likeRating",
    "video",
  ],
};

// Create a persisted reducer with Redux Persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with persisted reducer and middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the Redux persistor for persisting store state
const persistor = persistStore(store);

// Export the store and persistor
export { store, persistor };
