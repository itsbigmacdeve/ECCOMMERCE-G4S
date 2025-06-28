import { Router } from 'express';
import { checkout } from '../controllers/checkoutController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, checkout);

export default router;
