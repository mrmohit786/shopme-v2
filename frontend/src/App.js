import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Footer } from 'components';
import AppRoutes from './AppRoutes';
import Spinner from 'shared/components/Spinner';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { showLoader } = useSelector((state) => state.showLoader);
  console.log(showLoader);
  return (
    <Router>
      <Header />
      <Spinner showLoader={showLoader} />
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

      <AppRoutes />

      <Footer />
    </Router>
  );
};

export default App;
