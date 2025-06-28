import { connection } from '../db.js';

export const createOrderModel = async (userId, total) => {
  const [rows] = await connection.query('CALL CreateOrder(?, ?, @order_id); SELECT @order_id;', [userId, total]);
  const orderId = rows[1][0]['@order_id'];
  return orderId;
};

export const insertOrderItemModel = async (orderId, productId, quantity, priceAtPurchase) => {
  await connection.query(
    'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
    [orderId, productId, quantity, priceAtPurchase]
  );
};

export const getProductByIdModel = async (id) => {
  const [rows] = await connection.query('CALL GetProductById(?)', [id]);
  return rows[0][0];
};

export const reduceStock = async (productId, quantity) => {
  await connection.query(
    'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
    [quantity, productId, quantity]
  );
};
