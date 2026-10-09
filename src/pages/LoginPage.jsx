import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Play } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    
    // Successful login
    localStorage.setItem('streamx_user', JSON.stringify({ email, name: 'User' }));
    navigate('/');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md px-6 py-8"
      >
        <motion.div 
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-zinc-900/60 backdrop-blur-md p-8 rounded-2xl border border-zinc-800 shadow-2xl"
        >
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-white">Stream<span className="text-red-600">X</span></span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({...errors, email: null}); }}
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:ring-red-500'} rounded-lg leading-5 bg-zinc-800/50 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors({...errors, password: null}); }}
                  className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:ring-red-500'} rounded-lg leading-5 bg-zinc-800/50 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-zinc-700 rounded bg-zinc-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-zinc-300 hover:text-white transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-red-500 transition-colors mt-6"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900/60 text-zinc-400 backdrop-blur-md">OR</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-zinc-700 rounded-lg shadow-sm bg-zinc-800/50 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-zinc-700 rounded-lg shadow-sm bg-zinc-800/50 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
                >
                  <span className="sr-only">Sign in with Apple</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.145,11.144c0.038-2.607,2.13-3.837,2.227-3.896c-1.218-1.782-3.109-2.022-3.791-2.046c-1.611-0.163-3.149,0.952-3.975,0.952c-0.825,0-2.083-0.925-3.415-0.899c-1.733,0.026-3.332,1.008-4.218,2.553c-1.802,3.125-0.46,7.747,1.298,10.287c0.854,1.236,1.86,2.615,3.176,2.564c1.265-0.052,1.751-0.819,3.284-0.819c1.533,0,1.968,0.819,3.311,0.793c1.368-0.026,2.23-1.246,3.081-2.483c0.985-1.439,1.391-2.836,1.411-2.91C17.487,15.228,15.107,14.301,15.145,11.144z M12.835,3.22c0.697-0.843,1.166-2.015,1.037-3.187c-1.009,0.041-2.233,0.672-2.951,1.541c-0.643,0.776-1.206,1.969-1.053,3.122C11.002,4.781,12.135,4.08,12.835,3.22z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-zinc-400">
              New to StreamX?{' '}
              <Link to="/signup" className="text-white hover:underline transition-all">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
