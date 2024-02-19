import { NextFunction,Response,Request } from "express";
import ErrorHandler from "../utils/utitlity.js";
import { TryCatch } from "./error.js"


const adminOnly=TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {

        const {key}=req.body;

        if (key!= "admin") 
            return next(new ErrorHandler("You are not authorized to access this route", 401));
        
        next();
    }
)

export default adminOnly