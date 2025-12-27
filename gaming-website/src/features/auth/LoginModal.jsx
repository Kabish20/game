import { useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const LoginModal = ({ open, onClose }) => {
  const { login, openRegister } = useAuth();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/token/", credentials);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      login({ authenticated: true });
      onClose();
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white mb-2 tracking-tighter">WELCOME BACK</h2>
        <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-white placeholder:text-gray-600"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-white placeholder:text-gray-600"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </div>

        {error && <p className="text-red-500 text-xs mt-1 text-center font-medium">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-4 text-lg font-bold glow-red disabled:opacity-50"
        >
          {loading ? "AUTHENTICATING..." : "LOGIN"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Don't have an account?{" "}
          <button
            onClick={openRegister}
            className="text-red-500 font-bold hover:underline ml-1"
          >
            Sign up
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default LoginModal;
