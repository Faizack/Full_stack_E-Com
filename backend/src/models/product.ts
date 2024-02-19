import { Schema, model,Types } from "mongoose";

const schema = new Schema(  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId().toHexString()
    },
    name: {
        type: String,
        required: [true, "Please Enter Name"]
    },
    photo: {
        type: String,
        required: [true, "Please Enter Photo"]
    },
    price:{
        type: Number,
        required: [true, "Please Enter Price"]
    },
    stock:{
        type: Number,
        required: [true, "Please Enter Stock"]
    },
    category: {
        type: String,
        required: [true, "Please Enter Category"]
    }
});

export  const Product = model('Product', schema);
