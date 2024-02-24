import { Schema, model,Types } from "mongoose";

const schema = new Schema(  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId().toHexString()
    },
    ShippingInfo:{
        address: {
            type: String,
            required: [true, "Please Enter Address"]
        },
        city: {
            type: String,
            required: [true, "Please Enter City"]
        },
        state: {
            type: String,
            required: [true, "Please Enter State"]
        },
        pincode: {
            type: Number,
            required: [true, "Please Enter Zip"]
        },
        country: {
            type: String,
            required: [true, "Please Enter Country"]
        }
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"

    },
    subtotal:{
        type: Number,
        required: [true, "Please Enter Subtotal"]
    },
    tax:{
        type: Number,
        required: [true, "Please Enter Tax"]
    },
    discount:{
        type: Number,
        required: [true, "Please Enter Discount"]
    },
    shippingCharges:{
        type: Number,
        required: [true, "Please Enter Shipping Charges"]
    },
    total:{
        type: Number,
        required: [true, "Please Enter Total"]
    },
    orderItems:[{
        name:{
            type: String,
            required: [true, "Please Enter Name"]
        },
        price:{
            type: Number,
            required: [true, "Please Enter Price"]
        },
        photo:{
            type: String,
            required: [true, "Please Enter Photo"]
        },
        productId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please Enter Product ID"]
        },
        quantity:{
            type: Number,
            required: [true, "Please Enter Quantity"]
        }

    }]
});

export  const Order = model('Order', schema);
