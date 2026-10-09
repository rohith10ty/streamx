import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allMovies } from '../data/movies';
import MovieCard from '../components/MovieCard';

export default function MyListPage() {
  const [savedList, setSavedList] = useState([]);

  useEffect(() => {
    // Mock functionality: Load some movies into my list
    const saved = localStorage.getItem('streamx_mylist');
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        const movies = allMovies.filter(m => ids.includes(m.id));
        setSavedList(movies);
      } catch(e) {
        setSavedList(allMovies.slice(0, 5));
      }
    } else {
      setSavedList(allMovies.slice(0, 5));
    }
  }, []);

  const removeFromList = (id) => {
    const updated = savedList.filter(m => m.id !== id);
    setSavedList(updated);
    localStorage.setItem('streamx_mylist', JSON.stringify(updated.map(m => m.id)));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-12 pb-20">
      <div className="flex items-center gap-4 mb-10 border-b border-gray-800 pb-6">
        <Bookmark className="w-8 h-8 text-red-600" />
        <h1 className="text-3xl md:text-4xl font-bold">My List</h1>
      </div>

      {savedList.length > 0 ? (
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence>
            {savedList.map(movie => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <MovieCard movie={movie} className="w-full" />
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromList(movie.id);
                  }}
                  className="absolute top-2 right-2 bg-black/80 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-red-600 text-white z-10 backdrop-blur-sm"
                  title="Remove from My List"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6">
            <Bookmark className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your list is empty</h2>
          <p className="text-gray-400 mb-8 max-w-md text-lg">Save shows and movies to keep track of what you want to watch.</p>
          <Link to="/" className="bg-white text-black px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-200 transition">
            Explore Movies
          </Link>
        </div>
      )}
    </div>
  );
}
