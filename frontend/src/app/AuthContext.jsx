import { createContext, useContext, useState, useEffect } from "react";

const AUTH_KEY = "auth_data";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) setAuth(JSON.parse(raw));
  }, []);

  const saveAuth = (data) => {
    setAuth(data);
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
