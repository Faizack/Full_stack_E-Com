import { Router, Request, Response } from 'express';
import { allUser, deleteUser, getUser, newUser } from '../controllers/user.js';
import adminOnly from '../middlewares/auth.js';

const router = Router();

router.post('/new',newUser);
router.get('/all',adminOnly,allUser)

router.route('/:id').get(getUser).delete(adminOnly,deleteUser)


export default router;