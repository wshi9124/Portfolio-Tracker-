import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import DonutChart from './DonutChart';
import StockTable from './StockTable';
import LineChart from './LineChart';
import { getStockPrice } from '../../libs/StockAPI';

function Home() {
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
          <StockTable assetList={assetList} setAssetList={setAssetList} stockPriceDict={stockPriceDict} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
