import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      Home
      <div><Link to="/settings">Settings</Link></div>
      <div><Link to="/transfer">Transfer</Link></div>
      <div><Link to="/watchList">Watchlist</Link></div>
    </div>
  );
}

export default Home;
