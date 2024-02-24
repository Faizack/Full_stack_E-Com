import { Router} from 'express';
import { deleteCoupon, getAllCoupons, getSingleCoupon, newCoupon } from '../controllers/coupon.js';
import adminOnly from '../middlewares/auth.js';




const router = Router();

router.post('/coupon/new',newCoupon);
router.get('/coupon/:id',getSingleCoupon)
router.delete("/coupon/:id",adminOnly,deleteCoupon);
router.get('/coupon',getAllCoupons)
export default router;