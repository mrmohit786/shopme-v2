import React from 'react';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Home from './screens/Home';
import Products from './screens/Products';

const AppRoutes = () => (
  <Container>
    <Route path="/" component={Home} exact />
    <Route path="/product/:id" component={Products} />
    <Route path="/cart/:id?" component={Cart} />
    <Route path="/login" component={Login} exact />
  </Container>
);

export default AppRoutes;
