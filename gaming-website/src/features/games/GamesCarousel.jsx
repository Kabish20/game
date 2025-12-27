import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import GameCard from "../../components/cards/GameCard";
import { GAMES_DATA } from "../../constants/games";

const GamesCarousel = () => {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
            }}
            loop={true}
            className="pb-10"
        >
            {GAMES_DATA.map((game) => (
                <SwiperSlide key={game.id}>
                    <GameCard {...game} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default GamesCarousel;
