import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Flame, Target, BookOpen, AlertTriangle } from 'lucide-react';

const data = [
  { name: 'Mon', hours: 2.5, score: 65 },
  { name: 'Tue', hours: 3.8, score: 70 },
  { name: 'Wed', hours: 3.2, score: 72 },
  { name: 'Thu', hours: 4.5, score: 78 },
  { name: 'Fri', hours: 2.1, score: 75 },
  { name: 'Sat', hours: 5.5, score: 82 },
  { name: 'Sun', hours: 4.0, score: 85 },
];

const subjectsData = [
  { name: "Operating System", progress: 75, status: "good" },
  { name: "Software Engineering", progress: 40, status: "warning" },
  { name: "Java Programming", progress: 90, status: "excellent" },
  { name: "Advance Network", progress: 25, status: "danger" },
];

export default function Progress() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-1">Analytics & Progress</h1>
        <p className="text-muted-foreground">Visualize your journey to academic excellence.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl flex items-center gap-6">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="36" className="stroke-white/10 fill-none" strokeWidth="6" />
              <circle cx="40" cy="40" r="36" className="stroke-primary fill-none" strokeWidth="6" strokeDasharray="226" strokeDashoffset="56" strokeLinecap="round" />
            </svg>
            <span className="absolute font-bold text-white text-xl">75%</span>
          </div>
          <div>
            <h3 className="text-muted-foreground font-medium mb-1">Syllabus Covered</h3>
            <p className="text-sm text-white/50">On track for target date</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">12 <span className="text-lg text-muted-foreground font-normal">Days</span></h3>
            <p className="text-sm text-muted-foreground">Current Study Streak</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl flex items-center gap-6">
           <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">82%</h3>
            <p className="text-sm text-muted-foreground">Average Quiz Score</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Study Hours vs Performance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subject Breakdown */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Subject Progress</h3>
          <div className="space-y-6 flex-1">
            {subjectsData.map((sub, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-medium truncate pr-4">{sub.name}</span>
                  <span className="text-muted-foreground">{sub.progress}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      sub.status === 'excellent' ? 'bg-green-500' : 
                      sub.status === 'good' ? 'bg-primary' : 
                      sub.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-1">Attention Needed</h4>
                <p className="text-xs text-red-400/80">Advance Network is falling behind schedule. AI has added extra slots next week.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
