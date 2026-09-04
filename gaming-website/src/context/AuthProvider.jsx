import { useState } from "react";
import AuthContext from "./AuthContextValue";
import { clearLocalSession, getLocalSession } from "../services/localAuth";

const AuthProvider = ({ children }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState(getLocalSession);

  const login = (userData) => {
    setUser(userData);
    setLoginOpen(false);
  };

  const logout = () => {
    clearLocalSession();
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
