import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utitlity.js";
import { myCache } from "../app.js";
import { Order } from "../models/order.js";
import { reduceStock } from "../utils/features.js";

export const newOrder = TryCatch(
  async (
    req: Request<{}, {}, NewOrderRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      shippingCharges,
      orderItems,
      ShippingInfo,
      tax,
      discount,
      subtotal,
      total,
      user,
      quantity,
    } = req.body;

    if (!shippingCharges ||!ShippingInfo ||!tax ||!discount ||!subtotal ||!total ||!user ||!quantity) {
      return next(new ErrorHandler("Please give all required parameters", 400));
    }
    const order = await Order.create({
        shippingCharges,
        orderItems,
        ShippingInfo,
        tax,
        discount,
        subtotal,
        total,
        user,
        quantity,
    })

    await reduceStock(orderItems)


    return res.status(200).json({
      success: true,
      message: `Order Created `,
      orderItems
    });
  }
);

export const myOrder = TryCatch(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
      const {userId }= req.body; 
      
      if(!userId) return next(new ErrorHandler("Require UserID",400))
      
      const orders = await Order.find({ user: userId });

      // Check if there are any orders
      if (orders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found for this user"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Orders found",
        orders: orders
      });
  }
);

export const allOrder = TryCatch(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
      
      const orders = await Order.find();

      // Check if there are any orders
      if (orders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found for this user"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Orders found",
        orders: orders
      });
  }
);

export const singleOrder = TryCatch(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const orderId = req.params.id;

      if(!orderId) return next(new ErrorHandler("No order ID provided",400))

      // Retrieve the order from the database
      const order = await Order.findById(orderId);

      // Check if the order exists
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Order found",
        order: order
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to retrieve order", 500));
    }
  }
);
