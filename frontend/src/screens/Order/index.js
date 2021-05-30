import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import PropTypes from 'prop-types';
import { ORDER_PAY_RESET } from 'redux/actionTypes';
import { Message, Loader, StripePayment } from 'components';
import { getOrderDetails, payOrder } from 'redux/actions/order';
import { PRICE, STRIPE_PUB_KEY } from 'utils/constants';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Order = ({ match }) => {
  const stripePromise = loadStripe(STRIPE_PUB_KEY);
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const cart = useSelector((state) => state.cart);

  const { paymentMethod } = cart;

  const [ispayPalReady, setPayPalReady] = useState(false);
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = useSelector((state) => state.orderPay);

  useEffect(() => {
    if (paymentMethod === 'PayPal') {
      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => setPayPalReady(true);

        document.body.appendChild(script);
      };
      if (!order || successPay) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch(getOrderDetails(orderId));
      } else if (!order.isPaid) {
        addPayPalScript();
      } else {
        setPayPalReady(true);
      }
    } else if (paymentMethod === 'Stripe') {
      if (!order || successPay) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch(getOrderDetails(orderId));
      }
    }
  }, [dispatch, order, orderId, paymentMethod, successPay]);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.state}, {order.shippingAddress.country},{' '}
                {order.shippingAddress.zipcode}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Paid on {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {PRICE}
                          {item.price} = {PRICE}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>
                  {PRICE}
                  {order.itemsPrice}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>
                  {PRICE}
                  {order.shippingPrice}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>
                  {PRICE}
                  {order.taxPrice}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>
                  {PRICE}
                  {order.totalPrice}
                </Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {paymentMethod === 'Stripe' ? (
                  <Elements stripe={stripePromise}>
                    <StripePayment amount={order.totalPrice} onSuccess={successPaymentHandler} />
                  </Elements>
                ) : !ispayPalReady ? (
                  <Loader />
                ) : (
                  <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

Order.propTypes = {
  match: PropTypes.any.isRequired,
};

export default Order;
