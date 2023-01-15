import React, { useEffect, useState } from "react";
import {
  fetchTracks,
  getCurrentTrack,
  getTracksStatus,
  selectQuery,
  selectToken,
  selectTracks,
  setCurrentTrack,
  setQuery,
} from "../features/songs/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import TrackCard from "../components/TrackCard";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";

const Spoify = () => {
  const dispatch = useDispatch();

  const [view, setView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [popularity, setPopularity] = useState("none");

  const token = useSelector(selectToken);
  const tracks = useSelector(selectTracks);
  const status = useSelector(getTracksStatus);
  const query = useSelector(selectQuery);
  const currentTrack = useSelector(getCurrentTrack);

  let content;
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTracks());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (query !== "") {
      dispatch(fetchTracks());
    }
  }, [dispatch, query]);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    if (value === "") {
      setSearchQuery("");
      dispatch(setQuery("rock"));
    } else {
      setSearchQuery(value);
      dispatch(setQuery(value));
    }
  };

  const onOptionChangeHandler = (event) => {
    setPopularity(event.target.value);
  };

  const onClickChangeView = () => {
    if (view === "grid") {
      setView("list");
    } else {
      setView("grid");
    }
  };

  const onSongClickHandler = (uri) => {
    dispatch(setCurrentTrack(uri));
  };

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    const newTracks = tracks.filter((track) => {
      if (popularity === "none") {
        return track;
      } else if (popularity === "low") {
        return track.popularity < 30;
      } else if (popularity === "med") {
        return track.popularity > 30 && track.popularity < 70;
      } else if (popularity === "high") {
        return track.popularity > 70;
      }
    });
    content = newTracks.map((track) => (
      <TrackCard
        key={track.id}
        track={track}
        view={view}
        onClickCard={() => onSongClickHandler(track.uri)}
      />
    ));
  } else if (status === "failed") {
    content = <p>Failed to load tracks</p>;
  }

  console.log(tracks);

  return (
    <>
      <div className='p-5 justify-start align-start bg-stone-800'>
        <div className='flex justify-between bg-stone-600 p-6 rounded-lg'>
          <input
            className='border drop-shadow-2xl rounded-lg border-slate-900 pl-5 w-72'
            type='text'
            value={searchQuery}
            onChange={onChangeHandler}
            placeholder='Search for tracks and artists...'
          />
          <div className='flex items-center gap-4'>
            <label htmlFor='popularity' className='text-lg text-white'>
              Popularity
            </label>
            <select
              name='popularity'
              onChange={onOptionChangeHandler}
              className='rounded-lg p-2 px-4'>
              <option value='none'>None</option>
              <option value='low'>Low</option>
              <option value='med'>Medium</option>
              <option value='high'>High</option>
            </select>
            <button
              className='bg-stone-500 text-white rounded-lg p-2 px-4'
              onClick={onClickChangeView}>
              {view} view
            </button>
          </div>
        </div>
        {view === "list" ? (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-6 py-6'>
            {content}
          </div>
        ) : (
          <div className='flex flex-col gap-6 py-6'>{content}</div>
        )}
      </div>
      <div className='fixed bottom-0 z-10 w-full'>
        <SpotifyWebPlayer
          token={token}
          uris={[currentTrack]}
          styles={{
            activeColor: "#fff",
            bgColor: "#333",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
        />
      </div>
    </>
  );
};

export default Spoify;
