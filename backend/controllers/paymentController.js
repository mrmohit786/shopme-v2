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
// @access Private
export const stripeWebhooks = asynchandler(async (req, res) => {
  let event;
  const signature = req.headers['stripe-signature'];
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      // send an order confirmation email to your customer, log the sale in a database, or start a shipping workflow. You find the data response on  `event.data`
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_intent.created':
      console.log('PaymentIntent was created!');
      break;
    case 'payment_method.attached':
      console.log('PaymentMethod was attached to a Customer!');
      break;
    case 'payment_method.created':
      console.log('PaymentMethod was created!');
      break;
    case 'charge.succeeded':
      console.log('Charge succeeded!');
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed!');
      return res.status(400).end();
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  res.status(200).json({ received: true });
});
