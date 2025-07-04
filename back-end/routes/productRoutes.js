import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllProductsController } from "../controllers/productController.js";
import { getProductByIdController } from "../controllers/productController.js";

const router = Router();

// Ruta para obtener todos los productos
router.get("/", getAllProductsController);

//Ruta para obtener un producto en específico por ID
router.get('/:id', getProductByIdController);


// Exportar el router
export default router;

