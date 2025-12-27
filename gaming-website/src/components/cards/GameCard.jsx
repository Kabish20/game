const GameCard = ({ title, image }) => {
  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden hover:-translate-y-2 transition">
      <img src={image} className="h-52 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-red-500 text-sm">FREE</span>
      </div>
    </div>
  );
};

export default GameCard;
