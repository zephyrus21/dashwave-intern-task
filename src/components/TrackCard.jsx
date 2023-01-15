import React from "react";

const TrackCard = ({ track, view, onClickCard }) => {
  const lineLength = 26;
  const style =
    view === "list"
      ? "flex flex-col justify-start gap-4 text-white bg-stone-700 p-5 drop-shadow-md rounded-lg hover:scale-105 duration-200 cursor-pointer"
      : "flex flex-row-reverse justify-end gap-4 items-center text-white bg-stone-700 p-3 drop-shadow-md rounded-lg hover:scale-[1.01] duration-200 cursor-pointer";

  return (
    <div className={style} onClick={onClickCard}>
      <div>
        <div>
          {track.name.length > lineLength && view === "list"
            ? track.name.substring(lineLength, 0).concat("...")
            : track.name}
        </div>
        <div>
          {track.album.name.length > lineLength && view === "list"
            ? track.album.name.substring(lineLength, 0).concat("...")
            : track.album.name}
        </div>
      </div>
      <img
        src={track.album.images[0].url}
        alt='album_image'
        className={`min-h-fit object-cover rounded-md ${
          view === "grid" && "h-16"
        }`}
      />
    </div>
  );
};

export default TrackCard;
