import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { NewCouponRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utitlity.js";
import Coupon from "../models/coupon.js";



export const newCoupon = TryCatch(
  async (
    req: Request<{}, {}, NewCouponRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { code, amount } = req.body;

    if (!code || !amount) return next(new ErrorHandler("Please provide all required parameters", 400));

    const coupon = await Coupon.create({
      code,
      amount,
    });

    return res.status(200).json({
      success: true,
      message: `Coupon Created `,
      coupon,
    });
  }
);

export const deleteCoupon = TryCatch(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const couponId = req.params.id;

      if (!couponId) {
        return next(new ErrorHandler("Please provide ID", 400));
      }

      // Find the coupon by ID and delete it
      const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

      if (!deletedCoupon) {
        return next(new ErrorHandler("Coupon not found", 404));
      }

      return res.status(200).json({
        success: true,
        message: "Coupon deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to delete coupon", 500));
    }
  }
);

export const getSingleCoupon = TryCatch(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const couponId = req.params.id;

      if (!couponId) {
        return next(new ErrorHandler("Please provide ID", 400));
      }


      // Find the coupon by ID
      const coupon = await Coupon.findById(couponId);

      if (!coupon) {
        return next(new ErrorHandler("Coupon not found", 404));
      }

      return res.status(200).json({
        success: true,
        coupon,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to get coupon", 500));
    }
  }
);

export const getAllCoupons = TryCatch(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Retrieve all coupons from the database
      const coupons = await Coupon.find();

      return res.status(200).json({
        success: true,
        coupons,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to get coupons", 500));
    }
  }
);
