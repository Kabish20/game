import { useState } from "react";
import AuthContext from "./AuthContextValue";

const AuthProvider = ({ children }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState(() => (
    localStorage.getItem("access") ? { authenticated: true } : null
  ));

  const login = (userData) => {
    setUser(userData);
    setLoginOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const openLogin = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const openRegister = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const closeModals = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };

  return (
    <AuthContext.Provider value={{ user, loginOpen, registerOpen, openLogin, openRegister, closeModals, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
