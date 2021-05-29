import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { listProducts, listTopProducts } from 'redux/actions/products';
import { ProductCarousel, Message, Paginate, ProductCard } from 'components';
import ProductListLoader from './components/ProductListLoader';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CarouselLoader from './components/CarouselLoader';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Home = ({ match }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const topProducts = useSelector((state) => state.topProducts);
  const { loading, error, products, pages, page } = productList;
  const { keyword, page: pageNumber } = match.params;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    if (topProducts.products.length === 0) {
      dispatch(listTopProducts());
    }
  }, [dispatch, topProducts.products.length]);

  return (
    <Container container>
      {!keyword && topProducts.loading ? (
        <CarouselLoader />
      ) : (
        <ProductCarousel topProducts={topProducts} />
      )}
      {loading ? (
        <ProductListLoader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Grid container spacing={2}>
            {products?.map((product, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Grid container className={classes.root} spacing={2}>
            <Paginate pages={pages} page={page} keyword={keyword || ''} />
          </Grid>
        </>
      )}
    </Container>
  );
};

Home.propTypes = {
  match: PropTypes.any.isRequired,
};

export default Home;
