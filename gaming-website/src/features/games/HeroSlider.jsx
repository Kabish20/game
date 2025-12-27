import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

const heroContent = [
    {
        title: "VALORANT",
        subtitle: "A 5v5 character-based tactical shooter",
        image: "/assets/games/game1.jpeg",
        tag: "OFFICIAL"
    },
    {
        title: "CYBERPUNK 2077",
        subtitle: "Become an urban mercenary in the city of the future",
        image: "/assets/games/game2.jpeg",
        tag: "NEW"
    },
    {
        title: "EL DEN RING",
        subtitle: "Rise, Tarnished, and be guided by grace",
        image: "/assets/games/game3.jpeg",
        tag: "TRENDING"
    }
];

const HeroSlider = () => {
    const { openRegister } = useAuth();

    return (
        <section className="relative w-full h-[600px] mb-16 overflow-hidden rounded-3xl group">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-full"
            >
                {heroContent.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex flex-col justify-center px-16">
                                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-4 tracking-widest">
                                    {item.tag}
                                </span>
                                <h1 className="text-7xl font-black mb-4 tracking-tighter neon-text uppercase">
                                    {item.title}
                                </h1>
                                <p className="text-xl text-gray-300 max-w-xl mb-8 leading-relaxed">
                                    {item.subtitle}
                                </p>
                                <div className="flex gap-4">
                                    <Button
                                        onClick={openRegister}
                                        className="px-10 py-4 text-lg bg-red-600 hover:bg-red-700 glow-red"
                                    >
                                        Get Started
                                    </Button>
                                    <button className="px-10 py-4 text-lg border border-white/20 hover:bg-white/10 transition rounded-lg font-medium backdrop-blur">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroSlider;
