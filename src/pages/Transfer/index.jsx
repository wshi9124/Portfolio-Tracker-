import React, { useState, useEffect } from 'react';
import {
  Header, Form, Dropdown, Button,
} from 'semantic-ui-react';
import { currencyFormat } from '../../libs/Util';

function Transfer() {
  const [cashBalance, setCashBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [transferHistory, setTransferHistory] = useState([]);
  const [selectBank, setSelectBank] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/personalinfo/1')
      .then((res) => res.json())
      .then((personalData) => {
        setCashBalance(personalData.cashBalance ?? 0);
      });
  }, []);

  const handleTransferAmount = () => {
    setCashBalance(cashBalance + parseFloat(amount));
    fetch('http://localhost:6001/personalinfo/1', {
      method: 'PATCH',
      body: JSON.stringify({ cashBalance: (cashBalance + parseFloat(amount)) }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    fetch('http://localhost:6001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectBank, amount, timeStamp: Date.now() }),
    })
      .then((response) => response.json())
      .then((newData) => setTransferHistory([...transferHistory, newData]));
    setAmount(0);
  };

  useEffect(() => {
    fetch('http://localhost:6001/transactions')
      .then((res) => res.json())
      .then((transferData) => setTransferHistory(transferData));
  }, []);

  // const showBankTransfers= transferHistory.map((transfer) => {
  //   return <li> </li>
  // })

  const bankOptions = [
    { key: 'chase', text: 'Chase Bank', value: 'chase' },
    { key: 'bankofamerica', text: 'Bank of America', value: 'bankofamerica' },
    { key: 'wellsfargo', text: 'Wells Fargo', value: 'wellsfargo' },
    { key: 'citibank', text: 'Citibank', value: 'citiBank' }];

  return (
    <div>
      <div>
        <Header as="h2">
          Cash Balance:
          {' '}
          {currencyFormat(cashBalance)}
        </Header>
        <Form>
          <Form.Field>
            <Header as="h5">From:</Header>
            <Dropdown
              placeholder="From"
              search
              selection
              options={bankOptions}
              value={selectBank}
              onChange={(e, data) => {
                setSelectBank(data.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Header as="h5">To:</Header>
            <Dropdown
              placeholder="To"
              search
              selection
              options={[{
                key: 'current',
                text: 'Current Account',
                value: 'current',
              }]}
            />
          </Form.Field>
          <Form.Field>
            <Header as="h5">Amount:</Header>
            <input placeholder="Amount" type="number" value={amount} onChange={(event) => { setAmount(event.target.value); }} />
          </Form.Field>
          <Button type="submit" onClick={handleTransferAmount}>Submit</Button>
        </Form>
      </div>
      <div><Header as="h2">Recent Transaction History</Header></div>
      { }
    </div>
  );
}

export default Transfer;
