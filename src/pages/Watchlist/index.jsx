import React, { useState, useEffect } from 'react';
import {
  Grid, Menu, Segment, Search, Button, Item,
} from 'semantic-ui-react';
import { searchStock, getStockNews } from '../../libs/StockAPI';
import TopStocks from './TopStocks';
import BuyStockModal from '../../commonComponents/BuyStockModal';

let searchDebounceTimer;

function Watchlist() {
  const [selectedAsset, setSelectedAsset] = useState({});
  const [assetList, setAssetList] = useState([]);
  const [assetSymbolDict, setAssetSymbolDict] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [topList, setTopList] = useState([]);
  const [newsArray, setNewsArray] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6001/watchlist')
      .then((res) => res.json())
      .then((list) => {
        if (list && list.length) {
          setAssetList(list);
          setSelectedAsset(list[0]);

          list.forEach((item) => {
            assetSymbolDict[item.symbol] = true;
          });
          setAssetSymbolDict({ ...assetSymbolDict });
        }
      });

    fetch('http://localhost:6001/topList')
      .then((res) => res.json())
      .then((list) => {
        if (list && list.length) {
          setTopList(list);
        }
      });
  }, []);

  useEffect(() => {
    getStockNews(selectedAsset.symbol, (newsFromServer) => {
      setNewsArray(newsFromServer.slice(0, 10));
    });
  }, [selectedAsset]);

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      searchStock(e.target.value, (result) => {
        setSearchResult(result.map((item) => ({
          title: item.symbol,
          description: item.name,
        })));
      });
    }, 500);
  };

  const addToWatchList = (symbol) => {
    if (assetList.some((item) => item.symbol === symbol)) {
      return;
    }

    fetch('http://localhost:6001/watchlist', {
      method: 'POST',
      body: JSON.stringify({
        symbol,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((newlyAddedStock) => {
        setAssetList([...assetList, newlyAddedStock]);

        assetSymbolDict[newlyAddedStock.symbol] = true;
        setAssetSymbolDict({ ...assetSymbolDict });
      });
  };

  const deleteFromWatchList = (symbolId) => {
    if (!assetList.some((item) => item.id === symbolId)) {
      return;
    }

    assetList.forEach((item) => {
      if (item.id === symbolId) {
        delete assetSymbolDict[item.symbol];
        setAssetSymbolDict({ ...assetSymbolDict });
      }
    });
    const newAssetsList = assetList.filter((item) => item.id !== symbolId);
    setAssetList(newAssetsList);

    fetch(`http://localhost:6001/watchlist/${symbolId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (newAssetsList.length > 0) {
      setSelectedAsset(newAssetsList[0]);
    }
  };

  const handleResultSelect = (e, { result }) => {
    if (assetList.some((item) => item.symbol === result.title)) {
      setSearchValue('');
      return;
    }

    addToWatchList(result.title);

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
      <div style={{ margin: '15px' }}>{searchBarComponent()}</div>
      <Grid>
        <Grid.Column width={4}>
          <Menu
            fluid
            vertical
            tabular
            style={{
              height: '300px',
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
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
          <div>
            <BuyStockModal stockSymbol={selectedAsset.symbol ?? ''} />
            <Button
              content="Remove from Watchlist"
              secondary
              onClick={() => {
                deleteFromWatchList(selectedAsset.id);
              }}
            />
          </div>
          <Segment style={{
            height: '250px',
            overflow: 'auto',
          }}
          >
            <Item.Group
              items={newsArray.map((news) => (
                {
                  childKey: news.id,
                  image: news.image ?? '',
                  header: news.headline ?? '',
                  description: news.summary ?? '',
                  meta: `${news.source} | ${new Date(news.datetime)}`,
                  extra: news.url ?? '',
                }
              ))}
            />

          </Segment>
        </Grid.Column>
      </Grid>
      <TopStocks
        stockList={topList}
        assetSymbolDict={assetSymbolDict}
        addToWatchListFunc={(symbolToAdd) => {
          addToWatchList(symbolToAdd);
        }}
      />
    </div>
  );
}

export default Watchlist;
