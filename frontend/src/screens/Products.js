import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from 'prop-types';
import Rating from '../components/Rating';
import { PRICE } from '../utils/constants';

const Products = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      if (data) {
        setProduct(data);
        toast.dark('View product details');
      }
    };
    fetchProduct();
  }, [match.params.id]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price : {PRICE}
              {product?.price}
            </ListGroup.Item>
            <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>
                      {PRICE}
                      {product?.price}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button disabled={!product?.countInStock} className="btn-block" type="button">
                    Add to Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Products.propTypes = {
  match: PropTypes.any.isRequired,
};

export default Products;
