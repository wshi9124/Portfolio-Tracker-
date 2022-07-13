import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

function Logo() {
  return (
    <div className="logoTitle">
      <Header as="h2">
        <Icon name="chart line" />
        <Header.Content>Portfolio Tracker</Header.Content>
      </Header>
    </div>
  );
}

export default Logo;
