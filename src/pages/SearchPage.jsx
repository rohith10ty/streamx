import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { allMovies } from '../data/movies';
import MovieCard from '../components/MovieCard';

const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi', 'Crime', 'Thriller'];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialGenre = searchParams.get('genre') || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchParams.get('q') !== null) {
      setQuery(searchParams.get('q') || '');
    }
    if (searchParams.get('genre')) {
      setSelectedGenre(searchParams.get('genre'));
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = allMovies;
    if (query.trim()) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.cast?.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
        m.director?.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(m => 
        Array.isArray(m.genre) && m.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }
    setResults(filtered);
  }, [query, selectedGenre]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-12 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search movies, TV shows, and more..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-full py-4 pl-16 pr-6 text-lg focus:outline-none focus:border-gray-500 focus:bg-gray-800 transition shadow-lg"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide max-w-3xl mx-auto justify-start md:justify-center">
          {genres.map(genre => (
            <button 
              key={genre}
              onClick={() => {
                setSelectedGenre(genre);
                if (genre === 'All') {
                  setSearchParams(query ? { q: query } : {});
                } else {
                  setSearchParams(query ? { q: query, genre } : { genre });
                }
              }}
              className={`px-5 py-2 rounded-full whitespace-nowrap transition text-sm font-medium ${selectedGenre === genre ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'}`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="pt-8">
          {results.length > 0 ? (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              <AnimatePresence>
                {results.map(movie => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MovieCard movie={movie} className="w-full" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-32">
              <div className="text-gray-500 mb-6 flex justify-center">
                <Search className="w-20 h-20 opacity-30" />
              </div>
              <h2 className="text-3xl font-bold mb-3">No results found</h2>
              <p className="text-gray-400 text-lg">Try searching for a different title, or browse our categories.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
