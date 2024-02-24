import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true,"Enter the name of the coupon"]
  },
  amount: {
    type: Number,
    required: [true,"Enter the amount"]
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
