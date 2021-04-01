/* eslint-disable no-underscore-dangle */

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PRICE } from '../utils/constants';
import Rating from './Rating';

const Product = ({ product }) => (
  <>
    {product && (
      <>
        <Card className="my-3 p-3 rounded">
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
          </Link>
          <Card.Body>
            <Link to={`/product/${product._id}`}>
              <Card.Title as="div">
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text as="div">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </Card.Text>
            <Card.Text as="h3">
              {PRICE}
              {product.price}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )}
  </>
);

Product.propTypes = {
  product: PropTypes.any.isRequired,
};

export default Product;
