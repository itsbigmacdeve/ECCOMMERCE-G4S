import { Router } from 'express';
import { addToCart, getCart, deleteItemFromCart , deleteCart} from '../controllers/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/add', verifyToken, addToCart);
router.get('/', verifyToken, getCart);

router.post('/deleteById',verifyToken,deleteItemFromCart); 
router.delete('/deleteCart', verifyToken, deleteCart);

export default router;
