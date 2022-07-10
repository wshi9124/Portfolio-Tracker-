import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineChart() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const options = {
    responsive: true,
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Balance',
        data: [25, 42, 31, 42, 14, 22, 51],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        }}
        options={options}
        data={data}
      />
    </div>
  );
}

export default LineChart;
