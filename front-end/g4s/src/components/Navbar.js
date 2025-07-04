import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";


const Navbar = () => {
  const { isLoggedIn,username, logout } = useContext(AuthContext);
  const { cartItemsCount } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand">
          G4S STORE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registro
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link disabled text-white">
                    Hola, {username}
                  </span>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Home">
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={logout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                      {cartItemsCount}
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
