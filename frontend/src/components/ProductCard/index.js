/* eslint-disable no-underscore-dangle */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PRICE, PRODUCT_FALLBACK_IMAGE } from 'utils/constants';
import { Rating } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: 10,
  },
  media: {
    height: 200,
  },
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const ProductCard = ({ product }) => {
  const classes = useStyles();

  return (
    <Link to={`/product/${product._id}`}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.images || PRODUCT_FALLBACK_IMAGE}
            title={product.name}
          />
          <CardContent>
            <Typography noWrap gutterBottom component="h6">
              {product.brand}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className={classes.ellipsis}>
              {product.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {PRICE} {product.price}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.any.isRequired,
};

export default React.memo(ProductCard);
