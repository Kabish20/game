import { useState } from "react";
import { NAVIGATION } from "../../constants/navigation";
import LoginModal from "../../features/auth/LoginModal";
import RegisterModal from "../../features/auth/RegisterModal";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, loginOpen, registerOpen, openLogin, openRegister, closeModals, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-black text-red-600 tracking-tighter italic cursor-pointer" onClick={() => window.location.href = '/'}>G&G</h1>

          <ul className="hidden md:flex gap-8 text-[13px] font-bold uppercase tracking-widest text-gray-400">
            {NAVIGATION.map(item => (
              <li key={item} className="hover:text-red-500 cursor-pointer transition-colors duration-300">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button onClick={logout} className="bg-white/5 border border-white/10 hover:bg-white/10 text-white">Logout</Button>
            ) : (
              <>
                <button
                  onClick={openLogin}
                  className="text-white hover:text-red-500 font-bold text-sm transition px-4"
                >
                  Login
                </button>
                <Button onClick={openRegister} className="glow-red">Sign Up</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black pt-20 px-8 flex flex-col gap-6 md:hidden">
          <button
            className="absolute top-6 right-6 text-2xl text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✕
          </button>
          {NAVIGATION.map(item => (
            <div key={item} className="text-2xl font-bold uppercase tracking-tighter text-white border-b border-white/10 pb-4">
              {item}
            </div>
          ))}
          {user ? (
            <button onClick={logout} className="text-left text-2xl font-bold uppercase text-red-500">Logout</button>
          ) : (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => { openLogin(); setIsMobileMenuOpen(false); }}
                className="text-left text-2xl font-bold uppercase text-white hover:text-red-500"
              >
                Login
              </button>
              <button
                onClick={() => { openRegister(); setIsMobileMenuOpen(false); }}
                className="text-left text-2xl font-bold uppercase text-red-500"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}

      <LoginModal open={loginOpen} onClose={closeModals} />
      <RegisterModal open={registerOpen} onClose={closeModals} />
    </>
  );
};

export default Navbar;
