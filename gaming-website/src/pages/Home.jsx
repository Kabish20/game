import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSlider from "../features/games/HeroSlider";
import GamesCarousel from "../features/games/GamesCarousel";
import GamesGrid from "../features/games/GamesGrid";
import SectionTitle from "../components/common/SectionTitle";
import Button from "../components/common/Button";
import { ArrowRightIcon, CheckIcon, SearchIcon } from "../components/common/Icons";
import { GAME_CATEGORIES, GAMES_DATA } from "../constants/games";
import { useAuth } from "../context/useAuth";

const INITIAL_VISIBLE_GAMES = 15;

const Home = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All games");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_GAMES);
  const [favorites, setFavorites] = useState(() => new Set());
  const { openRegister } = useAuth();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredGames = GAMES_DATA.filter((game) => {
    const matchesCategory = activeCategory === "All games" || game.category === activeCategory;
    const matchesQuery = !normalizedQuery
      || `${game.title} ${game.category} ${game.mode}`.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });
  const visibleGames = filteredGames.slice(0, visibleCount);

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_GAMES);
  };

  const browseLibrary = () => {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-frame">
      <Navbar />

      <main>
        <div id="discover" className="shell hero-wrap">
          <HeroSlider onExplore={browseLibrary} />
        </div>

        <section className="trust-strip shell" aria-label="Platform highlights">
          <div><strong>50</strong><span>hand-picked worlds</span></div>
          <div><strong>14</strong><span>genres to explore</span></div>
          <div><strong>01</strong><span>library, zero clutter</span></div>
          <p><span className="live-dot" /> Fresh picks added every week</p>
        </section>

        <section id="trending" className="content-section shell">
          <SectionTitle
            eyebrow="Popular now"
            title="Worth your next session"
            subtitle="A sharper shortlist, selected from across the library."
          />
          <GamesCarousel
            games={GAMES_DATA.slice(0, 12)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        <section className="membership-panel shell" aria-label="Membership call to action">
          <div className="membership-orbit orbit-one" />
          <div className="membership-orbit orbit-two" />
          <div className="membership-copy">
            <p className="eyebrow">One account. Every world.</p>
            <h2>Your next great game is already here.</h2>
            <p>Create a free profile to keep a personal shortlist and pick up exactly where you left off.</p>
          </div>
          <div className="membership-benefits">
            <span><CheckIcon size={17} /> Curated discovery</span>
            <span><CheckIcon size={17} /> Personal favorites</span>
            <span><CheckIcon size={17} /> No subscription required</span>
          </div>
          <Button onClick={openRegister} className="membership-button">Create free account <ArrowRightIcon size={18} /></Button>
        </section>

        <section id="library" className="content-section library-section shell">
          <SectionTitle
            eyebrow="Full collection"
            title="Find your next world"
            subtitle="Search by title or narrow the catalog by genre."
            action={<span className="result-count">{filteredGames.length} games</span>}
          />

          <div className="library-toolbar">
            <label className="search-field">
              <SearchIcon size={19} />
              <span className="sr-only">Search games</span>
              <input
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setVisibleCount(INITIAL_VISIBLE_GAMES); }}
                placeholder="Search titles, genres, or modes"
              />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">Clear</button>}
            </label>
            <div className="category-list" aria-label="Filter by genre">
              {GAME_CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={activeCategory === category ? "is-active" : ""}
                  onClick={() => selectCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {visibleGames.length ? (
            <>
              <GamesGrid
                games={visibleGames}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
              {visibleCount < filteredGames.length && (
                <div className="load-more-row">
                  <Button variant="secondary" onClick={() => setVisibleCount((count) => count + 10)}>
                    Show more games <ArrowRightIcon size={18} />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <SearchIcon size={30} />
              <h3>No games found</h3>
              <p>Try another title or reset the current filters.</p>
              <Button variant="secondary" onClick={() => { setQuery(""); selectCategory("All games"); }}>Reset filters</Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
