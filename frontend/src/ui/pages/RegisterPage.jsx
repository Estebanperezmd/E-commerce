import { useState } from "react";
import "./LoginPage.css"; // reutiliza el estilo de tarjetas ya creado
import { useNavigate } from "react-router-dom";
import { repositories } from "../../app/dependencies";
import { useAuth } from "../../app/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // --------------------------
  // VALIDACIONES EN TIEMPO REAL
  // --------------------------
  const emailValido = correo.includes("@") && correo.includes(".");
  const contraseñaCoincide = contraseña === confirmar && contraseña.length >= 4;

  const formValido =
    nombre.trim() !== "" &&
    emailValido &&
    contraseñaCoincide &&
    contraseña !== "" &&
    confirmar !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValido) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Llamada al microservicio de usuarios
      const res = await fetch("http://localhost:3002/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          correo,
          contraseña,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "No se pudo crear el usuario");
      }

      const user = await res.json();
      console.log("Usuario creado:", user);

      setSuccess("Usuario registrado con éxito ✔");

      // OPCIONAL: iniciar sesión automáticamente
      setAuth({ user, token: null });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="login-card">
        <h1 className="login-title">Crear cuenta</h1>
        <p className="login-subtitle">Regístrate para continuar</p>

        <form onSubmit={handleSubmit} className="login-form">
          {/* NOMBRE */}
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>

          {/* CORREO */}
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
            {!emailValido && correo.length > 0 && (
              <p className="login-error">Formato de correo inválido</p>
            )}
          </div>

          {/* CONTRASEÑA */}
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {/* CONFIRMAR CONTRASEÑA */}
          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              placeholder="Repite tu contraseña"
              required
            />
            {confirmar.length > 0 && !contraseñaCoincide && (
              <p className="login-error">Las contraseñas no coinciden</p>
            )}
          </div>

          {error && <p className="login-error">{error}</p>}
          {success && <p className="login-success">{success}</p>}

          <button
            className="login-button"
            type="submit"
            disabled={!formValido || loading}
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

          <p className="login-footnote">
            ¿Ya tienes cuenta?{" "}
            <b
              style={{ cursor: "pointer", color: "#3a6cf6" }}
              onClick={() => navigate("/login")}
            >
              Inicia sesión
            </b>
          </p>
        </form>
      </div>
    </div>
  );
}
