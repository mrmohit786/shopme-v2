import './App.css';
import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';

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
    <main className="py-3">
      <AppRoutes />
    </main>
    <Footer />
  </Router>
);

export default App;
