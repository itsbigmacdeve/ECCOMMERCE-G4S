import {
  createOrderModel,
  insertOrderItemModel,
  getProductByIdModel,
  reduceStock
} from '../models/orderModel.js';

import { carts } from './cartController.js';

export const checkout = async (req, res) => {
  const userId = req.user.userId;
  const cart = carts[userId];

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío' });
  }

  try {
    let total = 0;

    // Validar stock y calcular total
    for (const item of cart) {
      const product = await getProductByIdModel(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Producto ID ${item.productId} no encontrado` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Stock insuficiente para: ${product.name}` });
      }

      total += product.price * item.quantity;
    }

    // Crear la orden
    const orderId = await createOrderModel(userId, total);

    // Insertar los productos y restar stock
    for (const item of cart) {
      const product = await getProductByIdModel(item.productId);

      await insertOrderItemModel(orderId, item.productId, item.quantity, product.price);
      await reduceStock(item.productId, item.quantity);
    }

    // Vaciar carrito
    carts[userId] = [];

    res.status(201).json({ message: 'Orden creada exitosamente', orderId });
  } catch (error) {
    console.error('Error al procesar checkout:', error);
    res.status(500).json({ error: 'Error al procesar la orden' });
  }
};
