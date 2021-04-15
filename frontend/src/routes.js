import React from 'react';
import { Route } from 'react-router-dom';
import Products from 'screens/Products';
import Cart from 'screens/Cart';
import Login from 'screens/Login';
import Home from 'screens/Home';
import Register from 'screens/Register';
import Profile from 'screens/Profile';
import Shipping from 'screens/Shipping';
import Payment from 'screens/Payment';
import PlaceOrder from 'screens/PlaceOrder';
import Order from 'screens/Order';

const AppRoutes = () => (
  <>
    <Route path="/product/:id" component={Products} />
    <Route path="/cart/:id?" component={Cart} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/profile" component={Profile} />
    <Route path="/shipping" component={Shipping} />
    <Route path="/payment" component={Payment} />
    <Route path="/placeorder" component={PlaceOrder} />
    <Route path="/order/:id" component={Order} />
    <Route path="/search/:keyword" component={Home} />
    <Route path="/" component={Home} exact />
  </>
);

export default AppRoutes;
