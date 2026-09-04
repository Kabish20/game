import { motion as Motion } from "framer-motion";
import { ArrowUpRightIcon, HeartIcon } from "../common/Icons";

const GameCard = ({
  id,
  title,
  image,
  category,
  mode,
  rank,
  sequence = 0,
  isFavorite = false,
  onToggleFavorite,
}) => {
  return (
    <Motion.article
      className="game-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: (sequence % 5) * 0.045, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="game-card-media">
        <img
          src={image}
          alt={`${title} cover artwork`}
          loading="lazy"
          decoding="async"
        />
        <div className="game-card-shade" />
        <div className="game-card-glint" aria-hidden="true" />
        {rank ? <span className="game-card-rank" aria-label={`Trending rank ${rank}`}>#{String(rank).padStart(2, "0")}</span> : <span className="game-card-index">G-{String(id).padStart(2, "0")}</span>}
        <button
          type="button"
          className={`favorite-button ${isFavorite ? "is-active" : ""}`}
          onClick={() => onToggleFavorite?.(id)}
          aria-label={`${isFavorite ? "Remove" : "Add"} ${title} ${isFavorite ? "from" : "to"} favorites`}
        >
          <HeartIcon size={17} filled={isFavorite} />
        </button>
        <div className="game-card-content">
          <div className="game-card-meta">
            <span>{category}</span>
            <i aria-hidden="true" />
            <span>{mode}</span>
          </div>
          <div className="game-card-title-row">
            <h3>{title}</h3>
            <span className="game-card-arrow"><ArrowUpRightIcon size={18} /></span>
          </div>
        </div>
      </div>
    </Motion.article>
  );
};

export default GameCard;
