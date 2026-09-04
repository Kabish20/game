import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSlider from "../features/games/HeroSlider";
import GamesCarousel from "../features/games/GamesCarousel";
import GamesGrid from "../features/games/GamesGrid";
import SectionTitle from "../components/common/SectionTitle";
import Button from "../components/common/Button";
import {
  ArrowRightIcon,
  BoltIcon,
  CheckIcon,
  CompassIcon,
  GamepadIcon,
  LayersIcon,
  SearchIcon,
  SparkIcon,
  TrophyIcon,
} from "../components/common/Icons";
import { GAME_CATEGORIES, GAMES_DATA } from "../constants/games";
import { useAuth } from "../context/useAuth";

const INITIAL_VISIBLE_GAMES = 15;
const FAVORITES_KEY = "game-and-glory-favorites";
const PULSE_ITEMS = ["Open worlds", "Action RPG", "Racing", "Tactical", "Story driven", "Co-op", "Survival", "Indie spirit"];

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
};

const getStoredFavorites = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? []);
  } catch {
    return new Set();
  }
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All games");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_GAMES);
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const searchInputRef = useRef(null);
  const { openRegister } = useAuth();

  useEffect(() => {
    const focusSearch = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

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
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
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

  const trackPointer = (event) => {
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  return (
    <div className="site-frame" onPointerMove={trackPointer}>
      <div className="cursor-aura" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <Navbar />

      <main>
        <div id="discover" className="shell hero-wrap">
          <HeroSlider onExplore={browseLibrary} />
        </div>

        <Motion.aside className="discovery-rail shell" aria-label="Platform highlights" {...reveal}>
          <div><span className="rail-icon"><CompassIcon size={18} /></span><p><strong>50</strong><small>Curated worlds</small></p></div>
          <div><span className="rail-icon"><LayersIcon size={18} /></span><p><strong>14</strong><small>Genres in orbit</small></p></div>
          <div><span className="rail-icon"><TrophyIcon size={18} /></span><p><strong>100%</strong><small>Hand selected</small></p></div>
          <div className="rail-message"><i /> Discovery engine online <span>G&amp;G / 2026</span></div>
        </Motion.aside>

        <div className="genre-marquee" aria-label="Featured genres">
          <div className="marquee-track">
            {[...PULSE_ITEMS, ...PULSE_ITEMS].map((item, index) => (
              <span key={`${item}-${index}`} aria-hidden={index >= PULSE_ITEMS.length}><SparkIcon size={13} /> {item}</span>
            ))}
          </div>
        </div>

        <Motion.section id="trending" className="content-section shell" {...reveal}>
          <SectionTitle
            eyebrow="Trending transmission"
            title="The games everyone should experience."
            subtitle="Twelve standout worlds, ranked for your next unforgettable session."
            action={<span className="signal-badge"><i /> Live rotation</span>}
          />
          <GamesCarousel
            games={GAMES_DATA.slice(0, 12)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </Motion.section>

        <section id="experience" className="content-section shell experience-section">
          <Motion.div {...reveal}>
            <SectionTitle
              eyebrow="Built around discovery"
              title="Less noise. More worlds worth entering."
              subtitle="A player-first library shaped by atmosphere, variety, and great game design."
            />
          </Motion.div>

          <div className="experience-grid">
            <Motion.article className="experience-feature" {...reveal}>
              <img src="/assets/games/generated/horizon-forbidden-west-wilds-art.jpg" alt="Futuristic machines exploring a dramatic wild landscape" loading="lazy" />
              <div className="experience-shade" />
              <span className="experience-code">EXP / 01</span>
              <div className="experience-copy">
                <p><CompassIcon size={15} /> Human curation</p>
                <h3>Find the feeling,<br />not just the genre.</h3>
                <span>Every title is selected for the world it creates and the story it leaves behind.</span>
              </div>
              <div className="feature-orbit" aria-hidden="true"><span /><span /><i /></div>
            </Motion.article>

            <div className="experience-stack">
              <Motion.article className="experience-card experience-card--signal" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
                <div className="signal-visual" aria-hidden="true">
                  <span className="signal-ring signal-ring--one" />
                  <span className="signal-ring signal-ring--two" />
                  <span className="signal-ring signal-ring--three" />
                  <i className="signal-sweep" />
                  <span className="signal-core"><GamepadIcon size={31} /></span>
                </div>
                <div className="experience-card-copy">
                  <span className="experience-code">SYSTEM / ACTIVE</span>
                  <h3>Your taste.<br />Your orbit.</h3>
                  <p>Search, filter, and save a personal shortlist that stays with you on this device.</p>
                </div>
              </Motion.article>

              <Motion.article className="experience-card experience-card--visual" {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
                <img src="/assets/games/generated/need-for-speed-night-race-art.jpg" alt="Performance car racing through a neon-lit city at night" loading="lazy" />
                <div className="experience-shade" />
                <div className="speed-lines" aria-hidden="true"><i /><i /><i /></div>
                <div className="experience-card-copy">
                  <span className="experience-code">MOTION / 120 FPS</span>
                  <h3>Designed to feel alive.</h3>
                </div>
              </Motion.article>
            </div>
          </div>
        </section>

        <Motion.section className="membership-panel shell" aria-label="Membership call to action" {...reveal}>
          <div className="membership-grid" aria-hidden="true" />
          <div className="membership-orbit orbit-one" />
          <div className="membership-orbit orbit-two" />
          <div className="membership-copy">
            <p className="eyebrow"><span />Your personal lobby</p>
            <h2>One profile.<br />Every world.</h2>
            <p>Create a local player profile, keep your favorites close, and make every visit feel like home base.</p>
          </div>
          <div className="membership-benefits">
            <span><CheckIcon size={17} /> Curated discovery</span>
            <span><CheckIcon size={17} /> Persistent favorites</span>
            <span><CheckIcon size={17} /> No subscription required</span>
          </div>
          <Button onClick={openRegister} className="membership-button"><BoltIcon size={17} /> Create player profile <ArrowRightIcon size={18} /></Button>
          <div className="membership-emblem" aria-hidden="true"><GamepadIcon size={36} /><span>G&amp;G</span></div>
        </Motion.section>

        <Motion.section id="library" className="content-section library-section shell" {...reveal}>
          <SectionTitle
            eyebrow="The complete archive"
            title="Choose your next universe."
            subtitle="Search every title or tune the signal by genre."
            action={(
              <div className="library-counts">
                <span className="result-count">{filteredGames.length} games</span>
                <span className="favorite-count">{favorites.size} saved</span>
              </div>
            )}
          />

          <div className="library-toolbar">
            <label className="search-field">
              <SearchIcon size={19} />
              <span className="sr-only">Search games</span>
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setVisibleCount(INITIAL_VISIBLE_GAMES); }}
                placeholder="Search titles, genres, or modes"
              />
              {query && <button type="button" onClick={() => setQuery("")}>Clear</button>}
              <kbd>⌘ K</kbd>
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
                    Load next transmission <ArrowRightIcon size={18} />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <SearchIcon size={30} />
              <h3>No signal found</h3>
              <p>Try another title or reset the current filters.</p>
              <Button variant="secondary" onClick={() => { setQuery(""); selectCategory("All games"); }}>Reset filters</Button>
            </div>
          )}
        </Motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
