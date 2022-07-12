import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import BuyStockModal from '../../commonComponents/BuyStockModal';

function StockTable({ assetList, setAssetList, stockPriceDict }) {
  const didBoughtStock = (stockInfo) => {
    setAssetList(assetList.map((stock) => (stock.id === stockInfo.id ? stockInfo : stock)));
  };

  return (
    <div>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol/Company Name</Table.HeaderCell>
            <Table.HeaderCell>Shares</Table.HeaderCell>
            <Table.HeaderCell>Price per share</Table.HeaderCell>
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
              <Table.Cell>{stockPriceDict[asset.symbol] ? `$${stockPriceDict[asset.symbol].toFixed(2)}` : 'N/A'}</Table.Cell>
              <Table.Cell>{stockPriceDict[asset.symbol] ? `$${(stockPriceDict[asset.symbol] * asset.shares).toFixed(2)}` : 'N/A'}</Table.Cell>
              <Table.Cell><BuyStockModal stockSymbol={asset.symbol} didBoughtStock={didBoughtStock} companyName={asset.companyName} /></Table.Cell>
              <Table.Cell><Button color="red">Sell</Button></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>
              {assetList.reduce(
                (previous, current) => previous + current.shares,
                0,
              )}
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>
              {Number.isNaN(assetList.reduce(
                (previous, current) => previous + (stockPriceDict[current.symbol] * current.shares),
                0,
              )) ? 'N/A' : `$${assetList.reduce(
                  (previous, current) => previous + (stockPriceDict[current.symbol] * current.shares),
                  0,
                ).toFixed(2)}`}
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