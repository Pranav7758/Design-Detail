import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  CalendarDays, 
  BrainCircuit, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Menu,
  X,
  BookOpen
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const publicRoutes = ['/', '/login'];

  // Check auth
  useEffect(() => {
    if (!user && !publicRoutes.includes(location)) {
      setLocation('/login');
    } else if (user && !user.isSetupComplete && location !== '/setup') {
      setLocation('/setup');
    }
  }, [user, location, setLocation]);

  // Handle scroll for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If on public/setup page or not logged in, just render children without sidebar
  if (!user || location === '/setup' || location === '/' || location === '/login') {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>;
  }

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Study Planner', path: '/planner', icon: CalendarDays },
    { name: 'Daily Quiz', path: '/quiz', icon: BrainCircuit },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
  ];

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass-panel h-full relative z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
            SP
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-white">Plan<span className="text-primary">Smart</span></span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
                  ${isActive 
                    ? 'bg-primary/10 text-primary font-medium gold-glow border border-primary/20' 
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'}
                `}>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-secondary border border-white/10 flex items-center justify-center font-bold text-primary">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-white truncate max-w-[120px]">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[120px]">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header & Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        
        {/* Mobile Header */}
        <header className={`md:hidden flex items-center justify-between p-4 sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              SP
            </div>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 bg-secondary rounded-lg border border-white/5 text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-card border-l border-white/10 z-50 p-6 flex flex-col shadow-2xl"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="font-display font-bold text-xl text-white">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-muted-foreground hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <nav className="flex-1 space-y-2">
                  {navItems.map((item) => {
                    const isActive = location === item.path;
                    return (
                      <Link key={item.path} href={item.path}>
                        <div 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`
                            flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer transition-all
                            ${isActive 
                              ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                              : 'text-muted-foreground hover:bg-white/5 hover:text-white'}
                          `}
                        >
                          <item.icon className="w-6 h-6" />
                          <span className="text-lg">{item.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto border-t border-white/10 pt-6">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-destructive/10 text-destructive font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
          <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
