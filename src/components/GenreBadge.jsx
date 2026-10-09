import React from 'react';

const GenreBadge = ({ genre, onClick }) => {
  if (!genre) return null;
  
  return (
    <span 
      onClick={onClick}
      className={`
        inline-block px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full
        border border-neutral-600 text-neutral-300
        transition-colors duration-200
        ${onClick ? 'cursor-pointer hover:bg-white hover:text-black hover:border-white' : 'cursor-default'}
      `}
    >
      {genre}
    </span>
  );
};

export default GenreBadge;
