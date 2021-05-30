import { Grid, Box, Divider, useMediaQuery, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FolderIcon from '@material-ui/icons/Folder';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import InstagramIcon from '@material-ui/icons/Instagram';
import styles from './styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { APPLICATION_NAME } from 'utils/constants';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Footer = () => {
  const classes = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const shopMe = [
    {
      link: 'abcdef',
      text: 'Who We Are',
    },
    {
      link: 'abcdef',
      text: 'Join Our Team',
    },
    {
      link: 'abcdef',
      text: 'Terms & Conditions',
    },
    {
      link: 'abcdef',
      text: 'We Respect Your Privacy',
    },
    {
      link: 'abcdef',
      text: 'Fees & Payments',
    },
    {
      link: 'abcdef',
      text: 'Returns & Refunds Policy',
    },
    {
      link: 'abcdef',
      text: 'Promotions Terms & Conditions',
    },
  ];
  const help = [
    {
      link: 'abcdef',
      text: 'Track Your Order',
    },
    {
      link: 'abcdef',
      text: 'Frequently Asked Questions',
    },
    {
      link: 'abcdef',
      text: 'Returns',
    },
    {
      link: 'abcdef',
      text: 'Cancellations',
    },
    {
      link: 'abcdef',
      text: 'Payments',
    },
    {
      link: 'abcdef',
      text: 'Customer Care',
    },
    {
      link: 'abcdef',
      text: 'How Do I Redeem My Coupon',
    },
  ];

  const shopBy = [
    {
      link: 'abcdef',
      text: 'Men',
    },
    {
      link: 'abcdef',
      text: 'Women',
    },
    {
      link: 'abcdef',
      text: 'Kids',
    },
    {
      link: 'abcdef',
      text: 'Indie',
    },
    {
      link: 'abcdef',
      text: 'Stores',
    },
    {
      link: 'abcdef',
      text: 'New Arrivals',
    },
    {
      link: 'abcdef',
      text: 'Brand Directory',
    },
    {
      link: 'abcdef',
      text: 'Home',
    },
    {
      link: 'abcdef',
      text: 'Collections',
    },
  ];

  const followUs = [
    {
      link: 'https://facebook.com',
      text: 'Facebook',
    },
    {
      link: 'https://instagram.com',
      text: 'Instagram',
    },
    {
      link: 'https://twitter.com',
      text: 'Twitter',
    },
  ];

  return (
    <>
      {isMobile ? (
        <Box className={classes.smFooterDiv}>
          <Tabs value={value} onChange={handleChange} indicatorColor="none">
            <Tab className={`${classes.btn} ${classes.logoBtn}`} label="SHOPME" {...a11yProps(0)} />
            <Tab className={`${classes.btn} ${classes.helpBtn}`} label="Help" {...a11yProps(1)} />
            <Tab
              className={`${classes.btn} ${classes.shopBtn}`}
              label="Shop By"
              {...a11yProps(2)}
            />
            <Tab
              className={`${classes.btn} ${classes.followBtn}`}
              label="Follow us"
              {...a11yProps(3)}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            {shopMe.map((data, index) => (
              <Box key={index}>
                <Link className={classes.blackColor} to={data.link}>
                  {data.text}
                </Link>
              </Box>
            ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {help.map((data, index) => (
              <Box key={index}>
                <Link className={classes.blackColor} to={data.link}>
                  {data.text}
                </Link>
              </Box>
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {shopBy.map((data, index) => (
              <Box key={index}>
                <Link className={classes.blackColor} to={data.link}>
                  {data.text}
                </Link>
              </Box>
            ))}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {followUs.map((data, index) => (
              <Box key={index}>
                <Link className={classes.blackColor} to={data.link}>
                  {data.text}
                </Link>
              </Box>
            ))}
          </TabPanel>
        </Box>
      ) : (
        <div className={classes.bgColor}>
          <Grid container className={classes.grdContainer}>
            <Grid item md={3} className={classes.text}>
              <Box mt={2}>{APPLICATION_NAME}</Box>
              <Box mt={2} className={classes.whiteColor}>
                {shopMe.map((data, index) => (
                  <Box key={index}>
                    <Link className={classes.whiteColor} to={data.link}>
                      {data.text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item md={3} className={classes.text}>
              <Box mt={2}>Help</Box>
              <Box mt={2} className={classes.whiteColor}>
                {help.map((data, index) => (
                  <Box key={index}>
                    <Link className={classes.whiteColor} to={data.link}>
                      {data.text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item md={3} className={classes.text}>
              <Box mt={2}>Shop By</Box>
              <Box mt={2} className={classes.whiteColor}>
                {shopBy.map((data, index) => (
                  <Box key={index}>
                    <Link className={classes.whiteColor} to={data.link}>
                      {data.text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item md={3} className={classes.text}>
              <Box mt={2}>Follow us</Box>
              <Box mt={2} className={classes.whiteColor}>
                {followUs.map((data, index) => (
                  <Box key={index}>
                    <Link className={classes.whiteColor} to={data.link}>
                      {data.text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider className={classes.divider} />

              <Box className={classes.dFlex}>
                <Box className={classes.flex1}>
                  <Box my={2} className={classes.whiteColor}>
                    Payment Method
                  </Box>
                  <Box className={classes.iconBox}>
                    <Box className={classes.w10}>
                      <FlightTakeoffIcon fontSize="large" className={classes.whiteColor} />
                    </Box>
                    <Box className={classes.w10}>
                      <FolderIcon fontSize="large" className={classes.whiteColor} />
                    </Box>
                    <Box className={classes.w10}>
                      <DesktopWindowsIcon fontSize="large" className={classes.whiteColor} />
                    </Box>
                    <Box className={classes.w10}>
                      <InstagramIcon fontSize="large" className={classes.whiteColor} />
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Box my={2} className={classes.whiteColor}>
                    Secure System
                  </Box>
                  <Box textAlign="center">
                    <FlightTakeoffIcon fontSize="large" className={classes.whiteColor} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Footer;
