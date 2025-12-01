import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { repositories } from "../../app/dependencies";
import { loginUser } from "../../core/usecases/loginUser";
import { useAuth } from "../../app/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginUser(repositories.authRepository, {
        emailOrUsername,
        password,
      });

      // 👉 Guardamos usuario + token en el contexto
      setAuth({
        user: result.user,
        token: result.token,
      });

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">
          Ingresa con tu cuenta para continuar.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Correo o usuario</label>
            <input
              type="text"
              placeholder="demo"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
    <p className="login-footnote">
      ¿No tienes cuenta?{" "}
      <button
        type="button"
        className="login-link"
        onClick={() => navigate("/register")}
      >
        Regístrate aquí
      </button>
    </p>

        </form>
      </div>
    </div>
  );
}
