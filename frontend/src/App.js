import './App.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import Products from './screens/Products';

const App = () => (
  <Router>
    <Header />
    <main>
      <Container className="py-3">
        <Route path="/" component={Home} exact />
        <Route path="/product/:id" component={Products} exact />
      </Container>
    </main>
    <Footer />
  </Router>
);

export default App;
