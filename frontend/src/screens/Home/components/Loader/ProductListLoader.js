import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginBottom: 10,
  },
  media: {
    height: 200,
  },
  root: {
    flexGrow: 1,
  },
});

const HomeLoader = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {Array(8)
        .fill()
        .map((item, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card className={classes.card}>
                <CardActionArea>
                  <SkeletonTheme color="lightGray">
                    <CardMedia className={classes.media}>
                      <Skeleton height={200} width={'100%'} />
                    </CardMedia>
                    <CardContent>
                      <Skeleton width={`100%`} />
                      <br />
                      <Skeleton width={`60%`} />
                      <br />
                      <Skeleton width={`30%`} />
                      <br />
                      <Skeleton width={`40%`} />
                    </CardContent>
                  </SkeletonTheme>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default HomeLoader;
