import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Footer } from 'components';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';

const App = () => (
  <Router>
    <Header />
    <ToastContainer
      position="bottom-center"
      autoClose={2500}
      hideProgressBar
      transition={Slide}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={true}
      pauseOnHover
    />
    <main className="py-3">
      <AppRoutes />
    </main>
    <Footer />
  </Router>
);

export default App;
