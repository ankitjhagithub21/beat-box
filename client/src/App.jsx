import "./App.css";
import Player from "./components/Player";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { Toaster} from "react-hot-toast";
import SongDetails from "./pages/SongDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useFetchUser from "./hooks/useFetchUser";

const App = () => {
  
useFetchUser()

  return (
    <main className="w-full min-h-screen relative flex items-center justify-center overflow-y-scroll py-24">
     <Toaster/>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/song/:name" element={<SongDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Player/>
      </BrowserRouter>
     
      
    </main>
  );
};

export default App;
