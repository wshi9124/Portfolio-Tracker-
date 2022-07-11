import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import BuyStockModal from '../../commonComponents/BuyStockModal';

function StockTable({ assetList, setAssetList }) {
  const didBoughtStock = (stockInfo) => {
    setAssetList(assetList.map((stock) => (stock.id === stockInfo.id ? stockInfo : stock)));
  };

  return (
    <div>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol</Table.HeaderCell>
            <Table.HeaderCell>Shares</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {assetList.map((asset) => (
            <Table.Row key={asset.symbol}>
              <Table.Cell>{asset.symbol}</Table.Cell>
              <Table.Cell>{asset.shares}</Table.Cell>
              <Table.Cell><BuyStockModal stockSymbol={asset.symbol} didBoughtStock={didBoughtStock} /></Table.Cell>
              <Table.Cell><Button color="red">Sell</Button></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

StockTable.propTypes = {
  assetList: PropTypes.arrayOf(PropTypes.shape({ symbol: PropTypes.string, shares: PropTypes.number })).isRequired,
  setAssetList: PropTypes.func.isRequired,
};

export default StockTable;
