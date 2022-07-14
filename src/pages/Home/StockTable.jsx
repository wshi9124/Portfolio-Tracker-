import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import BuyStockModal from '../../commonComponents/BuyStockModal';
import SellStockModal from '../../commonComponents/SellStockModal';
import { currencyFormat } from '../../libs/Util';

function StockTable({ assetList, setAssetList, stockPriceDict }) {
  const didBoughtStock = (stockInfo) => {
    setAssetList(assetList.map((stock) => (stock.id === stockInfo.id ? stockInfo : stock)));
  };

  const handleSortByTicker = (stockInfo) => {
    const tickerSortData = assetList.sort((a, b) => {
      if (a.symbol > b.symbol) return 1;
      if (a.symbol < b.symbol) return -1;
      return 0;
    });
    setAssetList(tickerSortData.map((stock) => (stock.id === stockInfo.id ? stockInfo : stock)));
  };

  const handleSortByHiLow = (stockInfo) => {
    const priceHiSortData = assetList.sort((a, b) => {
      if (a.shares * stockPriceDict[a.symbol] > b.sharesstock * stockPriceDict[b.symbol]) return 1;
      if (a.shares * stockPriceDict[a.symbol] < b.shares * stockPriceDict[b.symbol]) return -1;
      return 0;
    });
    priceHiSortData.reverse();
    setAssetList((priceHiSortData.map((stock) => (stock.id === stockInfo.id ? stockInfo : stock))));
  };

  const handleSortByLowHi = (stockInfo) => {
    const priceLowSortData = assetList.sort((a, b) => {
      if (a.shares * stockPriceDict[a.symbol] > b.sharesstock * stockPriceDict[b.symbol]) return 1;
      if (a.shares * stockPriceDict[a.symbol] < b.shares * stockPriceDict[b.symbol]) return -1;
      return 0;
    });
    setAssetList((priceLowSortData.map((stock) => (stock.id === stockInfo.id ? stockInfo : stock))));
  };

  const didSellStock = (stockInfo) => {
    if (stockInfo.shares === 0) {
      setAssetList(assetList.filter((stock) => (stock.id !== stockInfo.id)));
    } else {
      setAssetList(assetList.map((stock) => (stock.id === stockInfo.id ? stockInfo : stock)));
    }
  };

  return (
    <div className="stockTable">
      <Button.Group size="large">
        <Button onClick={handleSortByTicker}>Sort by Ticker</Button>
        <Button onClick={handleSortByHiLow}>Sort by Total (Hi Low)</Button>
        <Button onClick={handleSortByLowHi}>Sort by Total (Low Hi)</Button>
      </Button.Group>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol/Company Name</Table.HeaderCell>
            <Table.HeaderCell>Shares</Table.HeaderCell>
            <Table.HeaderCell>Price per share</Table.HeaderCell>
            <Table.HeaderCell>Percentage</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {assetList.map((asset) => (
            <Table.Row key={asset.symbol}>
              <Table.Cell>{`${asset.symbol}/${asset.companyName}`}</Table.Cell>
              <Table.Cell>{asset.shares}</Table.Cell>
              <Table.Cell>{stockPriceDict[asset.symbol] ? currencyFormat(stockPriceDict[asset.symbol]) : 'N/A'}</Table.Cell>
              <Table.Cell>
                {stockPriceDict[asset.symbol] ? `${((`${stockPriceDict[asset.symbol] * asset.shares}` / `${assetList.reduce((previous, current) => previous + (stockPriceDict[current.symbol] * current.shares), 0)}`) * 100).toFixed(2)} %` : 'N/A'}
              </Table.Cell>
              <Table.Cell>{stockPriceDict[asset.symbol] ? currencyFormat((stockPriceDict[asset.symbol] * asset.shares)) : 'N/A'}</Table.Cell>
              <Table.Cell><BuyStockModal stockSymbol={asset.symbol} didBoughtStock={didBoughtStock} companyName={asset.companyName} /></Table.Cell>
              <Table.Cell>
                <SellStockModal stockSymbol={asset.symbol ?? ''} didSellStock={didSellStock} companyName={asset.companyName ?? ''} />
                {' '}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell>
              100 %
            </Table.HeaderCell>
            <Table.HeaderCell style={{fontWeight:'bold'}}>
              {Number.isNaN(assetList.reduce(
                (previous, current) => previous + (stockPriceDict[current.symbol] * current.shares),
                0,
              )) ? 'N/A' : currencyFormat(assetList.reduce(
                  (previous, current) => previous + (stockPriceDict[current.symbol] * current.shares),
                  0,
                ))}
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}

StockTable.propTypes = {
  assetList: PropTypes.arrayOf(PropTypes.shape({ symbol: PropTypes.string, shares: PropTypes.number })).isRequired,
  setAssetList: PropTypes.func.isRequired,
  stockPriceDict: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default StockTable;
