import React, { useEffect, useState } from "react";
import { getCart } from "../services/cartService";
import { checkout } from "../services/checkoutService";


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
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
    } catch (err) {
      console.error("Error al realizar checkout:", err);
      const mensaje = err.response?.data?.error || "No se pudo completar la orden. Intenta más tarde.";
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
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
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
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-success mt-3" onClick={handleCheckout}>
            Finalizar pedido
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
