# ECCOMMERCE-G4S


---

## 🔧 Pasos realizados hasta ahora

### 🔹 1. Inicialización del repositorio
- Repo público en GitHub llamado `ECCOMMERCE-G4S`.
- Estructura de carpetas `back-end` y `front-end` creada manualmente.

### 🔹 2. Base de datos
- Creada en **Azure Database for MySQL Flexible Server**.
- Script `schema.sql` desarrollado con 4 tablas:
  - `users`, `products`, `orders`, `order_items`
- Se añadieron 5 productos de ejemplo.


### 🔹 3. Backend (Node.js + Express)
- Inicialización del proyecto con:
  ```bash
  cd back-end
  npm init -y
  npm install express mysql2 cors dotenv bcrypt jsonwebtoken

