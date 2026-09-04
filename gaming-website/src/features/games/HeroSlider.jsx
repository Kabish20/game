import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Button from "../../components/common/Button";
import { ArrowRightIcon, PlayIcon } from "../../components/common/Icons";
import { FEATURED_GAMES } from "../../constants/games";
import { useAuth } from "../../context/useAuth";

const HeroSlider = ({ onExplore }) => {
  const { openRegister } = useAuth();

  return (
    <section className="hero" aria-label="Featured games">
      <Swiper
        modules={[A11y, Autoplay, EffectFade, Keyboard, Pagination]}
        effect="fade"
        autoplay={{ delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        loop
        className="hero-swiper"
      >
        {FEATURED_GAMES.map((game) => (
          <SwiperSlide key={game.id}>
            <div className="hero-slide">
              <img
                src={game.heroImage}
                onError={(event) => { event.currentTarget.src = game.fallbackImage; }}
                alt=""
                className="hero-image"
                fetchPriority="high"
              />
              <div className="hero-wash" />
              <div className="hero-content">
                <div className="hero-kicker">
                  <span className="live-dot" />
                  {game.eyebrow}
                </div>
                <h1>{game.title}</h1>
                <p>{game.description}</p>
                <div className="hero-meta" aria-label="Game details">
                  <span>{game.category}</span>
                  <span aria-hidden="true">•</span>
                  <span>{game.mode}</span>
                  <span aria-hidden="true">•</span>
                  <span>Full access</span>
                </div>
                <div className="hero-actions">
                  <Button onClick={openRegister} className="hero-primary">
                    Start playing <ArrowRightIcon size={18} />
                  </Button>
                  <Button variant="secondary" onClick={onExplore}>
                    <PlayIcon size={17} /> Browse library
                  </Button>
                </div>
              </div>
              <div className="hero-count" aria-hidden="true">
                <strong>{String(game.id).padStart(2, "0")}</strong>
                <span>/ 50</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
