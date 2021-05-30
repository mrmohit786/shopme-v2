import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 20,
  },
}));

const CategoryListLoader = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {Array(4)
        .fill()
        .map((item, index) => {
          return (
            <Grid className={classes.root} key={index} item xs={12} sm={3} md={4} lg={3} xl={2}>
              <SkeletonTheme color="lightGray">
                <Card>
                  <Skeleton width={296} height={88} />
                </Card>
              </SkeletonTheme>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default CategoryListLoader;
