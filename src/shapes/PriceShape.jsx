import PropTypes from 'prop-types';

export default PropTypes.shape({
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
});
