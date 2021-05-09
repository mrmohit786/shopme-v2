import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { listProducts, listTopProducts } from 'redux/actions/products';
import { ProductCarousel, Loader, Message, Paginate, ProductCard } from 'components';

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const topProducts = useSelector((state) => state.topProducts);
  const { loading, error, products, pages, page } = productList;
  const { keyword, page: pageNumber } = match.params;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    if (topProducts?.products.length === 0) {
      dispatch(listTopProducts());
    }
  }, [dispatch, topProducts?.products.length]);

  return (
    <>
      {!keyword && <ProductCarousel topProducts={topProducts} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <h1>New Arrivals</h1>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Row className="text-center">
            <Paginate pages={pages} page={page} keyword={keyword || ''} />
          </Row>
        </>
      )}
    </>
  );
};

Home.propTypes = {
  match: PropTypes.any.isRequired,
};

export default Home;
