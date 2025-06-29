import React, { useEffect, useState, useContext } from "react";
import {
  getCart,
  deleteItemFromCart,
  deleteCart,
} from "../services/cartService";
import { checkout } from "../services/checkoutService";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { fetchCart } = useContext(CartContext);

  useEffect(() => {
    fetchCartC();
  }, []);

  const fetchCartC = async () => {
    try {
      const res = await getCart();
      setCart(res.data);

      // Opcional: Calcular total si el backend aún no lo da
      const totalCalculado = res.data.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(totalCalculado);
    } catch (err) {
      console.error("Error al cargar el carrito:", err);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await checkout();
      alert(`Orden #${res.data.orderId} creada con éxito`);
      setCart([]);
      setTotal(0);
      await fetchCart();
    } catch (err) {
      console.error("Error al realizar checkout:", err);
      const mensaje =
        err.response?.data?.error ||
        "No se pudo completar la orden. Intenta más tarde.";
      alert(mensaje);
    }
  };

  const handleDeleteCart = async () => {
    try {
      const res = await deleteCart();
      alert("Carrito eliminado con éxito");
      setCart([]);
      setTotal(0);
      await fetchCart();
    } catch (err) {
      console.error("Error al eliminar el carrito:", err);
      const mensaje =
        err.response?.data?.error ||
        "No se pudo eliminar el carrito. Intenta más tarde.";
      alert(mensaje);
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const res = await deleteItemFromCart(productId);
      alert("Producto eliminado del carrito");
      setCart(res.data.cart);
      const totalCalculado = res.data.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Recalcular total

      setTotal(totalCalculado);
      await fetchCart();
    } catch (err) {
      console.error("Error al eliminar el producto del carrito:", err);
      const mensaje =
        err.response?.data?.error ||
        "No se pudo eliminar el producto. Intenta más tarde.";
      alert(mensaje);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p className="text-muted">Tu carrito está vacío</p>
      ) : (
        <>
        <div className="table-responsive">
        <table className="table table-hover">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name || `Producto #${item.productId}`}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price?.toFixed(2) || "---"}</td>
                  <td>
                    $
                    {item.price
                      ? (item.price * item.quantity).toFixed(2)
                      : "---"}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteItem(item.productId)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-success mt-3" onClick={handleCheckout}>
            Finalizar pedido
          </button>
          <button
            className="btn btn-danger mt-3 ms-2"
            onClick={handleDeleteCart}
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
