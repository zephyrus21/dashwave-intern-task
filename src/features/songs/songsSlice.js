import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  token: null,
  error: null,
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setToken: {
      reducer(state, action) {
        state.token = action.payload;
      },
      prepare(token) {
        return { payload: token };
      },
    },
  },
});

export const selectAllSongs = (state) => state.songs.songs;
export const selectToken = (state) => state.songs.token;

export const { setToken } = songsSlice.actions;

export default songsSlice.reducer;
