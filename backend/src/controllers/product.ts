import { Request, Response, NextFunction } from "express";
import { NewProductRequestBody, NewUserRequestBody } from "../types/types.js";
import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utitlity.js";
import { Product } from "../models/product.js";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {},NewProductRequestBody >,
    res: Response,
    next: NextFunction
  ) => {
    const {name,price,stock,category}=req.body
    const photo = req.file
    console.log("New Product Data :",name,photo,price,stock,category)
    if(!photo) return next(new ErrorHandler("No Photo found!",400))
    
    const product = await Product.create({
      name,
      photo:photo?.path,
      price,
      stock,
      category,
    });


    return res.status(200).json({
      success: true,
      message: `Product add, ${product.name} `,
    });
  }
);

export const allProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.find();
    return res.status(200).json({
      success: true,
      message: `All Product`,
      product,
    });
  }
);

export const getProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return next(new ErrorHandler("Invalid ID passed",400));

    const product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Product not found",404));

    return res.status(200).json({
      success: true,
      message: `Get Product`,
      product,
    });
  }
)

export const categories = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {

    const product = await Product.distinct("category");

    if (!product) return next(new ErrorHandler(" no Category found",404));

    return res.status(200).json({
      success: true,
      message: `Category`,
      product,
    });
  }
)