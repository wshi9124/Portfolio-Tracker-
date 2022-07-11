import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = (alpha) => {
  let color = 'rgba(';
  for (let i = 0; i < 3; i += 1) {
    color = `${color}${Math.floor(Math.random() * 256)}, `;
  }
  return `${color}${alpha})`;
};

const getColors = (numberOfColors) => {
  const backgroundColor = [];
  const borderColor = [];
  for (let i = 0; i < numberOfColors; i += 1) {
    const color = getRandomColor(0.2);
    backgroundColor.push(color);
    borderColor.push(color.replace('0.2', 1));
  }
  return {
    backgroundColor,
    borderColor,
  };
};

function DonutChart({ assetList, stockPriceDict }) {
  const { backgroundColor, borderColor } = getColors(assetList.length);
  const data = {
    labels: assetList.map((item) => item.symbol),
    datasets: [
      {
        label: 'Total worth',
        data: assetList.map((item) => item.shares * stockPriceDict[item.symbol]),
        backgroundColor,
        borderColor,
        borderWidth: 1,
        radius: '75%',
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        zIndex: '5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        fontSize: '1.25rem',
        paddingTop: '1.25rem',
      }}
      >
        $
        {assetList.reduce(
          (previous, current) => previous + (stockPriceDict[current.symbol] * current.shares),
          0,
        )}
      </div>
    </div>
  );
}

DonutChart.propTypes = {
  assetList: PropTypes.arrayOf(PropTypes.shape({ symbol: PropTypes.string, shares: PropTypes.number })).isRequired,
  stockPriceDict: PropTypes.objectOf(PropTypes.number).isRequired,
};
export default DonutChart;
