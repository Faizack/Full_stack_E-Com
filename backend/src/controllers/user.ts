import { Request, Response, NextFunction } from "express";
import { NewUserRequestBody } from "../types/types.js";
import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utitlity.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, gender, role, dob } = req.body;

    if (!name || !email || !photo || !gender || !role) {
      return next(new ErrorHandler("Please give all required parameters", 400));
    }

    const user = await User.create({
      name,
      email,
      photo,
      gender,
      role,
      dob: new Date(dob),
    });

    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.name} `,
    });
  }
);

export const allUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: `All users`,
      users,
    });
  }
);

export const getUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return next(new ErrorHandler("Invalid Format  ID", 400));

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Not Found User", 404));

    return res.status(200).json({
      success: true,
      message: `User`,
      user,
    });
  }
);

export const deleteUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return next(new ErrorHandler("Invalid Format  ID", 400));

    const user = await User.deleteOne({ _id: id });

    if (user.deletedCount === 0)
      return next(new ErrorHandler("User not found", 404));

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }
);
