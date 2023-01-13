import React, { useEffect } from "react";
import { selectToken } from "../features/songs/songsSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const Spoify = () => {
  const token = useSelector(selectToken);

  useEffect(() => {
    const getTracks = async () => {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: "rock",
          type: "track",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    };

    getTracks();
  }, []);

  return <div>Spoify</div>;
};

export default Spoify;
