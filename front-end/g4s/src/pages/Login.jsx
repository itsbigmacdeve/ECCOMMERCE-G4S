import React, { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const { fetchCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(username, password);
      login(res.data.token, res.data.username); 
      await fetchCart(); 
      setMensaje({ tipo: "success", texto: "Inicio de sesión exitoso" });
      setTimeout(() => navigate("/Home"), 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Usuario o contraseña incorrectos";
      setMensaje({ tipo: "danger", texto: errorMessage });
    }
  };
  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo}`} role="alert">
          {mensaje.texto}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <p>
            ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
