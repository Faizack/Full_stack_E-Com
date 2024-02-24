import { Router} from 'express';

import adminOnly from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';

import { allProduct, categories, deleteProduct, getProduct, latestProduct, newProduct,  updateProduct } from '../controllers/product.js';

const router = Router();

router.post('/new',singleUpload,newProduct);
router.get('/all',adminOnly,allProduct);

router.get('/latest',latestProduct)
router.get('/categories',categories);

router.route('/:id').get(getProduct)
router.put("/update",updateProduct);

router.delete('/',adminOnly,deleteProduct);




export default router;