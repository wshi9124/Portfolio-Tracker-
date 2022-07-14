import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

function Logo() {
  return (
    <div className="logoDiv">
      <Header as="h2">
        <Icon name="chart line" style={{ fontSize: '170%' }} />
        <Header.Content className="headerAnimation">Portfolio Tracker</Header.Content>
      </Header>
    </div>
  );
}

export default Logo;
