import "./App.css";
import Player from "./components/Player";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import SongDetails from "./pages/SongDetails";

const App = () => {
  

  return (
    <main className="w-full h-screen relative flex items-center justify-center">
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/song/:name" element={<SongDetails/>}/>
      </Routes>
      </BrowserRouter>
      <Player/> 
      
    </main>
  );
};

export default App;
