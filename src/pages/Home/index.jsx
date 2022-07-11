import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import DonutChart from './DonutChart';
import StockTable from './StockTable';
import LineChart from './LineChart';

function Home() {
  const [assetList, setAssetList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6001/portfolio')
      .then((res) => res.json())
      .then(setAssetList);
  }, []);

  return (
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          <DonutChart assetList={assetList} />
        </Grid.Column>
        <Grid.Column>
          <LineChart />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={1}>
        <Grid.Column>
          <StockTable assetList={assetList} setAssetList={setAssetList} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
