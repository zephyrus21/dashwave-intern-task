import React from "react";

const Login = () => {
  const handleClick = () => {
    const clientId = "0e474b74666447d49ae0d1d42af1c549";
    const redirectUri = "https://dashwave-intern-task.vercel.app/";
    // const redirectUri = "http://localhost:5173/";
    const apiUri = "https://accounts.spotify.com/authorize";
    const scopes = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "app-remote-control",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
      "user-library-modify",
      "user-library-read",
    ];
    const url = `${apiUri}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      " "
    )}&response_type=token&show_dialog=true`;
    window.location.href = url;
  };

  return (
    <div className='flex flex-col items-center justify-center gap-6 bg-green-500 h-screen'>
      <img
        className='h-[30vh]'
        src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png'
        alt='Spotify Logo'
      />
      <button
        className='bg-black p-6 text-green-300 rounded-full text-xl'
        onClick={handleClick}>
        Connect Spotify
      </button>
    </div>
  );
};

export default Login;
