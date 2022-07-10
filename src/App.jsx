import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Transfer from './pages/Transfer';
import Watchlist from './pages/Watchlist';
import NavBar from './commonComponents/NavBar';
import Logo from './commonComponents/Logo';

function App() {
  const [marketData, setMarketData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();

  const changeToDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      document.getElementsByTagName('body')[0].style.backgroundColor = '#312f2f';
      Array.prototype.slice.call(document.getElementsByClassName('ui')).forEach((element) => {
        element.classList.add('inverted');
      });
    } else {
      document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
      Array.prototype.slice.call(document.getElementsByClassName('ui')).forEach((element) => {
        element.classList.remove('inverted');
      });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    changeToDarkMode(darkMode);
  });

  useEffect(() => {
    changeToDarkMode(darkMode);
  }, [location.pathname]);

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
        <Route path="settings" element={<Settings toggleDarkMode={toggleDarkMode} />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="watchlist" element={<Watchlist marketData={marketData} />} />
      </Routes>
    </div>
  );
}

export default App;
