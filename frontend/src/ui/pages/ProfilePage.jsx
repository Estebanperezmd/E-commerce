import { useAuth } from "../../app/AuthContext";
import AppLayout from "../components/AppLayout";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user, clearAuth } = useAuth();

  if (!user) {
    return (
      <AppLayout title="Perfil" subtitle="">
        <p>No hay ningún usuario autenticado.</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Perfil" subtitle="">
      <div className="profile-card">
        <div className="profile-row">
          <span className="label">ID:</span>
          <span>{user.id}</span>
        </div>
        <div className="profile-row">
          <span className="label">Usuario:</span>
          <span>{user.username}</span>
        </div>
        <div className="profile-row">
          <span className="label">Nombre:</span>
          <span>{user.name || "—"}</span>
        </div>
        <div className="profile-row">
          <span className="label">Correo:</span>
          <span>{user.email}</span>
        </div>
      </div>

      <button
        className="profile-logout"
        onClick={() => {
          clearAuth();
          window.location.href = "/";
        }}
      >
        Cerrar sesión
      </button>
    </AppLayout>
  );
}
