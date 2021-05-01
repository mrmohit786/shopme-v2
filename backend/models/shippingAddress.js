import mongoose from 'mongoose';

const shippingAddressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ShippingAddress = mongoose.model(
  'shippingAddress',
  shippingAddressSchema
);
export default ShippingAddress;
