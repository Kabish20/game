import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Button from "../../components/common/Button";
import { ArrowRightIcon, CompassIcon, PlayIcon, SparkIcon } from "../../components/common/Icons";
import { FEATURED_GAMES } from "../../constants/games";
import { useAuth } from "../../context/useAuth";

const HeroSlider = ({ onExplore }) => {
  const { openRegister } = useAuth();

  return (
    <section className="hero" aria-label="Featured games">
      <div className="hero-corner hero-corner--top" aria-hidden="true" />
      <div className="hero-corner hero-corner--bottom" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />
      <Swiper
        modules={[A11y, Autoplay, EffectFade, Keyboard, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={850}
        autoplay={{ delay: 6800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        keyboard={{ enabled: true }}
        pagination={{
          clickable: true,
          bulletElement: "button",
          renderBullet: (index, className) => `<button class="${className}" aria-label="Show featured game ${index + 1}"><span>0${index + 1}</span></button>`,
        }}
        loop
        className="hero-swiper"
      >
        {FEATURED_GAMES.map((game, index) => (
          <SwiperSlide key={game.id}>
            <div className="hero-slide">
              <img
                src={game.heroImage}
                alt=""
                className="hero-image"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="hero-wash" />
              <div className="hero-grid" aria-hidden="true" />
              <div className="hero-content">
                <div className="hero-kicker"><span><SparkIcon size={13} /></span>{game.eyebrow}</div>
                <h1>{game.title}</h1>
                <p>{game.description}</p>
                <div className="hero-meta" aria-label="Game details">
                  <span>{game.category}</span>
                  <span>{game.mode}</span>
                  <span>Curator&apos;s choice</span>
                </div>
                <div className="hero-actions">
                  <Button onClick={openRegister} className="hero-primary">
                    Build your library <ArrowRightIcon size={18} />
                  </Button>
                  <Button variant="secondary" onClick={onExplore}>
                    <PlayIcon size={16} /> Explore games
                  </Button>
                </div>
              </div>

              <div className="hero-hud" aria-hidden="true">
                <div className="hud-radar"><span /><CompassIcon size={23} /></div>
                <div>
                  <small>Discovery signal</small>
                  <strong>Curated / 0{index + 1}</strong>
                  <p>Genre match initialized</p>
                </div>
              </div>

              <div className="hero-release" aria-hidden="true">
                <span>G&amp;G Selection</span>
                <strong>0{index + 1}</strong>
                <small>/ 03</small>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
