# ECCOMMERCE-G4S

---

## 🔧 Pasos realizados 

### 🔹 1. Inicialización del repositorio
- Repo público en GitHub llamado `ECCOMMERCE-G4S`.
- Estructura de carpetas `back-end` y `front-end` creada manualmente.

---

### 🔹 2. Base de datos
- Creada en **Azure Database for MySQL Flexible Server**.
- Script `schema.sql` desarrollado con 4 tablas:
  - `users`, `products`, `orders`, `order_items`
- Se añadieron 5 productos de ejemplo.

---

### 🔹 3. Backend (Node.js + Express)
- Inicialización del proyecto con:

```bash
cd back-end
npm init -y
npm install express mysql2 cors dotenv bcrypt jsonwebtoken
npm install --save-dev nodemon
```

- Se crearon los métodos para:
  - Obtener todos los productos
  - Obtener un producto por ID específico

- Estructura principal del API:
  - `routes/`: Expone los endpoints para que puedan ser consumidos
  - `controllers/`: Maneja la lógica de negocio según el endpoint
  - `models/`: Conexión directa a la base de datos, ejecuta SPs/SQL
  - `middleware/`: Controla rutas protegidas con JWT

---

### 🔹 4. Funcionalidades implementadas

#### 🧾 Productos:
- `GET /api/products` → Listar todos los productos (**protegido con JWT**)
- `GET /api/products/:id` → Obtener un producto por ID

#### 👤 Autenticación:
- `POST /api/users/register` → Registro de usuario con bcrypt y SP
- `POST /api/users/login` → Login + generación de JWT token
- Middleware `verifyToken` para proteger rutas con token

#### 🛒 Carrito (en memoria):
- `POST /api/cart/add` → Agrega producto al carrito por `userId`
- `GET /api/cart` → Devuelve el carrito del usuario autenticado

#### 💳 Checkout:
- `POST /api/checkout` → Inserta orden (`orders`) y detalle (`order_items`) usando SPs
- Validaciones:
  - Existencia de stock
  - Cálculo del total
  - Resta automática del stock
  - Limpieza del carrito al finalizar

---

### 🔹 5. Uso de IA en este proyecto

- Generación del esquema SQL con ChatGPT
- Diseño de endpoints, lógica de autenticación y JWT
- Generación y validación de Store Procedures
- Ayuda en la estructuración del backend por capas
