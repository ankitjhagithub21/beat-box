import React, { useEffect, useState } from "react";
import "./App.css";
import Player from "./components/Player";
import Navbar from "./components/Navbar";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [songIndex, setSongIndex] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const apiUrl = `https://saavn.dev/api/search/songs?query="latest"&page=${pageNumber}`;

  useEffect(() => {
    const getAllSongs = async () => {
      setLoading(true);
      try {
        const res = await fetch(apiUrl);
        const { data } = await res.json();
        setSongs(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllSongs();
  }, [pageNumber]);

  const onClickPrev = () => {
    if (songIndex >= 1) {
      setSongIndex(songIndex - 1);
    }
  };

  const onClickNext = () => {
    if (songIndex < songs.length - 1) {
      setSongIndex(songIndex + 1);
    } else {
      setSongIndex(0);
    }
  };
  const onSongEnd = () => {
    onClickNext();
  };

  return (
    <main className="w-full h-screen relative flex items-center justify-center">
      <Navbar />
      <div className="max-w-6xl p-5 mx-auto ">
        {loading ? (
          <div className="grid lg:grid-cols-6 grid-cols-3 justify-items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => {
              return (
                <div className="p-2 animate-pulse" key={index}>
                  <div className="h-24 lg:h-32 lg:w-32 w-24 bg-gray-200 rounded-lg"></div>
                  <div className="h-3 mt-0.5  bg-gray-200 rounded"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid lg:grid-cols-6 grid-cols-3 gap-3">
            {songs.map((song, idx) => {
              return (
                <div key={song.id} onClick={() => setSongIndex(idx)}>
                  <div className="relative">
                    <img
                      src={song.image[1].url}
                      alt={song.name}
                      className="rounded-lg border cursor-pointer w-full"
                    />
                  </div>

                  <p className="text-white text-sm p-1 whitespace-nowrap overflow-hidden">
                    {song.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {songs.length > 0 && (
          <div className="flex items-center justify-center mt-5 text-3xl gap-5">
            <FaArrowCircleLeft
              color="#1ED760"
              className="cursor-pointer"
              onClick={() => setPageNumber(pageNumber > 1 ? pageNumber - 1 : 0)}
            />
            <FaArrowCircleRight
              color="#1ED760"
              className="cursor-pointer"
              onClick={() => setPageNumber(pageNumber + 1)}
            />
          </div>
        )}
      </div>

      <Player
        src={songs[songIndex]?.downloadUrl}
        onSongEnd={onSongEnd}
        onPrevButtonClick={onClickPrev}
        onNextButtonClick={onClickNext}
      />
    </main>
  );
};

export default App;
