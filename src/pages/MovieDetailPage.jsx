import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Check, ThumbsUp, Share2, ArrowLeft, Star, Clock, Calendar, X, Volume2 } from 'lucide-react';
import { getMovieById, allMovies } from '../data/movies';
import MovieCard from '../components/MovieCard';

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchedMovie = getMovieById(id);
    if (fetchedMovie) {
      setMovie(fetchedMovie);
      // check if saved in list
      const saved = localStorage.getItem('streamx_mylist');
      if (saved) {
        try {
          const ids = JSON.parse(saved);
          setIsSaved(ids.includes(fetchedMovie.id));
        } catch (e) {}
      }
    }
    // Check if query params has play=true
    const query = new URLSearchParams(location.search);
    if (query.get('play') === 'true') {
      setIsPlaying(true);
    }
  }, [id, location.search]);

  const toggleSave = () => {
    if (!movie) return;
    const saved = localStorage.getItem('streamx_mylist');
    let ids = [];
    try {
      ids = saved ? JSON.parse(saved) : [];
    } catch (e) {
      ids = [];
    }
    if (isSaved) {
      ids = ids.filter(itemId => itemId !== movie.id);
      setIsSaved(false);
    } else {
      ids.push(movie.id);
      setIsSaved(true);
    }
    localStorage.setItem('streamx_mylist', JSON.stringify(ids));
  };

  if (!movie) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  const relatedMovies = allMovies.filter(m => m.id !== movie.id).slice(0, 8);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[85vh] w-full bg-zinc-950">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={movie.backdrop || movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-opacity duration-700" 
            onError={(e) => {
              if (movie.poster && e.currentTarget.src !== movie.poster) {
                e.currentTarget.src = movie.poster;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 md:left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 z-10 flex flex-col justify-end">
          <div className="flex flex-col md:flex-row md:items-end gap-6 max-w-5xl">
            {/* Poster thumbnail badge */}
            <div className="hidden sm:block w-28 md:w-36 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 shrink-0">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.src = 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg';
                }}
              />
            </div>

            <div className="flex-1">
              {movie.industry && (
                <span className="inline-block mb-2 bg-gradient-to-r from-amber-500 to-red-600 text-black font-extrabold text-xs px-2.5 py-0.5 rounded shadow">
                  {movie.industry} Blockbuster
                </span>
              )}
              <motion.h1 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 drop-shadow-xl text-white tracking-tight"
              >
                {movie.title}
              </motion.h1>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base text-gray-300 mb-6 drop-shadow-md"
              >
                <span className="text-emerald-400 font-bold">{movie.match || 95}% Match</span>
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/>{movie.year}</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/>{movie.duration}</span>
                <span className="border border-zinc-600 bg-black/40 px-2 rounded text-xs py-0.5 font-semibold text-zinc-300">{movie.maturityRating || 'PG-13'}</span>
                <span className="flex items-center text-amber-400 font-semibold"><Star className="w-4 h-4 mr-1" fill="currentColor"/>{movie.rating}</span>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex items-center gap-3 md:gap-4"
              >
                <button 
                  onClick={() => {
                    if (movie.type === 'Series') {
                      setActiveTab('episodes');
                    } else {
                      setActiveTab('watch movie');
                    }
                  }}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 md:px-9 py-3 rounded-lg font-extrabold text-base md:text-lg transition-all duration-200 hover:scale-105 shadow-xl shadow-red-600/30"
                >
                  <Play className="w-5 h-5 fill-white" /> {movie.type === 'Series' ? 'Watch Episodes' : 'Watch Movie'}
                </button>
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-5 md:px-7 py-3 rounded-lg font-bold text-base md:text-lg backdrop-blur-md transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-white" /> Trailer
                </button>
                <button 
                  onClick={toggleSave}
                  className={`p-3 md:p-3.5 border-2 rounded-full transition-all group ${isSaved ? 'bg-red-600 border-red-600 text-white' : 'border-zinc-500 bg-black/60 hover:bg-white hover:text-black hover:border-white text-white'}`}
                  title={isSaved ? "In Watchlist" : "Add to Watchlist"}
                >
                  {isSaved ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </button>
                <button 
                  onClick={() => setLiked(!liked)}
                  className={`p-3 md:p-3.5 border-2 rounded-full transition-all group ${liked ? 'bg-zinc-800 border-red-500 text-red-500' : 'border-zinc-500 bg-black/60 hover:bg-white hover:text-black hover:border-white text-white'}`}
                  title="Like"
                >
                  <ThumbsUp className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button 
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Movie link copied to clipboard!');
                    }
                  }}
                  className="p-3 md:p-3.5 border-2 border-zinc-500 rounded-full bg-black/60 hover:bg-white hover:text-black hover:border-white transition-all text-white group"
                  title="Share"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Trailer Player Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 md:p-8"
          >
            <div className="relative w-full max-w-5xl bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
              <div className="flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
                  <h3 className="font-bold text-white text-base md:text-lg">Now Streaming Official Trailer: {movie.title}</h3>
                </div>
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative aspect-video bg-black flex items-center justify-center">
                {movie.trailerYoutubeId ? (
                  <iframe
                    className="w-full h-full aspect-video border-0"
                    src={`https://www.youtube.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${movie.title} Official Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    className="w-full h-full aspect-video border-0"
                    src={`https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(movie.title + ' official trailer')}&autoplay=1`}
                    title={`${movie.title} Trailer`}
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="flex gap-8 border-b border-gray-800 mb-8">
          {(movie.type === 'Series' 
            ? ['overview', 'episodes', 'more like this'] 
            : ['overview', 'watch movie', 'more like this']
          ).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-base md:text-lg font-bold capitalize transition-colors ${activeTab === tab ? 'text-white border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab === 'watch movie' ? '🎬 Watch Movie' : tab === 'episodes' ? '📺 Episodes' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-3 gap-8 md:gap-16">
            <div className="md:col-span-2 space-y-8">
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                {movie.description || "A breathtaking journey into the unknown. When an unexpected event threatens the world as we know it, a group of unlikely heroes must band together to save humanity from impending doom in this action-packed thriller."}
              </p>
              
              <div className="pt-8 border-t border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-red-600 rounded-full"></div>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">Official Trailer & Previews</h3>
                  </div>
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="text-xs md:text-sm text-red-500 hover:text-red-400 font-semibold flex items-center gap-1 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Expand Fullscreen
                  </button>
                </div>

                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
                  {movie.trailerYoutubeId ? (
                    <iframe
                      className="w-full h-full border-0"
                      src={`https://www.youtube.com/embed/${movie.trailerYoutubeId}?rel=0&modestbranding=1`}
                      title={`${movie.title} Official Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <iframe
                      className="w-full h-full border-0"
                      src={`https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(movie.title + ' official trailer')}`}
                      title={`${movie.title} Trailer`}
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-6 text-sm text-gray-400">
              <div>
                <span className="text-gray-500 block mb-1">Director</span>
                <p className="text-white text-base">{movie.director}</p>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Cast</span>
                <p className="text-white text-base mb-2">{movie.cast?.join(', ')}</p>
                <div className="flex gap-2 mt-2">
                  {(movie.cast || []).slice(0, 3).map((actor, i) => (
                    <div key={i} className="w-12 h-12 bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center text-xs text-gray-400 font-bold">
                      {actor.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Genres</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(movie.genre || []).map((g, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-900 rounded-full text-xs border border-gray-800 text-gray-300">{g}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Watch Movie Tab (Exclusive for Movies) */}
        {activeTab === 'watch movie' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">StreamX Ultra Cinema Player</span>
                    <span className="bg-red-600 text-[10px] text-white px-2 py-0.5 rounded font-black">4K UHD</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Runtime: {movie.duration} • Dolby Atmos 5.1 • HDR10+</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700 font-semibold">
                    Server: US-East 4K CDN
                  </span>
                  <span className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700 font-semibold">
                    Audio: Original 5.1 Surround
                  </span>
                  <span className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700 font-semibold">
                    Subtitles: English [CC]
                  </span>
                </div>
              </div>

              {/* Theater Video Frame */}
              <div className="mt-6 aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black relative group">
                {movie.trailerYoutubeId ? (
                  <iframe
                    className="w-full h-full border-0"
                    src={`https://www.youtube.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${movie.title} Full Movie Experience`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    className="w-full h-full border-0"
                    src={`https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(movie.title + ' full movie trailer')}&autoplay=1`}
                    title={`${movie.title} Video Stream`}
                    allowFullScreen
                  />
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/80 text-sm">
                <div className="flex items-center gap-3 text-zinc-400 text-xs">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    Master Audio: Dolby Digital 5.1
                  </span>
                  <span>•</span>
                  <span>Bitrate: 28.5 Mbps Ultra HD</span>
                  <span>•</span>
                  <span>Format: HEVC 4K 60FPS</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert(`Starting 4K high-speed download for ${movie.title}`)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-3.5 py-2 rounded-lg font-medium transition"
                  >
                    Download 4K (Offline)
                  </button>
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Pop-out Player
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Episodes Tab (Exclusive for Series) */}
        {activeTab === 'episodes' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">Season 1</h3>
                <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full border border-zinc-700">
                  {movie.duration || '6 Episodes'}
                </span>
              </div>
              <span className="text-xs text-zinc-400">All episodes streaming in 4K Ultra HD</span>
            </div>

            <div className="grid gap-4">
              {[
                { ep: 1, title: "Chapter 1: The New Horizon", time: "56m", desc: "A shocking revelation turns the stakes upside down as old rivalries resurface." },
                { ep: 2, title: "Chapter 2: Shadow of the Syndicate", time: "52m", desc: "Secret alliances are tested when unexpected guests arrive under the cover of night." },
                { ep: 3, title: "Chapter 3: Point of No Return", time: "58m", desc: "A daring heist leads to severe consequences that ripple across the entire city." },
                { ep: 4, title: "Chapter 4: The Turning Tide", time: "50m", desc: "Loyalties are challenged when a critical piece of intelligence falls into enemy hands." },
                { ep: 5, title: "Chapter 5: Crossfire", time: "61m", desc: "An all-out confrontation erupts, forcing both sides to make an irreversible sacrifice." },
                { ep: 6, title: "Chapter 6: Finale - The Reckoning", time: "64m", desc: "The season finale reaches an explosive climax that changes the destiny forever." }
              ].map((item) => (
                <div 
                  key={item.ep} 
                  onClick={() => setIsPlaying(true)}
                  className="bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 transition-all cursor-pointer flex flex-col md:flex-row gap-4 items-start md:items-center group"
                >
                  <div className="relative w-full md:w-48 aspect-video rounded-lg overflow-hidden shrink-0 bg-zinc-950 border border-zinc-800">
                    <img 
                      src={movie.backdrop || movie.poster} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-1.5 py-0.5 rounded text-white font-mono">
                      {item.time}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-500 font-black text-sm">EPISODE {item.ep}</span>
                      <span className="text-zinc-600">•</span>
                      <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <button className="hidden md:flex items-center gap-1.5 bg-zinc-800 group-hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current" /> Play
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'more like this' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {relatedMovies.map(m => (
              <MovieCard key={m.id} movie={m} className="w-full" />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
