import React, { useState, useEffect } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';

function Watchlist() {
  const [selectedStock, setSelectedStock] = useState({});
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    const newStockList = [{
      name: 'Microsoft',
      ticker: 'MSFT',
    }, {
      name: 'Google',
      ticker: 'GOOG',
    }, {
      name: 'Amazon',
      ticker: 'AMZN',
    }, {
      name: 'Apple',
      ticker: 'APPL',
    }];

    setStockList(newStockList);

    setSelectedStock(newStockList[0]);
  }, []);

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
  };

  return (
    <div>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            {stockList.map((stock) => (
              <Menu.Item
                key={stock.ticker}
                name={stock.name}
                active={selectedStock.ticker === stock.ticker}
                onClick={() => {
                  handleStockClick(stock);
                }}
              />
            ))}
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            Selected
            {' '}
            {selectedStock.name}
            {' '}
            with ticker(
            {selectedStock.ticker}
            )
          </Segment>
        </Grid.Column>
      </Grid>
    </div>

  );
}

export default Watchlist;
