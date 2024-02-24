import { Router} from 'express';
import { allOrder, myOrder, newOrder, singleOrder } from '../controllers/order.js';
import adminOnly from '../middlewares/auth.js';



const router = Router();

router.post('/new',newOrder);
router.get('/my',myOrder);
router.get('/all',adminOnly,allOrder)
router.get('/:id',singleOrder)




export default router;