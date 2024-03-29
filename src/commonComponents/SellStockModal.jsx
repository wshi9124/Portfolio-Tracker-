import React, { useEffect, useState } from 'react';
import {
  Button, Modal, Header, Form, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getStockPrice } from '../libs/StockAPI';
import { currencyFormat } from '../libs/Util';

function SellStockModal({ stockSymbol, companyName, didSellStock }) {
  const [open, setOpen] = useState(false);
  const [buyDisabled, setBuyDisabled] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [cashBalance, setCashBalance] = useState(0);
  const [priceInfo, setPriceInfo] = useState({});
  const [currentOwnedStock, setCurrentOwnedStock] = useState(null);

  useEffect(() => {
    if (!open) {
      setErrorMessage('');
      setQuantity(0);
      setPriceInfo({});
      setBuyDisabled(true);
      setCurrentOwnedStock(null);
      return;
    }

    fetch('http://localhost:6001/personalinfo/1')
      .then((res) => res.json())
      .then((personalData) => {
        setCashBalance(personalData.cashBalance ?? 0);
      });

    getStockPrice(stockSymbol, setPriceInfo);

    fetch('http://localhost:6001/portfolio')
      .then((res) => res.json())
      .then((stocks) => {
        const foundStocks = stocks.filter((item) => item.symbol === stockSymbol);
        if (foundStocks.length > 0) {
          setCurrentOwnedStock(foundStocks[0]);
        }
      });
  }, [open]);

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (e.target.value > currentOwnedStock.shares) {
      setErrorMessage('Not enough shares!');
      setBuyDisabled(true);
    } else {
      setErrorMessage('');
      setBuyDisabled(false);
    }
  };

  const buyStockAction = () => {
    const remainingStock = parseFloat(currentOwnedStock.shares) - parseFloat(quantity);
    if (remainingStock === 0) {
      fetch(`http://localhost:6001/portfolio/${currentOwnedStock.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(() => {
          currentOwnedStock.shares = 0;
          didSellStock(currentOwnedStock);
        });
    } else {
      fetch(`http://localhost:6001/portfolio/${currentOwnedStock.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          shares: parseFloat(currentOwnedStock.shares) - parseFloat(quantity),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(didSellStock);
    }
    fetch('http://localhost:6001/personalinfo/1', {
      method: 'PATCH',
      body: JSON.stringify({ cashBalance: (cashBalance + parseFloat(quantity * priceInfo.currentPrice)) }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    setOpen(false);
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button primary style={{ backgroundColor: 'orange' }}>Sell</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="money bill alternate outline" content={`Sell ${stockSymbol}/${companyName}`} />
      <Modal.Content>
        <Header as="h4">
          How many
          {' '}
          {stockSymbol}
          {' '}
          would you like to sell?
        </Header>
        <Header as="h5">
          Available balance:
          {currencyFormat(cashBalance)}
        </Header>
        {currentOwnedStock !== null && (
          <Header as="h5">
            Shares owned:
            {currentOwnedStock.shares}
          </Header>
        )}
        {currentOwnedStock !== null && (
          <Header as="h5">
            Total worth:
            {currencyFormat((currentOwnedStock.shares * priceInfo.currentPrice))}
          </Header>
        )}
        <Header as="h5">
          Current price:
          {' '}
          {priceInfo.currentPrice ? currencyFormat(`${priceInfo.currentPrice}`) : 'N/A'}
        </Header>
        <Header as="h5">
          High price of the day:
          {' '}
          {priceInfo.high ? currencyFormat(`${priceInfo.high}`) : 'N/A'}
        </Header>
        <Header as="h5">
          Low price of the day:
          {' '}
          {priceInfo.low ? currencyFormat(`${priceInfo.low.toFixed(2)}`) : 'N/A'}
        </Header>
        <Divider />
        <Form>
          <Form.Field>
            <Header as="h5">Quantity</Header>
            <input placeholder="Quantity" type="number" value={quantity} onChange={onQuantityChange} />
            {errorMessage && <Header as="h5" color="red">{errorMessage}</Header>}
          </Form.Field>
        </Form>
        <Divider />
        <Header as="h5">
          Total price: $
          {quantity > 0 && priceInfo.currentPrice ? currencyFormat((quantity * priceInfo.currentPrice)) : 0}
        </Header>
      </Modal.Content>
      <Modal.Actions>
        <Button color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button disabled={buyDisabled} color="orange" onClick={buyStockAction}>
          Sell!
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

SellStockModal.propTypes = {
  stockSymbol: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  didSellStock: PropTypes.func,
};

SellStockModal.defaultProps = {
  didSellStock: () => { },
};

export default SellStockModal;
