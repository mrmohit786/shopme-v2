import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
    background: 'grey',
    maxWidth: 300,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
  },
});

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
};

const CategoryList = ({ categories }) => {
  const classes = useStyles();
  return (
    <Carousel arrows={false} infinite swipeable draggable responsive={responsive}>
      {categories?.map((category, index) => (
        <Card
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          key={index}
          className={classes.root}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              {category.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Card component={motion.div} whileHover={{ scale: 1.05 }} className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Gaming
          </Typography>
        </CardContent>
      </Card>
      <Card component={motion.div} whileHover={{ scale: 1.05 }} className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Computer
          </Typography>
        </CardContent>
      </Card>
    </Carousel>
  );
};

export default CategoryList;
