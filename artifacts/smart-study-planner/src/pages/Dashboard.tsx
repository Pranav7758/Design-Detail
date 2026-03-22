import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, TrendingUp, Target, ChevronRight, BookOpen } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Link } from 'wouter';

export default function Dashboard() {
  const { user, config } = useAppContext();

  // Mock data for dashboard
  const stats = [
    { label: "Today's Study Time", value: "3h 20m", target: config?.studySettings.targetHours + "h", icon: Clock, color: "text-blue-400" },
    { label: "Weekly Completion", value: "68%", target: "100%", icon: CheckCircle2, color: "text-green-400" },
    { label: "Total Hours", value: "47h", target: "120h", icon: Target, color: "text-purple-400" },
  ];

  const todaySchedule = [
    { time: "18:00 - 19:30", subject: config?.subjects[0]?.name || "Operating System", topic: "Process Management", status: "completed" },
    { time: "19:45 - 21:00", subject: config?.subjects[1]?.name || "Software Engineering", topic: "SDLC Models", status: "current" },
    { time: "21:15 - 22:00", subject: config?.subjects[2]?.name || "Java Programming", topic: "Collections Framework", status: "pending" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Welcome back, <span className="text-primary">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-muted-foreground">
            {config?.course === 'diploma' ? 'Diploma' : 'B.Tech'} • {config?.branch} • {config?.semester.replace('sem', 'Semester ')}
          </p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="glass-card px-4 py-2 rounded-full border-primary/30 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-white">Study session active</span>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl hover:border-white/20 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-black/40 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{stat.label}</span>
              <span className="text-white/40">/ {stat.target}</span>
            </div>
          </motion.div>
        ))}

        {/* Highlight Stat */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-primary/20 to-yellow-600/10 border border-primary/30 p-6 rounded-2xl gold-glow relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-colors"></div>
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-black/40 text-primary w-max mb-4 border border-primary/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-1">82%</h3>
            <p className="text-sm text-primary mb-3">Predicted Exam Score</p>
            <div className="text-[10px] text-white/50 leading-tight">
              Formula: Quiz(0.6) + Consistency(0.3) + Syllabus(0.1)
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-white">Today's Schedule</h2>
            <Link href="/planner">
              <button className="text-sm text-primary hover:underline flex items-center">
                View Full Plan <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          
          <div className="glass-card rounded-2xl p-2">
            {todaySchedule.map((slot, i) => (
              <div key={i} className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 transition-colors ${slot.status === 'current' ? 'bg-primary/10 border border-primary/30' : 'hover:bg-white/5 border border-transparent'}`}>
                <div className="text-sm font-medium text-muted-foreground min-w-[120px]">
                  {slot.time}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold ${slot.status === 'current' ? 'text-primary' : 'text-white'}`}>{slot.subject}</h4>
                  <p className="text-sm text-muted-foreground">{slot.topic}</p>
                </div>
                <div>
                  {slot.status === 'completed' && <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">Completed</span>}
                  {slot.status === 'current' && <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs border border-primary/30 animate-pulse">In Progress</span>}
                  {slot.status === 'pending' && <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-xs border border-white/10">Pending</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Quiz Action */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white">Daily Action</h2>
          <div className="glass-card rounded-2xl p-6 text-center border-t-2 border-t-primary relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Daily Quiz Pending</h3>
            <p className="text-sm text-muted-foreground mb-6">Test your knowledge on yesterday's topics to improve retention.</p>
            <Link href="/quiz">
              <button className="w-full py-3 rounded-xl bg-primary text-black font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                Start Quiz
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
