import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';

function CurrentItems() {
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
  }, []);

  return (
    <div>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Ticker</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stockList.map((stock) => (
            <Table.Row key={stock.ticker}>
              <Table.Cell>{stock.name}</Table.Cell>
              <Table.Cell>{stock.ticker}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default CurrentItems;
