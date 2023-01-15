import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tracks: [],
  status: "idle",
  token: null,
  error: null,
  query: "rock",
  currentTrack: "spotify:track:0e7ipj03S05BNilyu5bRzt",
};

export const fetchTracks = createAsyncThunk(
  "songs/fetchTracks",
  async (arg, { getState }) => {
    const state = getState();

    const response = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: `${state.songs.query}`,
        type: "track,artist",
        limit: 50,
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
    setQuery: {
      reducer(state, action) {
        state.query = action.payload;
      },
      prepare(query) {
        return { payload: query };
      },
    },
    setCurrentTrack: {
      reducer(state, action) {
        state.currentTrack = action.payload;
      },
      prepare(currentTrack) {
        return { payload: currentTrack };
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

        if (state.tracks.length > 0) state.tracks.pop();

        state.tracks.push(action.payload);
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectTracks = (state) => state.songs.tracks[0];
export const selectToken = (state) => state.songs.token;
export const selectQuery = (state) => state.songs.query;
export const getTracksStatus = (state) => state.songs.status;
export const getCurrentTrack = (state) => state.songs.currentTrack;

export const { setToken, setTracks, setQuery, setCurrentTrack } =
  songsSlice.actions;

export default songsSlice.reducer;
