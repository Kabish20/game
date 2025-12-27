import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSlider from "../features/games/HeroSlider";
import GamesCarousel from "../features/games/GamesCarousel";
import GamesGrid from "../features/games/GamesGrid";
import SectionTitle from "../components/common/SectionTitle";
import { GAMES_DATA } from "../constants/games";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="px-8 mt-8">
        <HeroSlider />

        <div className="mt-16">
          <SectionTitle
            title="Featured Games"
            subtitle="Top picks for you this week"
          />
          <GamesCarousel />
        </div>

        <div className="mt-20 mb-20">
          <SectionTitle
            title="Popular Titles"
            subtitle="Explore our library of over 50+ games"
          />
          <GamesGrid games={GAMES_DATA} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
