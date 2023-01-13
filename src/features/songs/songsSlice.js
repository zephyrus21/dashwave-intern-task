import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tracks: [],
  status: "idle",
  token: null,
  error: null,
};

export const fetchTracks = createAsyncThunk(
  "songs/fetchTracks",
  async (arg, { getState }) => {
    const state = getState();

    const response = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: "rock",
        type: "track",
      },
      headers: {
        Authorization: `Bearer ${state.songs.token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.tracks.items;
  }
);

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
    setTracks: {
      reducer(state, action) {
        state.tracks.push(action.payload);
      },
      prepare(tracks) {
        return { payload: tracks };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTracks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.tracks.push(action.payload);
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectTracks = (state) => state.songs.tracks[0];
export const selectToken = (state) => state.songs.token;
export const getTracksStatus = (state) => state.songs.status;

export const { setToken, setTracks } = songsSlice.actions;

export default songsSlice.reducer;
