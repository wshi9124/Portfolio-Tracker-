import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

function Logo() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '30px',
    }}
    >
      <Header as="h2">
        <Icon name="chart line" />
        <Header.Content>Portfolio Tracker</Header.Content>
      </Header>
    </div>
  );
}

export default Logo;
