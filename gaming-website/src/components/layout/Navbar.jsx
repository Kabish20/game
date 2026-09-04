import { useEffect, useState } from "react";
import { NAVIGATION } from "../../constants/navigation";
import LoginModal from "../../features/auth/LoginModal";
import RegisterModal from "../../features/auth/RegisterModal";
import Button from "../common/Button";
import { BoltIcon, CloseIcon, GamepadIcon, MenuIcon, UserIcon } from "../common/Icons";
import { useAuth } from "../../context/useAuth";

const Navbar = () => {
  const { user, loginOpen, registerOpen, openLogin, openRegister, closeModals, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(window.scrollY > 18);
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <nav className="navbar shell" aria-label="Primary navigation">
          <a href="#discover" className="brand" aria-label="Game and Glory home">
            <span className="brand-mark"><GamepadIcon size={21} /></span>
            <span className="brand-copy">
              <strong>GAME<span>&amp;</span>GLORY</strong>
              <small>Play beyond</small>
            </span>
          </a>

          <ul className="desktop-nav">
            {NAVIGATION.map((item, index) => (
              <li key={item.label}>
                <a href={item.href}><span>0{index + 1}</span>{item.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <span className="system-status desktop-status"><i /> 50 worlds online</span>
            {user ? (
              <>
                <span className="user-pill"><UserIcon size={15} /> {user.username}</span>
                <Button onClick={logout} variant="secondary" className="desktop-auth">Log out</Button>
              </>
            ) : (
              <>
                <button type="button" onClick={openLogin} className="nav-login desktop-auth">Log in</button>
                <Button onClick={openRegister} className="desktop-auth"><BoltIcon size={16} /> Enter G&amp;G</Button>
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
        <span className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      </header>

      <div id="mobile-navigation" className={`mobile-menu ${isMobileMenuOpen ? "is-open" : ""}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-menu-grid" aria-hidden="true" />
        <div className="mobile-menu-top">
          <span className="brand">
            <span className="brand-mark"><GamepadIcon size={21} /></span>
            <span className="brand-copy"><strong>GAME<span>&amp;</span>GLORY</strong><small>Play beyond</small></span>
          </span>
          <button type="button" onClick={closeMenu} aria-label="Close navigation menu"><CloseIcon /></button>
        </div>
        <div className="mobile-menu-heading"><span className="system-status"><i /> System online</span><p>Navigation matrix</p></div>
        <div className="mobile-menu-links">
          {NAVIGATION.map((item, index) => (
            <a key={item.label} href={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>{item.label}<small>↗</small>
            </a>
          ))}
        </div>
        <div className="mobile-menu-auth">
          {user ? (
            <Button onClick={() => { logout(); closeMenu(); }} variant="secondary" className="w-full">Log out</Button>
          ) : (
            <>
              <Button onClick={() => { openRegister(); closeMenu(); }} className="w-full"><BoltIcon size={16} /> Enter Game &amp; Glory</Button>
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
