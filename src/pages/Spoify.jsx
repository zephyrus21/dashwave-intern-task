import React, { useEffect } from "react";
import {
  fetchTracks,
  getTracksStatus,
  selectTracks,
} from "../features/songs/songsSlice";
import { useDispatch, useSelector } from "react-redux";

const Spoify = () => {
  const dispatch = useDispatch();

  const tracks = useSelector(selectTracks);
  const status = useSelector(getTracksStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTracks());
    }
  }, [dispatch, status]);

  let content;
  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    console.log("tracks", tracks);
    content = tracks.map((track) => <div>{track.name}</div>);
  } else if (status === "failed") {
  }
  return <div>{content}</div>;
};

export default Spoify;
