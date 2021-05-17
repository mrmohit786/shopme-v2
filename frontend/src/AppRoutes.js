import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { ErrorBoundary, Loader } from 'components';
import Home from 'screens/Home';
import { Switch } from 'react-router-dom';

const Products = lazy(() => import('screens/Products'));
const Cart = lazy(() => import('screens/Cart'));
const Login = lazy(() => import('screens/Login'));
const Register = lazy(() => import('screens/Register'));
const Profile = lazy(() => import('screens/Profile'));
const Shipping = lazy(() => import('screens/Shipping'));
const Payment = lazy(() => import('screens/Payment'));
const PlaceOrder = lazy(() => import('screens/PlaceOrder'));
const Order = lazy(() => import('screens/Order'));

const AppRoutes = () => (
  <div>
    <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Route path="/product/:id" component={Products} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/order/:id" component={Order} />
          <Route path="/search/:keyword/page/:page" component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/page/:page" component={Home} />
          <Route path="/" component={Home} exact />
        </Suspense>
      </ErrorBoundary>
    </Switch>
  </div>
);

export default AppRoutes;
