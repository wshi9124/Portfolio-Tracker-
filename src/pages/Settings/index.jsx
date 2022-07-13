import React, { useEffect, useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { currencyFormat } from '../../libs/Util';

function Settings({ toggleDarkMode }) {
  const [firstName, setFirstName] = useState('');
  const [lasttName, setLasttName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [cashBalance, setCashBalance] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/personalinfo/1')
      .then((res) => res.json())
      .then((personalData) => {
        setFirstName(personalData.firstName ?? '');
        setLasttName(personalData.lasttName ?? '');
        setAddress(personalData.address ?? '');
        setPhone(personalData.phone ?? '');
        setEmailAddress(personalData.emailAddress ?? '');
        setCashBalance(personalData.cashBalance.toFixed(2) ?? '');
      });
  }, []);

  const handleSubmitButton = () => {
    const personalInfo = {
      firstName,
      lasttName,
      address,
      phone,
      emailAddress,
    };
    fetch('http://localhost:6001/personalinfo/1', {
      method: 'PATCH',
      body: JSON.stringify(personalInfo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };

  return (
    <div className="settingDiv">
      <Header as="h4" style={{ fontSize: '175%' }}>General Information:</Header>
      <Form>
        <Form.Group unstackable widths={2}>
          <Form.Input label="First name" placeholder="First name" value={firstName} onChange={(event) => { setFirstName(event.target.value); }} />
          <Form.Input label="Last name" placeholder="Last name" value={lasttName} onChange={(event) => { setLasttName(event.target.value); }} />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label="Address" placeholder="Address" value={address} onChange={(event) => { setAddress(event.target.value); }} />
          <Form.Input label="Phone" placeholder="Phone" value={phone} onChange={(event) => { setPhone(event.target.value); }} />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label="Email Address" placeholder="Email Address" value={emailAddress} onChange={(event) => { setEmailAddress(event.target.value); }} />
          <Form.Input className="disabled" label="Cash Balance" placeholder="Cash Balance" value={currencyFormat(cashBalance)} />
        </Form.Group>
        <Button onClick={handleSubmitButton}>Update Information</Button>
      </Form>
      <Header as="h4" style={{ fontSize: '175%' }}>Change Mode:</Header>
      <Button onClick={() => { toggleDarkMode(); }}>Toggle Dark Mode</Button>
    </div>
  );
}

Settings.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Settings;
