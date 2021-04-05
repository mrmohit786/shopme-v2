import asynchandler from 'express-async-handler';
import Order from '../models/orders.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
export const addOrderItems = asynchandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
  }

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);

  res.json(products);
});
