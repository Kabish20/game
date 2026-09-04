import { useEffect, useState } from "react";
import { NAVIGATION } from "../../constants/navigation";
import LoginModal from "../../features/auth/LoginModal";
import RegisterModal from "../../features/auth/RegisterModal";
import Button from "../common/Button";
import { CloseIcon, GamepadIcon, MenuIcon, UserIcon } from "../common/Icons";
import { useAuth } from "../../context/useAuth";

const Navbar = () => {
  const { user, loginOpen, registerOpen, openLogin, openRegister, closeModals, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <nav className="navbar shell" aria-label="Primary navigation">
          <a href="#discover" className="brand" aria-label="Game and Glory home">
            <span className="brand-mark"><GamepadIcon size={22} /></span>
            <span className="brand-copy">
              <strong>G&amp;G</strong>
              <small>Game &amp; Glory</small>
            </span>
          </a>

          <ul className="desktop-nav">
            {NAVIGATION.map((item) => (
              <li key={item.label}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>

          <div className="nav-actions">
            {user ? (
              <>
                <span className="user-pill"><UserIcon size={16} /> Player</span>
                <Button onClick={logout} variant="secondary" className="desktop-auth">Log out</Button>
              </>
            ) : (
              <>
                <button type="button" onClick={openLogin} className="nav-login desktop-auth">Log in</button>
                <Button onClick={openRegister} className="desktop-auth">Join free</Button>
              </>
            )}
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>

      <div id="mobile-navigation" className={`mobile-menu ${isMobileMenuOpen ? "is-open" : ""}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-menu-top">
          <span className="brand"><span className="brand-mark"><GamepadIcon size={22} /></span><strong>G&amp;G</strong></span>
          <button type="button" onClick={closeMenu} aria-label="Close navigation menu"><CloseIcon /></button>
        </div>
        <div className="mobile-menu-links">
          {NAVIGATION.map((item, index) => (
            <a key={item.label} href={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </div>
        <div className="mobile-menu-auth">
          {user ? (
            <Button onClick={() => { logout(); closeMenu(); }} variant="secondary" className="w-full">Log out</Button>
          ) : (
            <>
              <Button onClick={() => { openRegister(); closeMenu(); }} className="w-full">Create free account</Button>
              <button type="button" onClick={() => { openLogin(); closeMenu(); }}>Already a member? <strong>Log in</strong></button>
            </>
          )}
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={closeModals} />
      <RegisterModal open={registerOpen} onClose={closeModals} />
    </>
  );
};

export default Navbar;
