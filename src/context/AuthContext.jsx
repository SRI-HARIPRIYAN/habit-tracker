import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser, loginWithGoogle } from "../api/loginApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on page refresh
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const data = await fetchUser();
      setUser(data);
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = () => {
    loginWithGoogle();
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
