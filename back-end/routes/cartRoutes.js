import { Router } from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/addCart', verifyToken, addToCart);
router.get('/getCart', verifyToken, getCart);

export default router;
