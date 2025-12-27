const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold neon-text">{title}</h2>
      {subtitle && (
        <p className="text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
