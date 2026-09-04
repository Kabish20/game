import { ArrowUpRightIcon, HeartIcon } from "../common/Icons";

const GameCard = ({
  id,
  title,
  image,
  fallbackImage,
  category,
  mode,
  isFavorite = false,
  onToggleFavorite,
  priority = false,
}) => {
  const handleImageError = (event) => {
    if (event.currentTarget.src.endsWith(fallbackImage)) return;
    event.currentTarget.src = fallbackImage;
  };

  return (
    <article className="game-card group">
      <div className="game-card-media">
        <img
          src={image}
          onError={handleImageError}
          alt={`${title} cover artwork`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
        <div className="game-card-shade" />
        <span className="game-card-access">Included</span>
        <button
          type="button"
          className={`favorite-button ${isFavorite ? "is-active" : ""}`}
          onClick={() => onToggleFavorite?.(id)}
          aria-label={`${isFavorite ? "Remove" : "Add"} ${title} ${isFavorite ? "from" : "to"} favorites`}
        >
          <HeartIcon size={18} filled={isFavorite} />
        </button>
        <div className="game-card-content">
          <div className="game-card-meta">
            <span>{category}</span>
            <span aria-hidden="true">•</span>
            <span>{mode}</span>
          </div>
          <div className="game-card-title-row">
            <h3>{title}</h3>
            <span className="game-card-arrow"><ArrowUpRightIcon size={19} /></span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default GameCard;
