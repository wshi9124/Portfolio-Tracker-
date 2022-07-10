import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';

function CurrentItems() {
  const [assetList, setAssetList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6001/portfolio')
      .then((res) => res.json())
      .then(setAssetList);
  }, []);

  return (
    <div>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol</Table.HeaderCell>
            <Table.HeaderCell>Shares</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {assetList.map((asset) => (
            <Table.Row key={asset.symbol}>
              <Table.Cell>{asset.symbol}</Table.Cell>
              <Table.Cell>{asset.shares}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default CurrentItems;
