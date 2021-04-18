import mongoose from 'mongoose';

const subCategorySchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const SubCategory = mongoose.model('subCategory', subCategorySchema);
export default SubCategory;
