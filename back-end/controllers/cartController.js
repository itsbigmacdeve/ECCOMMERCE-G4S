import {
  getProductByIdModel,
} from '../models/orderModel.js';
// Carrito en memoria
const carts = {}; 

export const addToCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Faltan datos del producto o cantidad' });
  }

  try {
    const product = await getProductByIdModel(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (!carts[userId]) {
      carts[userId] = [];
    }

    const existingItem = carts[userId].find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      carts[userId].push({
        productId,
        quantity,
        name: product.name,
        price: parseFloat(product.price)
      });
    }

    res.status(200).json({ message: 'Producto agregado al carrito', cart: carts[userId] });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error interno al agregar al carrito' });
  }
};

export const getCart = (req, res) => {
  try {
    const userId = req.user.userId;
    const userCart = carts[userId] || [];
    res.json(userCart);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error interno al obtener el carrito' });
  }
};

export const deleteItemFromCart = (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ error: 'Falta el ID del producto' });
  }
  try {
    if (!carts[userId]) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const itemIndex = carts[userId].findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    carts[userId].splice(itemIndex, 1);
    res.status(200).json({ message: 'Producto eliminado del carrito', cart: carts[userId] });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ error: 'Error interno al eliminar del carrito' });
  }
}

export const deleteCart = (req, res) => {
  const userId = req.user.userId;
  try {
    if (!carts[userId]) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    delete carts[userId];
    res.status(200).json({ message: 'Carrito eliminado' });
  } catch (error) {
    console.error('Error al eliminar el carrito:', error);
    res.status(500).json({ error: 'Error interno al eliminar el carrito' });
  } 
}


export { carts };