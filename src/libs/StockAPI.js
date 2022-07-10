const API_KEY = process.env.REACT_APP_STOCK_API_KEY;

export const searchStock = (stockTicker, onComplete) => {
  fetch(`https://finnhub.io/api/v1/search?q=${stockTicker}&token=${API_KEY}`)
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

export default {
  searchStock,
};
