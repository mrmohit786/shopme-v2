import React from 'react';
import { Link } from 'react-router-dom';
import { Message } from 'components';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import { PRODUCT_FALLBACK_IMAGE } from 'utils/constants';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 20,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto 0',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    maxWidth: 600,
    maxHeight: 400,
    width: 600,
    height: 400,
  },
}));

const ProductCarousel = ({ topProducts }) => {
  const classes = useStyles();
  return topProducts.error ? (
    <Message variant="danger">{topProducts.error}</Message>
  ) : (
    <Carousel autoPlay infinite swipeable draggable responsive={responsive} autoPlaySpeed={2000}>
      {topProducts.products.map((product) => (
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={product.imaged || PRODUCT_FALLBACK_IMAGE}
            title={product.name}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {product.brand}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {product.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {product.description}
              </Typography>
            </CardContent>
          </div>
        </Card>
      ))}
    </Carousel>
  );
};

ProductCarousel.propTypes = {
  topProducts: PropTypes.object.isRequired,
};

export default React.memo(ProductCarousel);
