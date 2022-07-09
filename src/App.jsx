import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Transfer from './pages/Transfer';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
}

export default App;
