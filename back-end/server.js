import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connection } from './db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('API funcionando correctamente 🔥');
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
