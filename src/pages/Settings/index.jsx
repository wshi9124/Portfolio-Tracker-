import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

function Settings() {
  const [firstName, setFirstName] = useState('');
  const [lasttName, setLasttName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  // const [darkMode, setDarkMode] = useState('');

  const handleSubmitButton = (event) => {
    event.preventDefault();
    const personalInfo = {
      firstName,
      lasttName,
      address,
      phone,
      emailAddress,
    };
    fetch('http://localhost:6001/personalinfo', {
      method: 'POST',
      body: JSON.stringify(personalInfo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    event.target.reset();
  };

  return (
    <div>
      General Information:
      {/* <div>{personalInfo}</div> */}
      <Form>
        <Form.Group unstackable widths={2}>
          <Form.Input label="First name" placeholder="First name" name={firstName} onChange={(event) => { setFirstName(event.target.value); }} />
          <Form.Input label="Last name" placeholder="Last name" name={lasttName} onChange={(event) => { setLasttName(event.target.value); }} />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label="Address" placeholder="Address" name={address} onChange={(event) => { setAddress(event.target.value); }} />
          <Form.Input label="Phone" placeholder="Phone" name={phone} onChange={(event) => { setPhone(event.target.value); }} />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label="Email Address" placeholder="Email Address" name={emailAddress} onChange={(event) => { setEmailAddress(event.target.value); }} />
          {/* <Form.Input label="Phone" placeholder="Phone" value={lasttName} onChange={(event)=>{setLasttName(event.target.value)}} /> */}
          {/* default color mode */}
        </Form.Group>
        <Form.Checkbox label="I agree to the Terms and Conditions" />
        <Button type="submit" onSubmit={handleSubmitButton}>Submit</Button>
      </Form>
    </div>
  );
}

export default Settings;
