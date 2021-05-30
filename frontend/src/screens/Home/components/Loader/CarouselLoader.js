import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 20,
  },
  details: {
    margin: 'auto 0',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 609,
    minHeight: 300,
  },
}));

const CarouselLoader = () => {
  const classes = useStyles();
  return (
    <SkeletonTheme color="lightGray">
      <Card className={classes.root}>
        <CardMedia className={classes.cover}>
          <Skeleton width={609} height={300} />
        </CardMedia>

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              <Skeleton width={100} />
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <Skeleton width={200} />
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <Skeleton width={400} />
            </Typography>
          </CardContent>
        </div>
      </Card>
    </SkeletonTheme>
  );
};

export default CarouselLoader;
