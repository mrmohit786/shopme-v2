import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LoadingButton, FormContainer } from 'components';
import { register } from 'redux/actions/user';
import { MESSAGE } from 'utils/constants';

const Register = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';
  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error(MESSAGE.PASSWORD_NOT_MATCHED);
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter Password again"
          />
        </Form.Group>
        <LoadingButton loading={loading} text="Register" loadingText="Creating account" />
      </Form>
      <Row className="py-3">
        <Col>
          Already Register?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

Register.propTypes = {
  location: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

export default Register;
