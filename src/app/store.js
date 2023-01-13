import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "../features/songs/songsSlice";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
});
