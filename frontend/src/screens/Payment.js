import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import FormContainer from 'components/FormContainer';
import { savePaymentMethod } from 'redux/actions/cart';
import CheckoutSteps from 'components/CheckoutSteps';

const Payment = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  const handlePaymentCheckbox = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal"
              id="PayPal"
              name="paypalPayment"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={handlePaymentCheckbox}
            />
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="stripePayment"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={handlePaymentCheckbox}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="info">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

Payment.propTypes = {
  history: PropTypes.any.isRequired,
};

export default Payment;
