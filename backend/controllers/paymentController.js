import asynchandler from 'express-async-handler';
import env from '../config/env.js';
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY);

// @desc Create stripe payment
// @route POST /api/payment/stripe
// @access Private
export const createPayment = asynchandler(async (req, res) => {
  const { name, email, amount, currency, userId, orderId } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    name,
    metadata: {
      integration_check: 'accept_a_payment',
      userId: userId,
      orderId: orderId,
    },
    receipt_email: email,
  });

  if (paymentIntent) {
    res.status(201).json({ client_secret: paymentIntent['client_secret'] });
  } else {
    throw new Error('Payment cannot be completed.');
  }
});

// @desc stripe webhooks
// @route POST /api/payment/stripe/webhooks
// @access Public
export const stripeWebhooks = asynchandler(async (req, res) => {
  let event;
  try {
    event = req.body;
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const email = event['data']['object']['receipt_email'];
      console.log(`PaymentIntent was successful for ${email}!`);
      break;
    }
    default:
      return res.status(400).end();
  }
  res.status(200).json({ received: true });
});
