import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, Star, Clock } from 'lucide-react';
import GenreBadge from './GenreBadge';

const MovieCard = ({ movie, className = '' }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    title,
    poster,
    rating,
    year,
    genre,
    duration,
    match,
    type,
    maturityRating = 'PG-13'
  } = movie;
  const maturity = maturityRating;

  const isHighRating = rating && rating > 8;
  const genresList = Array.isArray(genre) ? genre : (genre ? [genre] : []);

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const [isSaved, setIsSaved] = useState(() => {
    try {
      const saved = localStorage.getItem('streamx_mylist');
      if (saved) {
        const ids = JSON.parse(saved);
        return ids.includes(id);
      }
    } catch (e) {}
    return false;
  });
  const [liked, setLiked] = useState(false);

  const handleToggleList = (e) => {
    e.stopPropagation();
    try {
      const saved = localStorage.getItem('streamx_mylist');
      let ids = saved ? JSON.parse(saved) : [];
      if (isSaved) {
        ids = ids.filter(itemId => itemId !== id);
        setIsSaved(false);
      } else {
        ids.push(id);
        setIsSaved(true);
      }
      localStorage.setItem('streamx_mylist', JSON.stringify(ids));
    } catch (err) {}
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden cursor-pointer bg-neutral-900 group shadow-lg ${className || 'w-48 sm:w-56 md:w-64 shrink-0'}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="aspect-[2/3] w-full relative">
        {/* Skeleton Shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center">
             <div className="w-8 h-8 rounded-full border-2 border-neutral-600 border-t-neutral-400 animate-spin"></div>
          </div>
        )}
        
        {/* Poster Image */}
        <img
          src={poster}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageLoaded(true);
            e.currentTarget.src = 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg';
          }}
        />
        
        {/* Industry Badge */}
        {movie.industry && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md z-10 tracking-wider uppercase">
            {movie.industry}
          </div>
        )}

        {/* High Rating Badge */}
        {isHighRating && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-md z-10 flex items-center gap-1">
            <Star size={10} className="fill-black" />
            TOP
          </div>
        )}

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent flex flex-col justify-end p-4 z-20"
            >
              <h3 className="text-white font-bold text-lg mb-1 truncate">{title}</h3>
              
              <div className="flex items-center gap-2 text-xs mb-2">
                {match && <span className="text-green-400 font-bold">{match}% Match</span>}
                <span className="border border-neutral-600 px-1 text-neutral-300 rounded text-[10px]">{maturity}</span>
                <span className="text-neutral-300">{year}</span>
                {duration && (
                  <span className="flex items-center text-neutral-300 gap-1">
                    <Clock size={10} /> {duration}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                 {genresList.slice(0, 3).map((g, idx) => (
                    <GenreBadge key={idx} genre={g} />
                 ))}
              </div>
              
              <div className="flex items-center gap-2 mt-auto">
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors flex-1 flex justify-center items-center group-hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                  onClick={(e) => { e.stopPropagation(); navigate(`/movie/${id}?play=true`); }}
                  title="Play Now"
                >
                  <Play size={18} className="fill-white ml-0.5" />
                </button>
                <button 
                  className={`p-2 rounded-full border transition-colors ${isSaved ? 'bg-red-600 border-red-600 text-white' : 'bg-neutral-800/80 hover:bg-neutral-700 text-white border-neutral-600'}`}
                  onClick={handleToggleList}
                  title={isSaved ? "Remove from List" : "Add to List"}
                >
                  {isSaved ? <span className="text-xs font-bold px-0.5">✓</span> : <Plus size={18} />}
                </button>
                <button 
                  className={`p-2 rounded-full border transition-colors ${liked ? 'bg-zinc-800 border-red-500 text-red-500' : 'bg-neutral-800/80 hover:bg-neutral-700 text-white border-neutral-600'}`}
                  onClick={handleToggleLike}
                  title="Like"
                >
                  <ThumbsUp size={18} className={liked ? 'fill-red-500' : ''} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MovieCard;
