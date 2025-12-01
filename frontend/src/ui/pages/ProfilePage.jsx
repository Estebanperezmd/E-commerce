import AppLayout from "../components/AppLayout";
import { useAuth } from "../../app/AuthContext";

const AUTH_KEY = "auth_data";

export default function ProfilePage() {
  const { auth } = useAuth();

  // 1) Intentar desde el contexto
  let user = auth?.user || null;

  // 2) Si viene null pero hay algo en localStorage, usarlo
  if (!user) {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        user = parsed.user || null;
      }
    } catch (e) {
      console.error("Error leyendo auth_data desde localStorage", e);
    }
  }

  if (!user) {
    return (
      <AppLayout title="Perfil" subtitle="">
        <p>No hay ningún usuario autenticado.</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Perfil" subtitle="Información de tu cuenta.">
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "1rem" }}>
          Hola,{" "}
          <span style={{ color: "#3b82f6" }}>
            {user.nombre || user.name || user.users}
          </span>
        </h2>

        <div
          style={{
            background: "#f9fafb",
            borderRadius: "12px",
            padding: "1.2rem 1.4rem",
            boxShadow: "0 1px 4px rgba(15,23,42,0.08)",
            fontSize: "0.95rem",
          }}
        >
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          {user.email && (
            <p>
              <strong>Correo:</strong> {user.email}
            </p>
          )}
          {user.users && (
            <p>
              <strong>Usuario:</strong> {user.users}
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
