import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, CalendarDays, TrendingUp, ArrowRight, Sparkles, X, ChevronDown, ChevronUp, BookOpen, GraduationCap } from 'lucide-react';
import { curriculumData } from '@/lib/msbte-data';

type CurriculumSection = {
  type: 'diploma' | 'btech';
  branch: string;
  sems: { label: string; key: string }[];
};

function CurriculumModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'diploma' | 'btech'>('diploma');
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);
  const [expandedSem, setExpandedSem] = useState<string | null>(null);

  const diplomaBranches = Object.keys(curriculumData.diploma);
  const btechBranches = Object.keys(curriculumData.btech);
  const branches = activeTab === 'diploma' ? diplomaBranches : btechBranches;
  const data = curriculumData[activeTab];

  const sems = activeTab === 'diploma'
    ? ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6']
    : ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8'];

  const semLabel = (s: string) => s.replace('sem', 'Semester ');

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[80vh] bg-[#0F0F0F] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div>
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" /> Full Curriculum Browser
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">Browse all branches and subjects — MSBTE K-Scheme Diploma & BTech</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="shrink-0 px-6 pt-4 flex gap-3">
          {(['diploma', 'btech'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setExpandedBranch(null); setExpandedSem(null); }}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === tab
                  ? 'bg-primary text-black'
                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-white'
              }`}
            >
              {tab === 'diploma' ? '🎓 Diploma (MSBTE)' : '🏛️ BTech'}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <GraduationCap className="w-4 h-4" />
            <span>{branches.length} branches</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-3 space-y-3">
          {branches.map(branch => {
            const branchData = (data as any)[branch];
            const isExpanded = expandedBranch === branch;
            const totalSubjects = sems.reduce((sum, s) => sum + (branchData[s]?.length || 0), 0);

            return (
              <div key={branch} className="border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => {
                    setExpandedBranch(isExpanded ? null : branch);
                    setExpandedSem(null);
                  }}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                      {branch.split(' ').map(w => w[0]).join('').slice(0, 3)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{branch}</h3>
                      <p className="text-xs text-muted-foreground">{sems.length} semesters • {totalSubjects} subjects</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <div className="px-4 py-3 space-y-2 bg-black/20">
                        {sems.map(sem => {
                          const subjects = branchData[sem] || [];
                          if (!subjects.length) return null;
                          const semKey = `${branch}-${sem}`;
                          const isSemExpanded = expandedSem === semKey;

                          return (
                            <div key={sem} className="rounded-xl overflow-hidden border border-white/5">
                              <button
                                onClick={() => setExpandedSem(isSemExpanded ? null : semKey)}
                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                              >
                                <span className="font-semibold text-sm text-white">{semLabel(sem)}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">{subjects.length} subjects</span>
                                  {isSemExpanded ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                                </div>
                              </button>

                              <AnimatePresence>
                                {isSemExpanded && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden border-t border-white/5"
                                  >
                                    <div className="divide-y divide-white/5">
                                      {subjects.map((subj: any) => (
                                        <div key={subj.code} className="px-5 py-3 flex items-start justify-between gap-4">
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <span className="text-xs font-mono text-primary/70">{subj.code}</span>
                                              {subj.isElective && <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-yellow-500/30 text-yellow-400">Elective</span>}
                                            </div>
                                            <p className="text-sm text-white font-medium mt-0.5">{subj.name}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">{subj.description}</p>
                                          </div>
                                          <div className="shrink-0 text-right">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                              subj.difficulty === 'Easy' ? 'text-green-400 bg-green-500/10 border border-green-500/20' :
                                              subj.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                                              'text-red-400 bg-red-500/10 border border-red-500/20'
                                            }`}>{subj.difficulty}</span>
                                            <p className="text-[10px] text-muted-foreground mt-1">{subj.hours}h</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="shrink-0 p-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Ready to start studying?</p>
          <Link href="/login">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-primary text-black font-bold text-sm flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function Landing() {
  const [showCurriculum, setShowCurriculum] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-yellow-600/10 blur-[100px] rounded-full mix-blend-screen"></div>
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
          <button
            onClick={() => setShowCurriculum(true)}
            className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden sm:block"
          >
            Curriculum
          </button>
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
          Your premium study companion designed specifically for MSBTE K-Scheme Diploma and BTech students. Generate timetables, take daily quizzes, and master every subject.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/login">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground font-bold text-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] cursor-pointer">
              Start Free <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <button
            onClick={() => setShowCurriculum(true)}
            className="px-8 py-4 rounded-full glass-card border border-white/10 text-white font-medium text-lg hover:bg-white/5 hover:border-primary/30 transition-all cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-primary" /> View Curriculum
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="mt-20 grid grid-cols-3 gap-8 md:gap-16"
        >
          {[
            { value: '10+', label: 'Diploma Branches' },
            { value: '100+', label: 'Subjects Covered' },
            { value: '500+', label: 'Quiz Questions' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-black text-gradient-gold">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
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
                title: "Smart Weekly Planner",
                desc: "Auto-generates a personalized timetable distributing your subjects across available study hours with one click."
              },
              {
                icon: BrainCircuit,
                title: "Per-Subject Daily Quizzes",
                desc: "Take a quiz for each subject you study — 10 targeted questions per subject, multiple quizzes per day, all tracked."
              },
              {
                icon: TrendingUp,
                title: "Deep Progress Analytics",
                desc: "See quiz scores per subject, study hours logged, weekly consistency charts, and your predicted exam score."
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

      {/* Branches Marquee */}
      <section className="py-12 border-y border-white/5 overflow-hidden">
        <p className="text-center text-xs text-muted-foreground mb-6 tracking-widest uppercase">Available For All Major Branches</p>
        <div className="flex gap-4 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[
            'Computer Engineering', 'Information Technology', 'Electronics & Telecom', 'Mechanical Engineering',
            'Civil Engineering', 'Electrical Engineering', 'Automobile Engineering', 'Chemical Technology',
            'BTech Computer Engineering', 'BTech IT', 'BTech Electronics', 'BTech Mechanical',
            'Computer Engineering', 'Information Technology', 'Electronics & Telecom', 'Mechanical Engineering',
          ].map((branch, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/3 border border-white/8 text-sm text-muted-foreground shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              {branch}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-muted-foreground text-sm relative z-10">
        <p>© 2025 PlanSmart. Premium Study Tools for MSBTE & BTech Students.</p>
      </footer>

      {/* Curriculum Modal */}
      <AnimatePresence>
        {showCurriculum && <CurriculumModal onClose={() => setShowCurriculum(false)} />}
      </AnimatePresence>
    </div>
  );
}
