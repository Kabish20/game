import { useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const RegisterModal = ({ open, onClose }) => {
    const { openLogin } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await api.post("/users/register/", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            setSuccess(true);
            setTimeout(() => {
                openLogin();
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed. Try a different username/email.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Modal open={open} onClose={onClose}>
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
                    <p className="text-gray-400">Redirecting to login...</p>
                </div>
            </Modal>
        );
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tighter">CREATE ACCOUNT</h2>
                <p className="text-gray-400 text-sm">Join our gaming community today</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-white placeholder:text-gray-600"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-white placeholder:text-gray-600"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-white placeholder:text-gray-600"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <input
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-white placeholder:text-gray-600"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                />

                {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-lg font-bold glow-red disabled:opacity-50"
                >
                    {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                    Already have an account?{" "}
                    <button
                        onClick={openLogin}
                        className="text-red-500 font-bold hover:underline ml-1"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </Modal>
    );
};

export default RegisterModal;
