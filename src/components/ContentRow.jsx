import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const ContentRow = ({ title, movies = [], showViewAll = true }) => {
  const rowRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rowRef.current) {
        setIsScrolled(rowRef.current.scrollLeft > 0);
        setMaxScrollLeft(rowRef.current.scrollWidth - rowRef.current.clientWidth);
      }
    };
    
    if (rowRef.current) {
      rowRef.current.addEventListener('scroll', handleScroll);
      // Initial calculation
      setTimeout(handleScroll, 100);
      window.addEventListener('resize', handleScroll);
    }
    
    return () => {
      if (rowRef.current) rowRef.current.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [movies]);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="w-full py-6 group relative">
      <div className="flex justify-between items-end mb-4 px-4 md:px-12">
        <div className="flex items-center">
          <div className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-800 mr-3 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">{title}</h2>
        </div>
        {showViewAll && (
          <Link to={`/category/${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
            View All
          </Link>
        )}
      </div>

      <div className="relative">
        {/* Left Scroll Button */}
        {isScrolled && (
          <button 
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-lg"
            onClick={() => scroll('left')}
          >
            <ChevronLeft size={32} className="text-white" />
          </button>
        )}

        {/* Scroll Container */}
        <motion.div 
          ref={rowRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-12 pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Hide default scrollbar with CSS styles below */}
          <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
          `}} />
          
          {movies.map((movie) => (
            <motion.div key={movie.id} variants={itemVariants} className="snap-start">
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>

        {/* Right Scroll Button */}
        {(rowRef.current && rowRef.current.scrollLeft < maxScrollLeft - 10 || maxScrollLeft === 0) && movies.length > 0 && (
          <button 
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-lg"
            onClick={() => scroll('right')}
          >
            <ChevronRight size={32} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentRow;
