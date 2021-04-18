import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Product from 'components/Product';
import { listProducts } from 'redux/actions/products';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Paginate from 'components/Paginate';
import TopProductCarousel from 'components/Carousel';

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;
  const { keyword, page: pageNumber } = match.params;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <TopProductCarousel />}
      <h1>New Arrivals</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword || ''} />
        </>
      )}
    </>
  );
};

Home.propTypes = {
  match: PropTypes.any.isRequired,
};

export default Home;
