import React from 'react';
import { motion } from 'framer-motion';
import { seriesList } from '../data/movies';
import ContentRow from '../components/ContentRow';
import MovieCard from '../components/MovieCard';
import { Tv, Flame, Sparkles, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function SeriesPage() {
  const trendingSeries = seriesList.slice(0, 5);
  const dramaSeries = seriesList.filter(s => s.genre.includes('Drama') || s.genre.includes('Crime'));
  const sciFiSeries = seriesList.filter(s => s.genre.includes('Sci-Fi') || s.genre.includes('Fantasy') || s.genre.includes('Action'));
  const topFeatured = seriesList[0]; // Breaking Bad

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Featured Series Hero Banner */}
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-black overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src={topFeatured.backdrop} 
            alt={topFeatured.title} 
            className="w-full h-full object-cover brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-full md:w-3/4"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full pt-16">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-xs font-black tracking-widest px-2.5 py-1 rounded shadow-lg shadow-red-600/40">
                #1 ACCLAIMED SERIES
              </span>
              <span className="text-emerald-400 font-bold text-sm">{topFeatured.match}% Match</span>
              <span className="text-zinc-400 text-xs border border-zinc-700 bg-zinc-900/60 px-2 py-0.5 rounded">{topFeatured.duration}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-xl">
              {topFeatured.title}
            </h1>

            <p className="text-zinc-200 text-base md:text-lg line-clamp-3 leading-relaxed drop-shadow-md">
              {topFeatured.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Link
                to={`/movie/${topFeatured.id}?play=true`}
                className="bg-white hover:bg-zinc-200 text-black px-8 py-3.5 rounded-lg font-extrabold text-base flex items-center gap-2 transition hover:scale-105 shadow-xl"
              >
                Start Season 1
              </Link>
              <Link
                to={`/movie/${topFeatured.id}`}
                className="bg-zinc-800/80 hover:bg-zinc-700/80 text-white px-7 py-3.5 rounded-lg font-bold text-base flex items-center gap-2 transition hover:scale-105 border border-white/20 backdrop-blur-md"
              >
                Series Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Series Content Rows styled identically to Home screen */}
      <div className="px-4 md:px-12 -mt-16 md:-mt-20 relative z-30 space-y-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Trending Web Series" movies={seriesList} showViewAll={false} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Gripping Crime & Dramas" movies={dramaSeries} showViewAll={false} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Sci-Fi & Supernatural Series" movies={sciFiSeries} showViewAll={false} />
        </motion.div>

        {/* All Series Full Grid Section (Clean spacing) */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={fadeInUp}
          className="pt-6"
        >
          <div className="flex items-center mb-6">
            <div className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-800 mr-3 rounded-full"></div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">All Series Catalog</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {seriesList.map(series => (
              <MovieCard key={series.id} movie={series} className="w-full" />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
