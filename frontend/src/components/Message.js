import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Message = ({ variant, children }) => <Alert variant={variant}>{children}</Alert>;

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
