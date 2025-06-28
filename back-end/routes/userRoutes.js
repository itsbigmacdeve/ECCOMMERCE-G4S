import { Router } from "express";
import { registerUserController , loginUserController} from "../controllers/userController.js";
const router = Router();

//Ruta para registrar un nuevo usuario
router.post("/register", registerUserController);
//Ruta para iniciar sesión y devolver un token JWT
router.post("/login", loginUserController);

// Exportar el router
export default router;