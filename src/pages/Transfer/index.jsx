import React, { useState, useEffect } from 'react';
import {
  Header, Form, Dropdown, Button,
} from 'semantic-ui-react';

function Transfer() {
  const [cashBalance, setCashBalance] = useState(0);
  const [amount, setAmount] = useState(0);

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
    setAmount(0);
  };

  const bankOptions = [{ key: 'chase', text: 'Chase Bank', value: 'chase' },
    { key: 'bankofamerica', text: 'Bank of America', value: 'bankofamerica' },
    { key: 'wellsfargo', text: 'Wells Fargo', value: 'wellsfargo' },
    { key: 'citibank', text: 'Citibank', value: 'citiBank' }];
  return (
    <div>
      <div>
        <Header as="h2">
          Cash Balance:
          {' $'}
          {cashBalance.toFixed(2)}
        </Header>
        <Form>
          <Form.Field>
            <Header as="h5">From:</Header>
            <Dropdown
              placeholder="From"
              search
              selection
              options={bankOptions}
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
    </div>
  );
}

export default Transfer;
