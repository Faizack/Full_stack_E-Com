import { NextFunction,Request,Response } from "express";
import mongoose from "mongoose";

export interface NewUserRequestBody {
    _id: string;
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: Date;
}

export interface NewProductRequestBody {
    name: string;
    photo: string;
    price: number;
    stock: number;
    category: string;
}

export interface UpdateProductFields {
    name?: string;
    price?: number;
    stock?: number;
    category?: string;
    photo?: string; 
  }

  export interface searchProductFields {
    search?: string;
    price?: {
        minPrice?: number;
        maxPrice?: number;
    };
    sort?: number;
    category?: string;
    page?: number;
}


export type ControllerType = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;


export interface NewOrderRequestBody {
    name: string;
    photo: string;
    price: number;
    quantity: number;
}
export interface NewCouponRequestBody {
    code: string;
    amount: number;
}

interface OrderItem {
    productId: mongoose.ObjectId;
    quantity: number;
}

interface ShippingInfo {
    address: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
}

export interface NewOrderRequestBody  {
    ShippingInfo: ShippingInfo;
    user: mongoose.ObjectId; 
    subtotal: number;
    tax: number;
    discount: number;
    shippingCharges: number;
    total: number;
    orderItems: OrderItem[];
}


