import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Compass, 
  BookOpen, 
  Laugh, 
  ShieldAlert, 
  HeartHandshake, 
  Wand2, 
  Hourglass, 
  Atom, 
  Film, 
  Heart,
  Crown
} from 'lucide-react';

const genres = [
  { name: 'Action', icon: Flame, gradient: 'from-[#8D3A2A] via-[#6B291D] to-[#3E160F]' },
  { name: 'Adventure', icon: Compass, gradient: 'from-[#65793F] via-[#48592B] to-[#2A3517]' },
  { name: 'Tollywood', icon: Crown, gradient: 'from-[#B34714] via-[#85310B] to-[#4D1A04]', query: 'Tollywood' },
  { name: 'Biography', icon: BookOpen, gradient: 'from-[#735A40] via-[#523F2A] to-[#302315]' },
  { name: 'Comedy', icon: Laugh, gradient: 'from-[#B5833B] via-[#855E24] to-[#4E3411]' },
  { name: 'Crime', icon: ShieldAlert, gradient: 'from-[#634E42] via-[#45342A] to-[#271C15]' },
  { name: 'Drama', icon: HeartHandshake, gradient: 'from-[#8C4E3D] via-[#633326] to-[#391B13]' },
  { name: 'Fantasy', icon: Wand2, gradient: 'from-[#66688A] via-[#484964] to-[#2B2B3E]' },
  { name: 'History', icon: Hourglass, gradient: 'from-[#856C4E] via-[#5E4B33] to-[#35291A]' },
  { name: 'Sci-Fi', icon: Atom, gradient: 'from-[#336384] via-[#224660] to-[#122738]' },
  { name: 'Thriller', icon: Film, gradient: 'from-[#8A2B2B] via-[#611A1A] to-[#380E0E]' },
  { name: 'Romance', icon: Heart, gradient: 'from-[#9B395E] via-[#702441] to-[#421224]' }
];

export default function GenreCategoryRow({ onSelectGenre }) {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    if (onSelectGenre) {
      onSelectGenre(genre.name);
    } else {
      navigate(`/search?genre=${encodeURIComponent(genre.query || genre.name)}`);
    }
  };

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-1.5 h-6 bg-gradient-to-b from-amber-500 to-red-600 mr-3 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">Genres & Categories</h2>
        </div>
        <button 
          onClick={() => navigate('/search')}
          className="text-xs md:text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          Explore All →
        </button>
      </div>

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide pt-1">
        {genres.map((g, idx) => {
          const IconComponent = g.icon;
          return (
            <motion.div
              key={g.name}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGenreClick(g)}
              className={`min-w-[130px] sm:min-w-[150px] md:min-w-[165px] h-[75px] md:h-[84px] rounded-xl bg-gradient-to-br ${g.gradient} border border-white/10 shadow-md p-3.5 flex flex-col justify-between cursor-pointer group transition-all shrink-0 hover:border-white/30 hover:shadow-xl hover:shadow-black/60 relative overflow-hidden`}
            >
              <div className="absolute right-2 -bottom-2 opacity-15 group-hover:opacity-30 group-hover:scale-110 transition-all pointer-events-none">
                <IconComponent className="w-16 h-16 text-white" />
              </div>
              
              <div className="flex items-center justify-between z-10">
                <IconComponent className="w-5 h-5 text-white/90 group-hover:text-white transition-colors" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 group-hover:text-white/80 transition-colors">
                  Browse
                </span>
              </div>

              <div className="z-10">
                <span className="text-sm md:text-base font-bold text-white tracking-wide drop-shadow-sm group-hover:translate-x-1 transition-transform inline-block">
                  {g.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
