import { Router, Request, Response } from 'express';
import adminOnly from '../middlewares/auth.js';
import { allProduct, categories, getProduct, newProduct } from '../controllers/product.js';
import { singleUpload } from '../middlewares/multer.js';

const router = Router();

router.post('/new',singleUpload,newProduct);
router.get('/all',adminOnly,allProduct);
router.get('/categories',categories);

router.route('/:id').get(getProduct);



export default router;