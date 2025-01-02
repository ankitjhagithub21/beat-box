import React from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import Loader from "../components/Loader";
import useFetchSongs from "../hooks/useFetchSongs";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber, setSongIndex } from "../redux/slices/songSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useFetchSongs()
  const {songs,loading,pageNumber} = useSelector(state=>state.song)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSongClick = (idx,name) => {

    dispatch(setSongIndex(idx))
    const slug = name.split(" ").join("-")
    navigate(`/song/${slug}`)
  }
  return (
    <div className="max-w-6xl p-5 mx-auto ">
      {loading ? (
       <Loader/>
      ) : (
        <div className="grid lg:grid-cols-6 grid-cols-3 gap-3">
          {songs.map((song, idx) => {
            return (
              <div key={song.id} onClick={() => onSongClick(idx,song.name)}>
                <div className="relative">
                  <img
                    src={song.image}
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
            onClick={() => dispatch(setPageNumber(pageNumber > 1 ? pageNumber - 1 : 0))}
          />
          <FaArrowCircleRight
            color="#1ED760"
            className="cursor-pointer"
            onClick={() => dispatch(setPageNumber(pageNumber + 1))}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
