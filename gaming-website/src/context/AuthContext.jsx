import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            // In a real app, you'd fetch user profile here
            setUser({ authenticated: true });
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        setLoginOpen(false);
    };

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
        window.location.reload();
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
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginOpen,
                registerOpen,
                openLogin,
                openRegister,
                closeModals,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
