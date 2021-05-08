import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { Loader, Message } from 'components';
import PropTypes from 'prop-types';

const ProductCarousel = ({ topProducts }) => {
  return topProducts.error ? (
    <Message variant="danger">{topProducts.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {topProducts.products ? (
        topProducts.products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2>{product.brand}</h2>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))
      ) : (
        <Loader />
      )}
    </Carousel>
  );
};

ProductCarousel.propTypes = {
  topProducts: PropTypes.object.isRequired,
};

export default React.memo(ProductCarousel);
