import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    description: { type: String, required: true, maxlength: 80 },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('category', categorySchema);
export default Category;
