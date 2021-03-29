import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import Product from '../components/Product';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      toast.dark('Products Listed')
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>latest Products</h1>
      <Row>
        {products?.map((product) => (
          // eslint-disable-next-line no-underscore-dangle
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
