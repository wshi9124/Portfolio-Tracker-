const API_KEY = process.env.REACT_APP_STOCK_API_KEY; /* eslint-disable-line no-unused-vars */

export const searchStock = (stockTicker, onComplete) => {
  fetch('http://localhost:6002/search')
  // fetch(`https://finnhub.io/api/v1/search?q=${stockTicker}&token=${API_KEY}`)
    .then((response) => response.json())
    .then(({ result }) => {
      if (!result) {
        onComplete([]);
        return;
      }
      const formattedResult = result.map((item) => ({
        name: item.description,
        symbol: item.symbol,
      }));
      onComplete(formattedResult);
    });
};

export const getStockPrice = (stockTicker, onComplete) => {
  // fetch('http://localhost:6002/price')
  fetch(`https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=${API_KEY}`)
    .then((response) => response.json())
    .then(({ c: currentPrice, h: high, l: low }) => {
      onComplete({
        currentPrice,
        high,
        low,
      });
    });
};
