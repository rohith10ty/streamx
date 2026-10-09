import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ContentRow from '../components/ContentRow';
import GenreCategoryRow from '../components/GenreCategoryRow';
import { indianMovies, trendingMovies, upcomingMovies, popularMovies, newReleases, topPicks, actionMovies, seriesList } from '../data/movies';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const continueWatching = [
  { id: 202, title: 'The Matrix', image: 'https://image.tmdb.org/t/p/w500/icmmSD4vTTDKOq2vvdulafOGw93.jpg', progress: 65 },
  { id: 1, title: 'Inception', image: 'https://image.tmdb.org/t/p/w500/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg', progress: 30 },
  { id: 3, title: 'Interstellar', image: 'https://image.tmdb.org/t/p/w500/xJHokMbljvjADYdit5fK5VQsXEG.jpg', progress: 15 }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white pb-24 overflow-x-hidden">
      <HeroSection />
      
      <div className="px-4 md:px-12 pt-12 md:pt-16 relative z-30 space-y-12 md:space-y-16">
        {/* Continue Watching */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-800 mr-3 rounded-full"></div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">Continue Watching</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {continueWatching.map(movie => (
              <div key={movie.id} className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px] relative group cursor-pointer shrink-0">
                <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg">
                  <img src={movie.image} alt={movie.title} className="w-full h-[140px] md:h-[180px] object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/50">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-zinc-800 overflow-hidden rounded-b-xl">
                  <div className="h-full bg-red-600" style={{ width: `${movie.progress}%` }}></div>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{movie.title}</h3>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Genre Categories Bar (matching reference UI) */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <GenreCategoryRow />
        </motion.div>

        {/* Popular Indian & Tollywood Cinema row before Trending Now */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Popular Indian & Tollywood Cinema" movies={indianMovies} />
        </motion.div>

        {/* Trending Now */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Trending Now" movies={trendingMovies} />
        </motion.div>

        {/* Upcoming Movies section right after Trending Now */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Upcoming Movies & Premieres" movies={upcomingMovies} />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Popular on StreamX" movies={popularMovies} />
        </motion.div>

        {/* Featured Banner */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="my-16 relative h-[380px] md:h-[480px] rounded-2xl overflow-hidden flex items-center shadow-2xl border border-zinc-800"
        >
          <img src="https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg" alt="Featured Oppenheimer" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="relative z-10 p-8 md:p-16 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-600 text-white text-xs font-black tracking-widest px-2.5 py-0.5 rounded">STREAMX SPOTLIGHT</span>
              <span className="text-amber-400 font-bold text-sm">★ 8.9 TMDb</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-md text-white">Oppenheimer</h2>
            <p className="text-zinc-300 mb-8 text-base md:text-lg drop-shadow-md line-clamp-3 md:line-clamp-none leading-relaxed">
              The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. Directed by Christopher Nolan.
            </p>
            <div className="flex gap-4">
              <Link to="/movie/5?play=true" className="flex items-center gap-2 bg-white text-black px-7 py-3 rounded-lg font-extrabold hover:bg-zinc-200 transition-all hover:scale-105 shadow-xl">
                <Play className="w-5 h-5" fill="currentColor" /> Play Now
              </Link>
              <Link to="/movie/5" className="flex items-center gap-2 bg-zinc-800/80 text-white px-7 py-3 rounded-lg font-bold hover:bg-zinc-700 transition backdrop-blur-sm border border-white/20">
                <Info className="w-5 h-5" /> More Info
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="New Releases" movies={newReleases} />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Top Picks For You" movies={topPicks} />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Action & Adventure" movies={actionMovies} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
          <ContentRow title="Binge-Worthy Series" movies={seriesList} />
        </motion.div>
      </div>
    </div>
  );
}
