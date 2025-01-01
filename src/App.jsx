import React, { useEffect, useState } from "react";
import "./App.css";
import Player from "./components/Player";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  
  
 

 

  return (
    <main className="w-full h-screen relative flex items-center justify-center">
      <Navbar />
      <Home/>
      <Player/> 
      
    </main>
  );
};

export default App;
