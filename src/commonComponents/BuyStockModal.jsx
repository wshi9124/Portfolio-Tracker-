import React, { useEffect, useState } from 'react';
import {
  Button, Modal, Header, Form, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getStockPrice } from '../libs/StockAPI';

function BuyStockModal({ stockSymbol }) {
  const [open, setOpen] = useState(false);
  const [buyDisabled, setBuyDisabled] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [cashBalance, setCashBalance] = useState(0);
  const [priceInfo, setPriceInfo] = useState({});

  useEffect(() => {
    if (!open) {
      setErrorMessage('');
      setQuantity(0);
      setPriceInfo({});
      setBuyDisabled(true);
      return;
    }

    fetch('http://localhost:6001/personalinfo/1')
      .then((res) => res.json())
      .then((personalData) => {
        setCashBalance(personalData.cashBalance ?? 0);
      });

    getStockPrice(stockSymbol, setPriceInfo);
  }, [open]);

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
    const totalCost = e.target.value * priceInfo.currentPrice;
    if (totalCost > cashBalance) {
      setErrorMessage('Not enough money!');
      setBuyDisabled(true);
    } else {
      setErrorMessage('');
      setBuyDisabled(false);
    }
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button primary>Buy</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="money" content={`Buy ${stockSymbol}`} />
      <Modal.Content>
        <Header as="h4">
          How many
          {' '}
          {stockSymbol}
          {' '}
          would you like to buy?
        </Header>
        <Header as="h5">
          Available balance: $
          {cashBalance.toFixed(2)}
        </Header>
        <Header as="h5">
          Current price:
          {' '}
          {priceInfo.currentPrice ? `$${priceInfo.currentPrice.toFixed(2)}` : 'N/A'}
        </Header>
        <Header as="h5">
          High price of the day:
          {' '}
          {priceInfo.high ? `$${priceInfo.high.toFixed(2)}` : 'N/A'}
        </Header>
        <Header as="h5">
          Low price of the day:
          {' '}
          {priceInfo.low ? `$${priceInfo.low.toFixed(2)}` : 'N/A'}
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
          {quantity > 0 && priceInfo.currentPrice ? (quantity * priceInfo.currentPrice).toFixed(2) : 0}
        </Header>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button disabled={buyDisabled} color="green" onClick={() => setOpen(false)}>
          Buy!
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

BuyStockModal.propTypes = {
  stockSymbol: PropTypes.string.isRequired,
};

export default BuyStockModal;
