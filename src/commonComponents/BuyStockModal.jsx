import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function BuyStockModal({ stockSymbol }) {
  return (
    <Modal
      trigger={<Button primary>Buy</Button>}
      header={stockSymbol}
      content="Call Benjamin regarding the reports."
      actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
    />
  );
}

BuyStockModal.propTypes = {
  stockSymbol: PropTypes.string.isRequired,
};

export default BuyStockModal;
