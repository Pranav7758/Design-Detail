import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BrainCircuit, CalendarDays, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-yellow-600/10 blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] opacity-5 mix-blend-overlay object-cover"></div>
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-abstract.png`} 
          alt="Abstract background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-yellow-600 flex items-center justify-center text-primary-foreground font-bold text-xl shadow-[0_0_15px_rgba(212,175,55,0.5)]">
            SP
          </div>
          <span className="font-display font-bold text-2xl tracking-wide">Plan<span className="text-primary">Smart</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <span className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer hidden sm:block">Sign In</span>
          </Link>
          <Link href="/login">
            <button className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 text-sm font-medium transition-all gold-glow-hover cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30 text-primary mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Powered by Intelligent Scheduling</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-display font-bold tracking-tight leading-[1.1] mb-6"
        >
          Plan <span className="text-gradient-gold">Smart.</span><br />
          Study <span className="relative">
            Better.
            <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-5 text-primary" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                d="M2 7.00002C48.5 -1.49998 123 -1.49998 198 7.00002" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12"
        >
          Your premium study companion designed specifically for MSBTE and BTech students. Automatically generate timetables, track progress, and master subjects.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/login">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground font-bold text-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] cursor-pointer">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <button className="px-8 py-4 rounded-full glass-card border border-white/10 text-white font-medium text-lg hover:bg-white/5 transition-all cursor-pointer">
            View Curriculum
          </button>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-black/50 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Master Your <span className="text-primary">Academics</span></h2>
            <p className="text-muted-foreground">Everything you need to succeed in one premium dashboard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CalendarDays,
                title: "Smart Scheduling",
                desc: "AI intelligently distributes your syllabus across your available study hours, creating the perfect weekly timetable."
              },
              {
                icon: BrainCircuit,
                title: "Daily Quizzes",
                desc: "Test your retention with subject-specific quizzes designed to reinforce memory and predict exam scores."
              },
              {
                icon: TrendingUp,
                title: "Deep Analytics",
                desc: "Visualize your consistency, identify weak subjects, and track your overall completion with stunning charts."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-muted-foreground text-sm relative z-10">
        <p>© 2025 PlanSmart. Premium Study Tools. Designed for Excellence.</p>
      </footer>
    </div>
  );
}
