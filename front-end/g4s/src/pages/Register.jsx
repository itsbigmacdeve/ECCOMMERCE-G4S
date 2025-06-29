import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que no haya espacios en el usuario
    if (/\s/.test(username)) {
      setMensaje({
        tipo: "danger",
        texto: "El nombre de usuario no debe contener espacios.",
      });
      return;
    }

    try {
      await registerUser(username, password);
      setMensaje({ tipo: "success", texto: "¡Usuario registrado!" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const mensaje = err.response?.data?.error;
      setMensaje({ tipo: "danger", texto: mensaje || "Error al registrar" });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
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
        <button type="submit" className="btn btn-success">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
