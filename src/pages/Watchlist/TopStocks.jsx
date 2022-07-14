import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Menu, Table, Button, Label, Icon, Header,
} from 'semantic-ui-react';

const NUM_PER_PAGE = 10;

const getSubarrayFromPageNumber = (array, pageNumber) => array.slice((pageNumber - 1) * NUM_PER_PAGE, ((pageNumber - 1) * 10) + NUM_PER_PAGE);

function TopStocks({ stockList, addToWatchListFunc, assetSymbolDict }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageItems, setCurrentPageItems] = useState([]);

  useEffect(() => {
    setCurrentPageItems(getSubarrayFromPageNumber(stockList, currentPage));
  }, [stockList]);

  const getMaxPage = () => Math.ceil(stockList.length / NUM_PER_PAGE);

  const goBack = () => {
    if (currentPage === 0) {
      return;
    }
    const newPageNumber = currentPage - 1;
    setCurrentPage(newPageNumber);
    setCurrentPageItems(getSubarrayFromPageNumber(stockList, newPageNumber));
  };

  const goForward = () => {
    if (currentPage + 1 > getMaxPage()) {
      return;
    }
    const newPageNumber = currentPage + 1;
    setCurrentPage(newPageNumber);
    setCurrentPageItems(getSubarrayFromPageNumber(stockList, newPageNumber));
  };

  return (
    <>
      <Header
        as="h3"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2%',
          fontSize: '25px',
        }}
      >
        Top 100 Stocks

      </Header>
      <Table celled style={{ marginLeft: '1.3%', width: '97%' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ width: '35%' }}>Name</Table.HeaderCell>
            <Table.HeaderCell>Symbol/Ticker</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentPageItems.map((item) => (
            <Table.Row key={item.symbol}>
              <Table.Cell>
                <Label ribbon>{item.name}</Label>
              </Table.Cell>
              <Table.Cell>{item.symbol}</Table.Cell>
              <Table.Cell>
                {
                  assetSymbolDict[item.symbol] === undefined ? (
                    <Button
                      content="Add to watchlist"
                      primary
                      onClick={() => {
                        addToWatchListFunc(item.symbol, item.name);
                      }}
                    />
                  ) : null
                }
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3" style={{ textAlign: 'center' }}>
              <Menu pagination>
                {currentPage !== 1 && (
                  <Menu.Item as="a" icon onClick={goBack}>
                    <Icon name="chevron left" />
                  </Menu.Item>
                )}
                {currentPage + 1 <= getMaxPage() && (
                <Menu.Item as="a" icon onClick={goForward}>
                  <Icon name="chevron right" />
                </Menu.Item>
                )}
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
}

TopStocks.propTypes = {
  stockList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    symbol: PropTypes.string,
  })).isRequired,
  addToWatchListFunc: PropTypes.func.isRequired,
  assetSymbolDict: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default TopStocks;
