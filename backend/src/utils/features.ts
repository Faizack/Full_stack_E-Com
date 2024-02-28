import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { OrderItem } from "../types/types.js";

export const connectDB = async (MongoDB_URL: string) => {
  try {
    await mongoose.connect(MongoDB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export const reduceStock = async (orderItems: OrderItem[]) => {
  for (const orderItem of orderItems) {
    const { productId, quantity } = orderItem;
    // Retrieve the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    // Reduce the stock
    product.stock -= quantity;

    // Save the updated product
    await product.save();
  }
};
