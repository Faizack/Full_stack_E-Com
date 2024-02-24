import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { NewProductRequestBody, UpdateProductFields,searchProductFields } from "../types/types.js";
import ErrorHandler from "../utils/utitlity.js";
import { myCache } from "../app.js";
import { json } from "stream/consumers";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    console.log("New Product Data :", name, photo, price, stock, category);
    if (!photo) return next(new ErrorHandler("No Photo found!", 400));

    if (myCache.has("products")) {
      myCache.del("products");
    }
    const product = await Product.create({
      name,
      photo: photo?.path,
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
    let product;
    if (myCache.has("products")){
      product=JSON.parse(myCache.get("products") as string )
    }else{
    product = await Product.find();
    myCache.set("products",JSON.stringify(product))
    }
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
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return next(new ErrorHandler("Invalid ID passed", 400));

    const product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Product not found", 404));

    return res.status(200).json({
      success: true,
      message: `Get Product`,
      product,
    });
  }
);

export const categories = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.distinct("category");

    if (!product) return next(new ErrorHandler(" no Category found", 404));

    return res.status(200).json({
      success: true,
      message: `Category`,
      product,
    });
  }
);

export const latestProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.find().limit(2);


    if (!product || product.length === 0)
      return next(new ErrorHandler(" no Product found", 404));

    return res.status(200).json({
      success: true,
      message: `Latest 5 `,
      product,
    });
  }
);

export const deleteProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    if (!_id.match(/^[0-9a-fA-F]{24}$/))
      return next(new ErrorHandler("Invalid ID passed", 400));

    const product = await Product.deleteOne({ _id });

    if (product.deletedCount === 0)
      return next(new ErrorHandler("Product not found", 404));

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  }
);

export const updateProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const { name, price, stock, category,id } = req.body;

    if (!id)  return next(new ErrorHandler("No ID provided", 400));
    

    if (!id.match(/^[0-9a-fA-F]{24}$/)) return next(new ErrorHandler("Invalid Id Format", 400));

    const photo = req.file;
    console.log( name, price, stock, category)
    const updateFields:UpdateProductFields = {};
    if (name) updateFields.name = name;
    if (price) updateFields.price = price;
    if (stock) updateFields.stock = stock;
    if (category) updateFields.category = category;
    if (photo) updateFields.photo = photo?.path;   

    console.log("updateFields", updateFields);

    const product = await Product.findOneAndUpdate({ "_id":id }, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!product)
      return next(new ErrorHandler("Product not found or updated", 404));

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  }
);


