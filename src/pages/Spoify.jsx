import React, { useEffect, useState } from "react";
import {
  fetchTracks,
  getTracksStatus,
  selectQuery,
  selectTracks,
  setQuery,
} from "../features/songs/songsSlice";
import { useDispatch, useSelector } from "react-redux";

const Spoify = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const tracks = useSelector(selectTracks);
  const status = useSelector(getTracksStatus);
  const query = useSelector(selectQuery);

  let content;
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTracks());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (query) {
      dispatch(fetchTracks());
    }
  }, [dispatch, query]);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    dispatch(setQuery(value));
  };

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    const newTracks = tracks.filter((track) => track.popularity > 0);
    content = newTracks.map((track) => (
      <div className='bg-green-300'>{track.name}</div>
    ));
  } else if (status === "failed") {
  }

  console.log(tracks);

  return (
    <div className='grid grid-cols-4 gap-6'>
      <input type='text' value={searchQuery} onChange={onChangeHandler} />
      {content}
    </div>
  );
};

export default Spoify;
