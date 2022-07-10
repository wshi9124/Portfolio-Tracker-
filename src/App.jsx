import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Transfer from './pages/Transfer';
import Watchlist from './pages/Watchlist';
import NavBar from './commonComponents/NavBar';
import Logo from './commonComponents/Logo';

function App() {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    // fetch('https://www.cryptingup.com/api/markets')
    fetch('http://localhost:6002/markets')
      .then((res) => res.json())
      .then((data) => {
        setMarketData(data.markets);
      });
  }, []);

  return (
    <div className="App">
      <Logo />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home marketData={marketData} />} />
        <Route path="settings" element={<Settings />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="watchlist" element={<Watchlist marketData={marketData} />} />
      </Routes>
    </div>
  );
}

export default App;
