import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { featuredMovies, indianMovies, trendingMovies, popularMovies, newReleases, actionMovies } from '../data/movies';
import ContentRow from '../components/ContentRow';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function MoviesPage() {
  const topMovie = featuredMovies[3]; // Dune: Part Two

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Featured Movie Hero Banner */}
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-black overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src={topMovie.backdrop} 
            alt={topMovie.title} 
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
                BLOCKBUSTER PREMIERE
              </span>
              <span className="text-emerald-400 font-bold text-sm">{topMovie.match}% Match</span>
              <span className="text-zinc-300 text-xs border border-zinc-700 bg-zinc-900/60 px-2 py-0.5 rounded">{topMovie.duration}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-xl">
              {topMovie.title}
            </h1>

            <p className="text-zinc-200 text-base md:text-lg line-clamp-3 leading-relaxed drop-shadow-md">
              {topMovie.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Link
                to={`/movie/${topMovie.id}?play=true`}
                className="bg-white hover:bg-zinc-200 text-black px-8 py-3.5 rounded-lg font-extrabold text-base flex items-center gap-2 transition hover:scale-105 shadow-xl"
              >
                Watch Movie
              </Link>
              <Link
                to={`/movie/${topMovie.id}`}
                className="bg-zinc-800/80 hover:bg-zinc-700/80 text-white px-7 py-3.5 rounded-lg font-bold text-base flex items-center gap-2 transition hover:scale-105 border border-white/20 backdrop-blur-md"
              >
                Movie Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Content Rows */}
      <div className="px-4 md:px-12 -mt-16 md:-mt-20 relative z-30 space-y-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Top Blockbuster Movies" movies={featuredMovies} showViewAll={false} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Indian & Tollywood Blockbusters" movies={indianMovies} showViewAll={false} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Trending Right Now" movies={trendingMovies} showViewAll={false} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Action Packed Cinema" movies={actionMovies} showViewAll={false} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Critically Acclaimed Classics" movies={popularMovies} showViewAll={false} />
        </motion.div>
      </div>
    </div>
  );
}
