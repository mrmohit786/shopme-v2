import mongoose from 'mongoose';

const productTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    description: { type: String, required: true, maxlength: 80 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'category',
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'subCategory',
    },
  },
  {
    timestamps: true,
  }
);

const ProductType = mongoose.model('productType', productTypeSchema);
export default ProductType;
