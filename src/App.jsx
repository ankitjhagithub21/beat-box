import React, { useEffect, useState } from "react";
import "./App.css";
import Player from "./components/Player";
import Navbar from "./components/Navbar";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [songIndex, setSongIndex] = useState(null);
  const [pageNumber,setPageNumber] = useState(2)
  

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
  }, []);

  const onClickPrev = () =>{
    if(songIndex >= 1){
     setSongIndex(songIndex-1)
    }
 }

  const onClickNext = () =>{
     if(songIndex < songs.length-1){
      setSongIndex(songIndex+1)
     }else{
      setSongIndex(0)
     }
  }
  const onSongEnd = () =>{
    onClickNext();
  }



  
  return (
    <main className="w-full h-screen relative flex items-center justify-center">
      <Navbar/>
      <div className="max-w-6xl p-5 mx-auto">
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
            {songs.map((song,idx) => {
              return (
                <div key={song.id}  onClick={() => setSongIndex(idx)}>
                  <img
                    src={song.image[1].url}
                    alt={song.name}
                    className="rounded-lg border cursor-pointer w-full"
                  />
                  <p className="text-white text-sm p-1 whitespace-nowrap overflow-hidden">{song.name}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Player src={songs[songIndex]?.downloadUrl} onSongEnd={onSongEnd} onPrevButtonClick={onClickPrev}  onNextButtonClick={onClickNext}/>
    </main>
  );
};

export default App;
