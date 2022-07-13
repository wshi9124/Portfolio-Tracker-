import React, { useState, useEffect } from 'react';
import {
  Header, Form, Dropdown, Button, Table,
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

  const showBankTransfers = transferHistory.map((transfer) => (
    <Table.Row key={transfer.id}>
      <Table.Cell>{transfer.selectBank ?? ''}</Table.Cell>
      <Table.Cell>Transfer</Table.Cell>
      <Table.Cell>{new Date(transfer.timeStamp).toLocaleString() ?? ''}</Table.Cell>
      <Table.Cell>Approved</Table.Cell>
      <Table.Cell>{currencyFormat(transfer.amount) ?? ''}</Table.Cell>
    </Table.Row>
  ));

  const bankOptions = [
    { key: 'chase', text: 'Chase Bank', value: 'Chase' },
    { key: 'bankofamerica', text: 'Bank of America', value: 'Bank of America' },
    { key: 'wellsfargo', text: 'Wells Fargo', value: 'Wells Fargo' },
    { key: 'citibank', text: 'Citibank', value: 'CitiBank' }];

  return (
    <div>
      <div className="transferDivs">
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
      <div className="transferDivs">
        <div><Header as="h2">Recent Transaction History</Header></div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Bank Name</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {showBankTransfers}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell>
                Total Amount:
                {' '}
                {currencyFormat(transferHistory.reduce((previous, current) => previous + parseFloat(current.amount), 0))}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}

export default Transfer;
