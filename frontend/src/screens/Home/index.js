import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { listProducts, listTopProducts } from 'redux/actions/products';
import { ProductCarousel, Message, Paginate, ProductCard } from 'components';
import ProductListLoader from './components/Loader/ProductListLoader';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CarouselLoader from './components/Loader/CarouselLoader';
import CategoryList from './components/CategoryList';
import { getCategories } from 'services/categoryService';
import { toast } from 'react-toastify';
import CategoryListLoader from './components/Loader/CategoryListLoader';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Home = ({ match }) => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const topProducts = useSelector((state) => state.topProducts);
  const { loading, error, products, pages, page } = productList;
  const { keyword, page: pageNumber } = match.params;
  const [isCategoryLoading, setCategoryLoader] = useState(false);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    if (topProducts.products.length === 0) {
      dispatch(listTopProducts());
    }
  }, [dispatch, topProducts.products.length]);

  useEffect(() => {
    listCategories();
  }, []);

  const listCategories = async () => {
    setCategoryLoader(true);
    const res = await getCategories().catch((e) => {
      setCategoryLoader(false);
      toast.error(e?.data?.error);
    });
    if (res) {
      setCategories(res.data);
      setCategoryLoader(false);
    }
  };

  return (
    <Container container>
      {!keyword &&
        (topProducts.loading ? <CarouselLoader /> : <ProductCarousel topProducts={topProducts} />)}
      {!keyword &&
        (isCategoryLoading ? <CategoryListLoader /> : <CategoryList categories={categories} />)}
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
