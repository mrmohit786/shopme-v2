import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';
import NewFooter from 'newComponents/NewFooter';
import PrimarySearchAppBar from 'newComponents/Header';

const App = () => (
  <Router>
    <PrimarySearchAppBar />
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
    <NewFooter />
  </Router>
);

export default App;
