import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="home"
        active={location.pathname.split('/')[1] === ''}
        onClick={() => {
          navigate('/', { replace: true });
        }}
      />
      <Menu.Item
        name="watchlist"
        active={location.pathname.split('/')[1] === 'watchlist'}
        onClick={() => {
          navigate('/watchlist', { replace: true });
        }}
      />
      <Menu.Item
        name="transfer"
        active={location.pathname.split('/')[1] === 'transfer'}
        onClick={() => {
          navigate('/transfer', { replace: true });
        }}
      />
      <Menu.Item
        name="settings"
        active={location.pathname.split('/')[1] === 'settings'}
        onClick={() => {
          navigate('/settings', { replace: true });
        }}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          onClick={() => {

          }}
        />
      </Menu.Menu>
    </Menu>
  );
}

export default NavBar;
