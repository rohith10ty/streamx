import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { featuredMovies, indianMovies, trendingMovies, popularMovies, newReleases, seriesList } from '../data/movies';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Combine all movies including Indian blockbusters for full 4 rows x 8 columns = 32 posters
  const rawCollage = [
    ...featuredMovies,
    ...indianMovies,
    ...trendingMovies,
    ...popularMovies,
    ...newReleases,
    ...seriesList
  ];
  // Ensure exactly 32 posters so all 8 columns on top, middle, and bottom are completely filled
  const collageMovies = [...rawCollage, ...rawCollage].slice(0, 32);
  const heroMovies = featuredMovies.length > 0 ? featuredMovies : trendingMovies;

  useEffect(() => {
    if (heroMovies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroMovies.length]);

  const currentMovie = heroMovies[currentIndex];

  if (!currentMovie) return null;

  return (
    <div className="relative w-full h-screen min-h-[640px] bg-black overflow-hidden flex items-center justify-center">
      {/* Background Collage Grid - Bright & Clearly Visible */}
      <motion.div 
        className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 p-2 opacity-75 scale-105 origin-center pointer-events-none select-none"
        animate={{ 
          scale: [1.03, 1.07, 1.03],
          y: [-4, 4, -4]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {collageMovies.map((m, idx) => (
          <div key={`collage-${m.id}-${idx}`} className="w-full aspect-[2/3] rounded-md overflow-hidden bg-zinc-900 border border-white/10 shadow-md">
            <img 
              src={m.poster} 
              alt="" 
              className="w-full h-full object-cover brightness-95 hover:brightness-100 transition-all duration-500" 
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg";
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* Atmospheric Shading / Gradients */}
      {/* Clear from center to top, masked from center to bottom */}
      {/* Soft center readability backdrop behind text */}
      <div className="absolute inset-0 bg-radial from-black/40 via-black/20 to-transparent z-10 pointer-events-none"></div>

      {/* Center to bottom heavy shade / mask */}
      <div className="absolute top-[40%] bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/85 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/95 to-transparent z-15 pointer-events-none"></div>
      
      {/* Light subtle top bar vignette for navbar clarity only */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-10 pointer-events-none"></div>

      {/* Content - Clean typography scaled for laptop & desktop */}
      <div className="relative z-20 px-6 md:px-12 w-full max-w-3xl xl:max-w-4xl mx-auto flex flex-col items-center justify-center text-center pt-24 pb-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
               <span className="bg-red-600 text-white text-[10px] md:text-xs font-black tracking-widest px-2.5 py-0.5 rounded shadow-lg shadow-red-600/50">
                 STREAMX ORIGINAL
               </span>
               {currentMovie.match && <span className="text-emerald-400 font-bold text-xs md:text-sm tracking-wide">{currentMovie.match}% Match</span>}
               <span className="bg-black/60 backdrop-blur-sm text-zinc-300 text-[11px] md:text-xs px-2 py-0.5 rounded border border-white/20">Ultra HD 4K</span>
            </div>
            
            {/* Title: Scaled cleanly for laptops (md:text-5xl lg:text-5xl xl:text-7xl) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl font-black text-white mb-3 leading-tight drop-shadow-[0_8px_20px_rgba(0,0,0,1)] max-w-3xl">
              {currentMovie.title || "Unlimited Movies, TV Shows & More"}
            </h1>
            
            <div className="flex items-center justify-center gap-2.5 text-zinc-300 text-xs md:text-sm mb-4 font-medium flex-wrap">
               <span className="text-zinc-200">{currentMovie.year}</span>
               <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
               <span className="border border-zinc-700 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-[11px]">{currentMovie.maturityRating || currentMovie.maturity || 'PG-13'}</span>
               <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
               <span>{currentMovie.duration}</span>
               {currentMovie.rating && (
                 <>
                   <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                   <span className="text-amber-400 flex items-center gap-1 font-semibold">
                     ★ {currentMovie.rating}
                   </span>
                 </>
               )}
            </div>

            {/* Description: Clean compact size on laptops */}
            <p className="text-zinc-200 text-sm md:text-base lg:text-base xl:text-lg mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed max-w-xl xl:max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] text-center">
              {currentMovie.description || "Discover endless entertainment. Stream the latest blockbuster movies, exclusive original series, and classic TV shows all in one place."}
            </p>
            
            {/* CTAs: Clean proportionate buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <button 
                onClick={() => navigate(`/movie/${currentMovie.id}?play=true`)}
                className="bg-white hover:bg-zinc-200 text-black px-7 py-3 md:px-8 md:py-3.5 rounded-xl font-extrabold text-sm md:text-base flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-xl hover:shadow-white/20 cursor-pointer"
              >
                <Play size={20} className="fill-black" />
                Start Watching
              </button>
              
              <button 
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="bg-black/60 hover:bg-zinc-800/80 backdrop-blur-md border border-white/25 text-white px-6 py-3 md:px-7 md:py-3.5 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <Info size={20} />
                More Info
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Centered Pagination Dots */}
        <div className="flex gap-2.5 z-20 mt-10">
           {heroMovies.map((_, idx) => (
             <button
               key={idx}
               onClick={() => setCurrentIndex(idx)}
               className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'bg-red-600 w-8' : 'bg-neutral-600 hover:bg-neutral-400 w-2.5'}`}
               aria-label={`Go to slide ${idx + 1}`}
             />
           ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
