import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    description: String,
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Product || mongoose.model("Product", ProductSchema);
