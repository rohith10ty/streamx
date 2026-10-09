import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Menu, X, Play, ChevronDown, LogOut, Check } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'Series', path: '/series' },
  { name: 'My List', path: '/my-list' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Stranger Things Season 5",
      tag: "UPCOMING SERIES",
      date: "Premiere Next Friday",
      desc: "The final battle for Hawkins begins. Watch the official trailer now.",
      image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      link: "/movie/402"
    },
    {
      id: 2,
      title: "The Boys Season 4",
      tag: "NOW STREAMING",
      date: "New Episode Released",
      desc: "Episode 8 'Assassination Run' is now available in 4K Ultra HD.",
      image: "https://image.tmdb.org/t/p/w500/in1R2dDc421JxsoRWaIIAqVI2KE.jpg",
      link: "/movie/407"
    },
    {
      id: 3,
      title: "Peaky Blinders: The Final Chapter",
      tag: "COMING SOON",
      date: "Summer 2026",
      desc: "Cillian Murphy returns as Thomas Shelby in the anticipated movie event.",
      image: "/movies/peaky_blinders.jpg",
      link: "/movie/408"
    },
    {
      id: 4,
      title: "Dune: Part Two",
      tag: "NEW ON STREAMX",
      date: "Added Yesterday",
      desc: "Denis Villeneuve's sci-fi epic is now streaming in IMAX Enhanced audio.",
      image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      link: "/movie/4"
    },
    {
      id: 5,
      title: "RRR: Extended 4K Cut",
      tag: "SPECIAL EDITION",
      date: "Streaming Now",
      desc: "Experience S.S. Rajamouli's global phenomenon with remastered Dolby Atmos sound.",
      image: "/movies/rrr_backdrop.jpg",
      link: "/movie/601"
    },
    {
      id: 6,
      title: "Kalki 2898 AD",
      tag: "TRENDING NOW",
      date: "Exclusive Stream",
      desc: "Prabhas, Amitabh Bachchan, and Kamal Haasan in Indian cinema's biggest sci-fi saga.",
      image: "/movies/kalki.jpg",
      link: "/movie/603"
    },
    {
      id: 7,
      title: "Gladiator II",
      tag: "THEATRICAL PREVIEW",
      date: "Coming November",
      desc: "Ridley Scott returns to the Colosseum with Paul Mescal and Pedro Pascal.",
      image: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
      link: "/movie/501"
    }
  ];

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('streamx_user');
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    checkUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('streamx_user');
    setCurrentUser(null);
    setUserMenuOpen(false);
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-wider">
                Stream<span className="text-red-600">X</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors hover:text-white ${
                      isActive ? 'text-white' : 'text-gray-300'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-red-600 rounded-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Search movies, series (press Enter)..."
                    className="bg-zinc-900/90 border border-zinc-700 text-white text-xs rounded-full py-1.5 px-4 mr-2 focus:outline-none focus:border-red-500 placeholder-zinc-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <button 
                onClick={() => {
                  if (isSearchOpen && searchQuery.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  }
                  setIsSearchOpen(!isSearchOpen);
                }}
                className="text-gray-300 hover:text-white transition-colors p-2"
                title="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setNotifMenuOpen(!notifMenuOpen);
                  setUserMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors relative p-2" 
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-black" />
              </button>

              <AnimatePresence>
                {notifMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl py-3 z-50 backdrop-blur-xl"
                  >
                    <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-red-500" />
                        <h4 className="font-bold text-white text-sm">Notifications & Upcoming</h4>
                      </div>
                      <span className="text-[10px] bg-red-600/20 text-red-400 font-semibold px-2 py-0.5 rounded-full border border-red-500/30">
                        {notifications.length} New
                      </span>
                    </div>

                    <div 
                      data-lenis-prevent="true"
                      className="divide-y divide-zinc-800/60 max-h-80 overflow-y-auto hide-scrollbar overscroll-contain"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {notifications.map((item) => (
                        <div 
                          key={item.id} 
                          onClick={() => {
                            setNotifMenuOpen(false);
                            navigate(item.link);
                          }}
                          className="p-3.5 hover:bg-zinc-800/60 transition-colors cursor-pointer flex gap-3 group"
                        >
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-12 h-16 object-cover rounded-lg shrink-0 border border-zinc-700 group-hover:scale-105 transition-transform bg-zinc-800" 
                            onError={(e) => {
                              e.currentTarget.src = '/movies/peaky_blinders.jpg';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-[10px] font-bold text-red-400 tracking-wider">
                                {item.tag}
                              </span>
                              <span className="text-[10px] text-zinc-500">{item.date}</span>
                            </div>
                            <h5 className="text-sm font-semibold text-white truncate group-hover:text-red-400 transition-colors">
                              {item.title}
                            </h5>
                            <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-2 border-t border-zinc-800 text-center">
                      <button 
                        onClick={() => {
                          setNotifMenuOpen(false);
                          navigate('/series');
                        }}
                        className="text-xs text-zinc-400 hover:text-white transition-colors font-medium py-1 w-full block"
                      >
                        Explore All Upcoming Series →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <div 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 cursor-pointer group p-1"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-rose-700 flex items-center justify-center font-bold text-xs shadow-md shadow-red-900/30">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <User className="h-4 w-4 text-white" />}
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-300 group-hover:text-white transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-52 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl"
                  >
                    <div className="px-4 py-2 border-b border-zinc-800">
                      <p className="text-xs text-zinc-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{currentUser?.email || 'Guest User'}</p>
                    </div>

                    <Link
                      to="/my-list"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      My Watchlist
                    </Link>
                    <Link
                      to="/search"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      Browse Catalog
                    </Link>

                    <div className="border-t border-zinc-800 my-1"></div>

                    {currentUser ? (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-red-500 font-semibold hover:bg-zinc-800 transition-colors"
                      >
                        Sign In
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-300 hover:text-white p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-black/95 backdrop-blur-xl border-l border-gray-800 shadow-xl z-50 p-6 flex flex-col"
          >
            <div className="flex justify-end">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mt-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors ${
                      isActive ? 'text-red-500' : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto flex items-center space-x-4 pt-6 border-t border-gray-800">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-purple-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium">User Account</span>
                <span className="text-gray-400 text-xs">Settings & Profile</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
