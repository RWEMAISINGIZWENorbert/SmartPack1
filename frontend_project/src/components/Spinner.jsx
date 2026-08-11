
const Spinner = ({ size = 'medium', color = 'primary', fullPage = false, inline = false }) => {
  const sizes = {
    small: "w-4 h-4 border-2", // Adjusted to h-4 for buttons
    medium: "w-10 h-10 border-3",
    large: "w-16 h-16 border-4"
  };

  const colors = {
    primary: "border-primary border-t-transparent",
    white: "border-white border-t-transparent",
    low: "border-text-low border-t-transparent"
  };

  const spinnerContent = (
    <div className={`flex items-center justify-center ${!inline ? 'p-4' : ''}`}>
      <div className={`
        ${sizes[size]} 
        ${colors[color]} 
        rounded-full 
        animate-spin
      `} />
      {fullPage && (
        <p className="ml-4 text-sm font-medium text-text-low animate-pulse">
          Loading Market Data...
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
        {spinnerContent}
      </div>
    );
  }

  // If inline, just return the content without the big container
  if (inline) return spinnerContent;

  return (
    <div className="w-full flex items-center justify-center min-h-[100px]">
      {spinnerContent}
    </div>
  );
};

export default Spinner;
