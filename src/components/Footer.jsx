import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Mail, ExternalLink, Tv, Film, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 pt-16 pb-8 border-t border-gray-800 relative overflow-hidden">
      {/* Gradient Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Company */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center">
                <Play className="h-4 w-4 text-white fill-white" />
              </div>
              <span className="text-xl font-black text-white tracking-wider">
                Stream<span className="text-red-600">X</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Experience the ultimate streaming platform with premium movies, exclusive series, and live events. Anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors bg-gray-900 p-2 rounded-full">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors bg-gray-900 p-2 rounded-full">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors bg-gray-900 p-2 rounded-full">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors bg-gray-900 p-2 rounded-full">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/movies/action" className="hover:text-red-500 transition-colors">Action & Adventure</Link></li>
              <li><Link to="/movies/comedy" className="hover:text-red-500 transition-colors">Comedy</Link></li>
              <li><Link to="/movies/drama" className="hover:text-red-500 transition-colors">Drama</Link></li>
              <li><Link to="/movies/scifi" className="hover:text-red-500 transition-colors">Sci-Fi & Fantasy</Link></li>
              <li><Link to="/movies/documentary" className="hover:text-red-500 transition-colors">Documentaries</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/faq" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link to="/devices" className="hover:text-white transition-colors">Supported Devices</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Account Settings</Link></li>
              <li><Link to="/billing" className="hover:text-white transition-colors">Billing & Plans</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Stay Connected</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates, releases, and exclusive offers.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-red-600 transition-colors"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <p>&copy; {new Date().getFullYear()} StreamX. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
