import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Menu, Segment, Search,
} from 'semantic-ui-react';

function Watchlist({ marketData }) {
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

    const searchedItem = marketData.filter((item) => item.base_asset.toLowerCase().includes(e.target.value.toLowerCase()) && item.quote_asset === 'USDT' && item.exchange_id === 'BINANCE');

    setSearchResult(searchedItem.map((item) => ({
      title: item.base_asset,
      price: `$${item.price}`,
    })));
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
      {searchBarComponent()}
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
        </Grid.Column>
      </Grid>
    </div>

  );
}

Watchlist.propTypes = {
  marketData: PropTypes.arrayOf(PropTypes.shape({
    base_asset: PropTypes.string,
    quote_asset: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};

export default Watchlist;
