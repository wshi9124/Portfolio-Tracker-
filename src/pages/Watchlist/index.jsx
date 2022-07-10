import React, { useState, useEffect } from 'react';
import {
  Grid, Menu, Segment, Search, Item, Header, Button,
} from 'semantic-ui-react';
import { searchStock } from '../../libs/StockAPI';

function Watchlist() {
  const [selectedAsset, setSelectedAsset] = useState({});
  const [assetList, setAssetList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6001/watchlist')
      .then((res) => res.json())
      .then((list) => {
        setAssetList(list);

        setSelectedAsset(list[0]);
      });
  }, []);

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);

    searchStock(e.target.value, (result) => {
      setSearchResult(result.map((item) => ({
        title: item.symbol,
        description: item.name,
      })));
    });
  };

  const handleResultSelect = (e, { result }) => {
    if (assetList.some((item) => item.symbol === result.title)) {
      setSearchValue('');
      return;
    }

    setAssetList([...assetList, {
      symbol: result.title,
    }]);

    fetch('http://localhost:6001/watchlist', {
      method: 'POST',
      body: JSON.stringify({
        symbol: result.title,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    setSearchValue('');
  };

  const stockListWithDescriptions = () => (
    <Item.Group>
      {assetList.map((stock) => (
        <Item key={stock.symbol}>
          <Item.Image size="small" src={stock.image} />

          <Item.Content>
            <Item.Header as="a">{stock.description}</Item.Header>
            <Item.Description>
              <p>{stock.symbol}</p>
              <p>
                {stock.price}
              </p>
            </Item.Description>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );

  const searchBarComponent = () => (
    <Search
      input={{ icon: 'search', iconPosition: 'left' }}
      placeholder="Search..."
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={searchResult}
      value={searchValue}
    />
  );

  return (
    <div>
      <Header
        as="h2"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30px',
        }}
      >
        Top: 100 Stocks

      </Header>
      <div style={{ marginTop: '15px', marginBottom: '15px' }}>{stockListWithDescriptions()}</div>
      <div style={{ margin: '15px' }}>{searchBarComponent()}</div>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            {assetList.map((asset) => (
              <Menu.Item
                key={asset.symbol}
                name={asset.symbol}
                active={selectedAsset.symbol === asset.symbol}
                onClick={() => {
                  handleAssetClick(asset);
                }}
              />
            ))}
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            Selected
            {' '}
            {selectedAsset.symbol}
          </Segment>
          <div>
            <Button content="Add to Portfolio" primary />
            <Button content="Remove from Watchlist" secondary />
          </div>
        </Grid.Column>
      </Grid>
    </div>

  );
}

export default Watchlist;
