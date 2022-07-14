export const currencyFormat = (x) => {
  let num = x;
  if (typeof x === 'number') {
    num = num.toFixed(2);
  }
  const result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${result}`;
};

export const getRandomColor = (alpha = 1) => {
  let color = 'rgba(';
  for (let i = 0; i < 3; i += 1) {
    color = `${color}${Math.floor(Math.random() * 256)}, `;
  }
  return `${color}${alpha})`;
};

export default {
  currencyFormat,
  getRandomColor,
};
// currency coverter keep this for future
