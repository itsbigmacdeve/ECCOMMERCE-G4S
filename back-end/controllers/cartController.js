// Carrito en memoria
const carts = {}; 

export const addToCart = (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Faltan datos del producto o cantidad' });
  }

  if (!carts[userId]) {
    carts[userId] = [];
  }

  // Si ya existe el producto en el carrito, actualiza cantidad
  const existingItem = carts[userId].find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity });
  }

  res.status(200).json({ message: 'Producto agregado al carrito', cart: carts[userId] });
};

export const getCart = (req, res) => {
  const userId = req.user.userId;
  const userCart = carts[userId] || [];
  res.json(userCart);
};

export { carts };// Exportamos el carrito para poder usarlo en otros controladores, como checkoutController.js