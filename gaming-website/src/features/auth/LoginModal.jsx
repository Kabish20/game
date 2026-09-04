import { useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import api from "../../services/api";
import { ENDPOINTS } from "../../services/endpoints";
import { useAuth } from "../../context/useAuth";

const LoginModal = ({ open, onClose }) => {
  const { login, openRegister } = useAuth();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post(ENDPOINTS.LOGIN, credentials);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      login({ authenticated: true, username: credentials.username });
      onClose();
    } catch {
      setError("We couldn't sign you in with those details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} label="Log in to Game and Glory">
      <div className="auth-heading">
        <p className="eyebrow">Welcome back</p>
        <h2>Continue your journey</h2>
        <p>Log in to access your saved games and favorites.</p>
      </div>

      <form onSubmit={handleLogin} className="auth-form">
        <label>
          <span>Username</span>
          <input
            name="username"
            autoComplete="username"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
            required
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in…" : "Log in"}
        </Button>
      </form>

      <div className="auth-switch">
        <p>New to Game &amp; Glory? <button type="button" onClick={openRegister}>Create an account</button></p>
      </div>
    </Modal>
  );
};

export default LoginModal;
