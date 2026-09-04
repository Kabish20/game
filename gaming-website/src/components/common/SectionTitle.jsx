const SectionTitle = ({ eyebrow, title, subtitle, action }) => {
  return (
    <div className="section-heading">
      <div className="section-heading-copy">
        {eyebrow && <p className="eyebrow"><span />{eyebrow}</p>}
        <h2>{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
};

export default SectionTitle;
