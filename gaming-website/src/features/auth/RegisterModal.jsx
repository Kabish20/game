import { useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import { CheckIcon } from "../../components/common/Icons";
import api from "../../services/api";
import { ENDPOINTS } from "../../services/endpoints";
import { useAuth } from "../../context/useAuth";

const EMPTY_FORM = { username: "", email: "", password: "", confirmPassword: "" };

const getApiError = (error) => {
  const responseData = error.response?.data;
  if (!responseData) return "Registration failed. Please try again.";
  const firstError = Object.values(responseData).flat()[0];
  return firstError || responseData.message || "Registration failed. Please try again.";
};

const RegisterModal = ({ open, onClose }) => {
  const { openLogin } = useAuth();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const closeAndReset = () => {
    setSuccess(false);
    setError("");
    setFormData(EMPTY_FORM);
    onClose();
  };

  const continueToLogin = () => {
    setSuccess(false);
    setError("");
    setFormData(EMPTY_FORM);
    openLogin();
  };

  const updateField = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post(ENDPOINTS.REGISTER, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Modal open={open} onClose={closeAndReset} label="Account created">
        <div className="success-state">
          <span><CheckIcon size={28} /></span>
          <p className="eyebrow">You're all set</p>
          <h2>Welcome to Game &amp; Glory</h2>
          <p>Your account is ready. Log in to start building your library.</p>
          <Button onClick={continueToLogin} className="w-full">Continue to login</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={closeAndReset} label="Create a Game and Glory account">
      <div className="auth-heading">
        <p className="eyebrow">Join the community</p>
        <h2>Build your game library</h2>
        <p>Create a free account in less than a minute.</p>
      </div>

      <form onSubmit={handleRegister} className="auth-form">
        <label>
          <span>Username</span>
          <input name="username" autoComplete="username" placeholder="Choose a username" value={formData.username} onChange={updateField} required />
        </label>
        <label>
          <span>Email address</span>
          <input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={updateField} required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" autoComplete="new-password" minLength={8} placeholder="At least 8 characters" value={formData.password} onChange={updateField} required />
        </label>
        <label>
          <span>Confirm password</span>
          <input type="password" name="confirmPassword" autoComplete="new-password" minLength={8} placeholder="Repeat your password" value={formData.confirmPassword} onChange={updateField} required />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <div className="auth-switch">
        <p>Already a member? <button type="button" onClick={openLogin}>Log in</button></p>
      </div>
    </Modal>
  );
};

export default RegisterModal;
