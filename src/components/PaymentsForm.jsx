import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onButtonPress: PropTypes.func,
  paymentMethods: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  onButtonPress: () => {},
};

export default class PaymentsForm extends PureComponent {
  render() {
    return (
      <div>
        <form>
          <select name="methods">
            {this.props.paymentMethods.map(method =>
              <option key={method} value={method}>{method}</option>
            )}
          </select>
        </form>
        <button
          className="btn-primary"
          onClick={this.props.onButtonPress}
        >
          "Confirm and Pay"
        </button>
      </div>
    );
  }
}

PaymentsForm.propTypes = propTypes;
PaymentsForm.defaultProps = defaultProps;
