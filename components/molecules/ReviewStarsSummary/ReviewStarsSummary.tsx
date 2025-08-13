// Render stars based on average
const renderStars = () => {
  const full = Math.floor(average);
  const half = average % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(full)].map((_, i) => <span key={`f${i}`} className="text-yellow-400 text-lg">★</span>)}
      {half ? <span className="text-yellow-400 text-lg">☆</span> : null}
      {[...Array(empty)].map((_, i) => <span key={`e${i}`} className="text-gray-300 text-lg">☆</span>)}
    </span>
  );
}; 