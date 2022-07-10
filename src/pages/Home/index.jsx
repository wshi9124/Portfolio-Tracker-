import React from 'react';
import { Grid } from 'semantic-ui-react';
import DonutChart from './DonutChart';
import StockTable from './Table';
import LineChart from './LineChart';

function Home() {
  return (
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          <DonutChart />
        </Grid.Column>
        <Grid.Column>
          <LineChart />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={1}>
        <Grid.Column>
          <StockTable />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
