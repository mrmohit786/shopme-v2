import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LoadingButton = ({ loading, text, loadingText, onClick }) => (
  <Button type="submit" onClick={onClick && onClick} variant="info" disabled={loading}>
    {loading ? (
      <>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{' '}
        {loadingText}
      </>
    ) : (
      <>{text}</>
    )}
  </Button>
);

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  loadingText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default LoadingButton;
