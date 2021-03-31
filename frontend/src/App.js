import './App.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Slide, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import Products from './screens/Products';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './screens/Cart';

const App = () => (
  <Router>
    <Header />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      transition={Slide}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
    />
    <main>
      <Container className="py-3">
        <Route path="/" component={Home} exact />
        <Route path="/product/:id" component={Products} />
        <Route path="/cart/:id?" component={Cart} exact />
      </Container>
    </main>
    <Footer />
  </Router>
);

export default App;
