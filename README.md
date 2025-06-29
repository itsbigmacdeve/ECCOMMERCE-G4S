# ECCOMMERCE-G4S

---
## Explicación del proyecto
Este proyecto es un e-commerce básico que incluye un back-end en Node.js con Express y una interfaz de usuario en React. El objetivo es proporcionar una plataforma funcional para la compra de productos, con autenticación de usuarios y gestión de pedidos.

El back-end esta montado en un app service de Azure y la base de datos en Azure Database for MySQL Flexible Server. El front-end está desplegado en Vercel.

Link al proyecto: https://eccommerce-g4-s.vercel.app/login

## ⚒️ BACK-END (Node.js + Express)

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

### 🔹 3. Backend

- Inicialización del proyecto con:

```bash
cd back-end
npm init -y
npm install express mysql2 cors dotenv bcrypt jsonwebtoken
npm install --save-dev nodemon
npm run dev
```

- Estructura principal del API:
  - `routes/`: Expone los endpoints para que puedan ser consumidos
  - `controllers/`: Maneja la lógica de negocio según el endpoint
  - `models/`: Conexión directa a la base de datos, ejecuta SPs/SQL
  - `middleware/`: Controla rutas protegidas con JWT
  - `server.js`: Punto de entrada del servidor Express
  - `.env`: Configuración de variables de entorno (DB, JWT_SECRET, etc.)
  - `db.js`: Configuración de conexión a la base de datos MySQL

-- Estructura de env:

```plaintext
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-jwt-secret
```

---

### 🔹 4. Funcionalidades implementadas

#### 🧾 Productos:

- `GET /api/products` → Listar todos los productos 
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

## 💻 FRONT-END (React + Bootstrap + Vercel)

### 🔹 1. Frontend

- Inicialización del proyecto con:

```bash
cd front-end
npx create-react-app@latest g4s
npm install axios react-router react-router-dom bootstrap react-bootstrap jwt-decode
npm install boostrap @popperjs/core
npm start
```

- Estructura principal del Frontend:
  - `src/`: Contiene los componentes y páginas principales
  - `src/services/`: Maneja las peticiones HTTP al backend (productos, carrito, autenticación, checkout)
  - `src/context/`: Implementa Context API para el manejo de sesión y carrito
  - `src/components/`: Componentes reutilizables como `Navbar`, `ProductList`, `Cart`, `PrivateRoute`
  - `src/pages/`: Páginas principales como `Home`, `Cart`, `Login`, `Register`
  - `App.js`: Configuración de rutas y navegación
  - `index.js`: Punto de entrada de la aplicación y configuración de Bootstrap
  - `.env` : Localmente guadará la URL del backend por ejemplo: `REACT_APP_API_URL=http://localhost:3000/api`

## 🧠 Uso de IA en este proyecto

- Generación del esquema SQL con ChatGPT
- Diseño de endpoints, lógica de autenticación y JWT
- Generación y validación de Store Procedures
- Ayuda en la estructuración del backend por capas
- Generación de componentes del frontend como `ProductList`, `Cart` y `Navbar`
- Implementación de `Context API` para el manejo de sesión y carrito de forma global

## 🔧 Correcciones realizadas al código generado por IA

- Se corrigió al momento de generar los archivos del server.js para que las rutas sean las que se contemplan en el proyecto, y en cada route.js del backend.
- Se corrigió la implementación del carrito para que se actualizaran cada que se agregara un producto, que se hicierra el checkout y que se iniciara sesión.
- Se corrigió la sintaxis en sql para que eliminara el store y lo volviera a crear en dado caso que tuviera una modificación , este se vuelva a crear con la nueva implementación.
- Se corrigió la implementación del checkout para que se hiciera de forma correcta, y se eliminaran los productos del carrito al momento de hacer el checkout, ya que antes no se eliminaban.
- Se mejoró visualmente la tarjeta del producto, para que se viera más atractiva y se pudiera ver el nombre del producto, la descripción, el precio y la imagen.
- Se modificó visualmmente el carrito de la navbar para que mostrara el número de productos que se tienen en el carrito.
