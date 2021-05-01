import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { makeStyles } from '@material-ui/core/styles';
import CardInput from './components/StripeCard';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
});

function StripePayment({ userDetails }) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (event) => {
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const res = await axios.post('http://localhost:3005/pay', {
      email: userDetails.user.email,
      name: userDetails.user.name,
    });

    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: userDetails.user.email,
          name: userDetails.user.name,
        },
      },
    });

    if (result.error) {
      setLoading(false);
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setLoading(false);
        console.log('Money is in the bank!');
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <CardInput />
        <div className={classes.div}>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            className={classes.button}
            onClick={handleSubmitPay}
          >
            PLACE ORDER
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// const mapActionToProps = { updatePlanUpgraded };

const mapStateToProps = (state) => ({
  userDetails: state.userDetails,
});

export default connect(mapStateToProps)(StripePayment);
