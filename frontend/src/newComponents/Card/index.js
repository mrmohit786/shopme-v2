import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { motion } from 'framer-motion';
import cardStyle from './cardStyle';

const Card = () => {
  const classes = cardStyle();
  const products = [
    {
      img: './images/airpods.jpg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/alexa.jpg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/camera.jpg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/casualShirt.jpeg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/CasualShoe.jpeg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/mouse.jpg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/phone.jpg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/playstation.jpg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/smartTV.jpeg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/splitAC.jpeg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/SportShoe.jpeg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
    {
      img: './images/SportShoe.jpeg',
      name: 'iPhone 11 Pro 256GB Memory',
      rating: 4.5,
      numReviews: 12,
      price: 2781,
    },
  ];
  return (
    <Grid container xs={12} spacing={5} className={classes.outerDiv}>
      {products.map((product) => (
        <Grid container item xs={12} sm={6} md={4} lg={3} xl={2}>
          <motion.div
            className={classes.w100}
            whileHover={{
              scale: 1.04,
              transition: { duration: 0.3 },
            }}
          >
            <Paper elevation={3}>
              <Box>
                <img className={classes.productImg} src={product.img} alt="product" />
              </Box>
              <Box mt={2} mb={2}>
                <Box className={classes.content}>{product.name}</Box>
                <Box className={classes.content}>{product.numReviews}</Box>
                <Box className={classes.content}>{product.price}</Box>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Card;
