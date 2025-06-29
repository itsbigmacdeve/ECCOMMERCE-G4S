import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { addToCart } from "../services/cartService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); // 👈 cantidades por producto

  useEffect(() => {
    getProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value) || 1); // mínimo 1
    setQuantities({ ...quantities, [productId]: qty });
  };

  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId] || 1;
    try {
      await addToCart(productId, quantity);
      alert(`Agregado ${quantity} al carrito`);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Debes iniciar sesión para agregar al carrito");
    }
  };

return (
    <div className="container mt-4">
        <h2 className="mb-4 text-center">Productos Destacados</h2>
        <div className="row">
            {products.map((product) => (
                <div className="col-md-4 mb-4" key={product.id}>
                    <div className="card h-100 shadow-sm">
                        <img
                            src={product.imageUrl || "https://placehold.co/600x400/png"}
                            alt={product.name}
                            className="card-img-top"
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-primary">{product.name}</h5>
                            <p className="card-text text-muted">{product.description}</p>
                            <p className="card-text">
                                <span className="badge bg-info text-dark">{product.category}</span>
                            </p>
                            <p className="card-text fw-bold text-success">${product.price}</p>
                            <p className="card-text">
                                <span className={`badge ${product.stock > 0 ? "bg-success" : "bg-danger"}`}>
                                    {product.stock > 0 ? `En stock (${product.stock})` : "Agotado"}
                                </span>
                            </p>

                            {/* Input de cantidad */}
                            <div className="mb-2">
                                <label htmlFor={`qty-${product.id}`} className="form-label">Cantidad:</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="form-control"
                                    id={`qty-${product.id}`}
                                    value={quantities[product.id] || 1}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                />
                            </div>

                            <button
                                className="btn btn-primary mt-auto"
                                onClick={() => handleAddToCart(product.id)}
                            >
                                <i className="fa fa-cart-plus me-2"></i>
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default ProductList;
