import GameCard from "../../components/cards/GameCard";

const GamesGrid = ({ games, favorites, onToggleFavorite }) => {
  return (
    <div className="games-grid">
      {games.map((game, index) => (
        <GameCard
          key={game.id}
          {...game}
          sequence={index}
          isFavorite={favorites.has(game.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default GamesGrid;
