export const currencyFormat = (x) => {
  let num = x;
  if (typeof x === 'number') {
    num = num.toFixed(2);
  }
  const result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${result}`;
};

export default {
  currencyFormat,
};
// currency coverter keep this for future
