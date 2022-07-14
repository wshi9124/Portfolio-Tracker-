import React, { useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import DonutChart from './DonutChart';
import StockTable from './StockTable';
import LineChart from './LineChart';
import { getStockPrice } from '../../libs/StockAPI';
import { currencyFormat } from '../../libs/Util';

function Home() {
  const [cashBalance, setCashBalance] = useState(0);
  const [assetList, setAssetList] = useState([]);
  const [stockPriceDict, setStockPriceDict] = useState({});

  useEffect(() => {
    fetch('http://localhost:6001/portfolio')
      .then((res) => res.json())
      .then(setAssetList);
  }, []);

  useEffect(() => {
    assetList.forEach((stock) => {
      if (stockPriceDict[stock.symbol] === undefined) {
        getStockPrice(stock.symbol, (priceInfo) => {
          stockPriceDict[stock.symbol] = priceInfo.currentPrice;
          setStockPriceDict({ ...stockPriceDict });
        });
      }
    });

    fetch('http://localhost:6001/personalinfo/1')
      .then((res) => res.json())
      .then((personalData) => {
        setCashBalance(personalData.cashBalance ?? 0);
      });
  }, [assetList]);

  return (
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          <DonutChart assetList={assetList} stockPriceDict={stockPriceDict} />
        </Grid.Column>
        <Grid.Column>
          <LineChart />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as="h2">
            Cash Balance:
            {' '}
            {currencyFormat(cashBalance)}
          </Header>
          <StockTable assetList={assetList} setAssetList={setAssetList} stockPriceDict={stockPriceDict} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
