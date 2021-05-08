import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { saveShippingAddress } from 'redux/actions/cart';
import { CheckoutSteps, FormContainer } from 'components';

const Shipping = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [country, setCountry] = useState(shippingAddress.country);
  const [zipcode, setZipcode] = useState(shippingAddress.zipcode);

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress({ address, city, state, country, zipcode }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
          />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter State"
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter Country"
          />
        </Form.Group>
        <Form.Group controlId="zipcode">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            type="number"
            value={zipcode}
            required
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="Enter Zipcode"
          />
        </Form.Group>
        <Button type="submit" variant="info">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

Shipping.propTypes = {
  history: PropTypes.any.isRequired,
};

export default Shipping;
