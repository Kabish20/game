import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css";
import GameCard from "../../components/cards/GameCard";
import { ChevronLeftIcon, ChevronRightIcon } from "../../components/common/Icons";

const GamesCarousel = ({ games, favorites, onToggleFavorite }) => {
    return (
      <div className="carousel-shell">
        <div className="carousel-controls" aria-label="Carousel controls">
          <button type="button" className="carousel-prev" aria-label="Previous games"><ChevronLeftIcon /></button>
          <button type="button" className="carousel-next" aria-label="Next games"><ChevronRightIcon /></button>
        </div>
        <Swiper
            modules={[A11y, Navigation]}
            navigation={{ prevEl: ".carousel-prev", nextEl: ".carousel-next" }}
            spaceBetween={16}
            slidesPerView={1.25}
            breakpoints={{
                520: { slidesPerView: 2.15 },
                768: { slidesPerView: 3.15 },
                1100: { slidesPerView: 4.2 },
                1440: { slidesPerView: 4.65 },
            }}
            className="games-carousel"
        >
            {games.map((game, index) => (
                <SwiperSlide key={game.id}>
                    <GameCard
                      {...game}
                      rank={index + 1}
                      sequence={index}
                      isFavorite={favorites.has(game.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
      </div>
    );
};

export default GamesCarousel;
