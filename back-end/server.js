import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connection } from './db.js';

//Importacion de las rutas
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js'; 
import checkOutRoutes from './routes/checkOutRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/cart', cartRoutes); 
app.use('/api/checkout', checkOutRoutes);

app.get('/', async (req, res) => {
  res.send('API funcionando correctamente ');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    const conn = await connection.getConnection();
    await conn.ping();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
});
