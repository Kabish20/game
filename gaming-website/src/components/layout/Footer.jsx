import { ArrowUpRightIcon, GamepadIcon } from "../common/Icons";
import { NAVIGATION } from "../../constants/navigation";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-watermark shell" aria-hidden="true">PLAY BEYOND</div>
      <div className="shell footer-grid">
        <div className="footer-brand-block">
          <a href="#discover" className="brand" aria-label="Game and Glory home">
            <span className="brand-mark"><GamepadIcon size={21} /></span>
            <span className="brand-copy"><strong>GAME<span>&amp;</span>GLORY</strong><small>Play beyond</small></span>
          </a>
          <p>A cinematic home for discovering the games worth your time. Curated with taste, built for players.</p>
          <span className="system-status"><i /> All systems operational</span>
        </div>
        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            {NAVIGATION.map((item) => <a key={item.label} href={item.href}>{item.label}<ArrowUpRightIcon size={13} /></a>)}
          </div>
          <div>
            <h3>Collections</h3>
            <a href="#library">PC worlds<ArrowUpRightIcon size={13} /></a>
            <a href="#library">Console legends<ArrowUpRightIcon size={13} /></a>
            <a href="#trending">Trending now<ArrowUpRightIcon size={13} /></a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Game &amp; Glory</span>
        <span>Independent game discovery / G&amp;G-50</span>
        <a href="#discover">Back to top ↑</a>
      </div>
    </footer>
  );
};

export default Footer;
