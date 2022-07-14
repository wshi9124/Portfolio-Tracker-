import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getRandomColor } from '../../libs/Util';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const getPastDay = (numOfDays) => [...Array(numOfDays).keys()].map((index) => {
  const date = new Date();
  date.setDate(date.getDate() - index);

  return WEEKDAY[date.getDay()];
}).reverse();

const calculateBalanceArray = (assetList, stockPriceDict) => assetList.reduce((previous, current) => previous + (current.shares * stockPriceDict[current.symbol]), 0);

const generateFakeBalanceArray = (numOfDays, currentBalance) => {
  const PERCENTAGE_RANGE = 5;
  const result = [currentBalance];
  for (let i = 0; i < numOfDays; i += 1) {
    const previousBalance = result[result.length - 1];
    const isPositive = Math.floor(Math.random() * 2) === 1;
    const percentageDifference = Math.floor(Math.random() * (PERCENTAGE_RANGE + 1)) + 1;
    const multiplier = isPositive ? 1 + (percentageDifference / 100) : 1 - (percentageDifference / 100);
    result.push(previousBalance * multiplier);
  }
  return result.reverse();
};

function LineChart({ assetList, stockPriceDict }) {
  const labels = getPastDay(7);
  const options = {
    responsive: true,
  };

  const backgroundColor = 'green';
  const borderColor = backgroundColor.replace('0.5', 1);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Balance History',
        data: generateFakeBalanceArray(6, calculateBalanceArray(assetList, stockPriceDict)),
        borderColor,
        backgroundColor,
      },
    ],
  };

  return (
    <div style={{
      position: 'relative',
    }}
    >
      <Line
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(+50%)',
          borderRadius: '8%',
          backgroundColor: 'white',
          opacity: '.8'
        }}
        options={options}
        data={data}
      />
    </div>
  );
}

LineChart.propTypes = {
  assetList: PropTypes.arrayOf(PropTypes.shape({ symbol: PropTypes.string, shares: PropTypes.number })).isRequired,
  stockPriceDict: PropTypes.objectOf(PropTypes.number).isRequired,
};
export default LineChart;
