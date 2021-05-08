/* eslint-disable no-underscore-dangle */

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PRICE } from 'utils/constants';
import { Rating } from 'components';

const ProductCard = ({ product }) => (
  <>
    {product && (
      <>
        <Card className="my-3 p-3 rounded">
          <div style={{ maxWidth: '300px', maxHeight: '400px' }}>
            <Link to={`/product/${product._id}`}>
              <Card.Img
                style={{ width: '100%', height: '100%' }}
                src={product.image}
                variant="top"
              />
            </Link>
          </div>
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

ProductCard.propTypes = {
  product: PropTypes.any.isRequired,
};

export default ProductCard;
