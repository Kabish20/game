import { GamepadIcon } from "../common/Icons";
import { NAVIGATION } from "../../constants/navigation";

const Footer = () => {
  return (
    <footer id="community" className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand-block">
          <a href="#discover" className="brand" aria-label="Game and Glory home">
            <span className="brand-mark"><GamepadIcon size={22} /></span>
            <span className="brand-copy"><strong>G&amp;G</strong><small>Game &amp; Glory</small></span>
          </a>
          <p>A focused home for discovering the games worth your next session.</p>
        </div>
        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            {NAVIGATION.slice(0, 3).map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </div>
          <div>
            <h3>Platform</h3>
            <a href="#library">PC games</a>
            <a href="#library">Console games</a>
            <a href="#community">Community</a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Game &amp; Glory</span>
        <span>Built for better play.</span>
      </div>
    </footer>
  );
};

export default Footer;
