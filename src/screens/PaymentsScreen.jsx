import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PaymentsForm from '../components/PaymentsForm';

const propTypes = {
  priceDetails: PropTypes.any,
};

const defaultProps = {
  priceDetails: {
    id: "airbnb",
    displayItems: [
      {
        label: "Subtotal",
        amount: { currency: "USD", value: "55.00" },
      },
      {
        label: "Sales Tax",
        amount: { currency: "USD", value: "5.00" },
      },
    ],
    total: {
      label: "Total due",
      amount: { currency: "USD", value: "65.00" },
    },
  }
};

const networks = ['mastercard', 'visa'];
const types = ['debit', 'credit', 'prepaid'];

const methodData = [
  {
    supportedMethods: ["basic-card"],
    data: {
      supportedNetworks: networks,
      supportedTypes: types,
    },
  }
];

const options = {
  requestPayerEmail: false,
  requestPayerName: true,
  requestPayerPhone: false,
  requestShipping: true,
};


async function attemptPaymentRequest(details) {
  if (!window.PaymentRequest) {
    return;
  }

  try {
    const request = new window.PaymentRequest(methodData, details, options);

    const response = await request.show();
    await validateResponse(response);
  } catch (err) {
    // AbortError, SecurityError
    console.error(err);
  }
}

async function validateResponse(response) {
  try {
    await response.complete("success");
  } catch (err) {
    // Something went wrong...
    response.complete("unknown");
  }
}

function rowFromPriceItem(priceItem) {
  return (
    <tr key={priceItem.label}>
      <th>{priceItem.label}</th>
      <th>{priceItem.amount.value}</th>
    </tr>
  );
}

export default class PaymentsScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.onConfirmAndPayClick = this.onConfirmAndPayClick.bind(this);
  }

  onConfirmAndPayClick() {
    attemptPaymentRequest(this.props.priceDetails);
  }

  render() {
    return (
      <div className="price-item-table-container">
        <table className="price-item-table">
          <tbody>
            {this.props.priceDetails && this.props.priceDetails.displayItems.map(item =>
              rowFromPriceItem(item)
            )}
          </tbody>
        </table>
        <hr />
        <table className="price-item-table">
          <tbody>
            {rowFromPriceItem(this.props.priceDetails.total)}
          </tbody>
        </table>
        <PaymentsForm
          onButtonPress={this.onConfirmAndPayClick}
          paymentMethods={['Pay with Mastercard', 'Paypal']}
        />
      </div>
    );
  }
}

PaymentsScreen.propTypes = propTypes;
PaymentsScreen.defaultProps = defaultProps;
