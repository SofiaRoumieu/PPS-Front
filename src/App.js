import './App.css';
import { useContext, useEffect, useState } from "react";
import Ruteador from './components/Ruteador';
import Header from './components/header';

function App() {

  return (
      <div className="App" >
        <Header />
        <Ruteador />
      </div>
  );
}

export default App;
