import "./App.css";
import Player from "./components/Player";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SongDetails from "./pages/SongDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useFetchUser from "./hooks/useFetchUser";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { setCurrSong, setPageNumber, setSongIndex } from "./redux/slices/songSlice";

const App = () => {
  useFetchUser();

  const { songs, songIndex, pageNumber } = useSelector((state) => state.song);

  const dispatch = useDispatch();

  const onClickPrev = () => {
    if (songIndex >= 1) {
      dispatch(setSongIndex(songIndex - 1));
    }
    dispatch(setCurrSong(songs[songIndex]))

  };

  const onClickNext = () => {
    if (songIndex < songs.length - 1) {
      dispatch(setSongIndex(songIndex + 1));
    } else {
      dispatch(setPageNumber(pageNumber + 1));
    }
    dispatch(setCurrSong(songs[songIndex]))
  };
  const onSongEnd = () => {
    onClickNext();
  };

  return (
    <main className="w-full min-h-screen relative flex items-center justify-center overflow-y-scroll py-24">
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song/:name" element={<SongDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Player
          src={songs[songIndex]?.downloadUrl}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          onSongEnd={onSongEnd}
        />
      </BrowserRouter>
    </main>
  );
};

export default App;
