
const Card = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-card border border-border rounded-xl shadow-none overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="px-5 py-4 border-b border-border flex justify-between items-center">
          {title && <h3 className="font-bold text-base text-text-high">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;
