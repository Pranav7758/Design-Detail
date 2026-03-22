import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [, setLocation] = useLocation();
  const { login, signup } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isLogin) {
        await login(email, password);
        setLocation('/dashboard');
      } else {
        if (!name.trim()) {
          setError('Please enter your full name.');
          setIsLoading(false);
          return;
        }
        await signup(email, password, name);
        setSuccessMsg('Account created! Check your email to confirm, then sign in.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('demo@example.com');
    setPassword('demo123456');
    if (!isLogin) setName('Demo Student');
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-yellow-600 flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-[0_0_30px_rgba(212,175,55,0.4)] mx-auto mb-6">
            SP
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to continue your premium experience.' : 'Join MSBTE Smart Study Planner today.'}
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 relative gold-glow">
          <div className="flex p-1 bg-black/50 rounded-xl mb-8 border border-white/5">
            <button
              onClick={() => { setIsLogin(true); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${isLogin ? 'bg-secondary text-white shadow-sm border border-white/10' : 'text-muted-foreground hover:text-white'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${!isLogin ? 'bg-secondary text-white shadow-sm border border-white/10' : 'text-muted-foreground hover:text-white'}`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
              {successMsg}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-xs font-medium text-muted-foreground ml-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      required={!isLogin}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-muted-foreground">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
              {!isLogin && <p className="text-xs text-muted-foreground ml-1">Minimum 6 characters</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-yellow-600 text-primary-foreground font-bold text-lg mt-4 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              <Sparkles className="w-4 h-4" /> Use Demo Credentials
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
