import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { listTopProducts } from 'redux/actions/products';
import { useSelector, useDispatch } from 'react-redux';

const TopProductCarousel = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.topProducts);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products ? (
        products.map((product) => (
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

export default React.memo(TopProductCarousel);
