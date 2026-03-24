import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Flame, Target, BookOpen, AlertTriangle, BrainCircuit, Clock, TrendingUp } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { api } from '@/lib/api';

export default function Progress() {
  const { user, config } = useAppContext();
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    Promise.all([
      api.getQuizResults(user.id).catch(() => []),
      api.getSessions(user.id).catch(() => []),
    ]).then(([q, s]) => {
      setQuizResults(q);
      setSessions(s);
    }).finally(() => setIsLoading(false));
  }, [user?.id]);

  const avgQuizScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((sum, r) => sum + parseFloat(r.percentage), 0) / quizResults.length)
    : 0;

  const totalHours = sessions.reduce((sum, s) => sum + parseFloat(s.hours || '0'), 0);

  const streakDays = useMemo(() => {
    const sessionDates = sessions.map(s => s.sessionDate).filter(Boolean);
    const quizDates = quizResults.map(r => (r.createdAt || r.created_at || '').slice(0, 10)).filter(Boolean);
    const allDates = [...new Set([...sessionDates, ...quizDates])].sort().reverse();
    if (!allDates.length) return 0;
    let streak = 0;
    let prev = new Date();
    prev.setHours(0, 0, 0, 0);
    for (const d of allDates) {
      const cur = new Date(d);
      cur.setHours(0, 0, 0, 0);
      const diffDays = Math.round((prev.getTime() - cur.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        streak++;
        prev = cur;
      } else break;
    }
    return streak;
  }, [sessions, quizResults]);

  const weeklyChartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    return days.map((name, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateStr = date.toISOString().slice(0, 10);
      const daySessions = sessions.filter(s => s.sessionDate === dateStr);
      const hours = daySessions.reduce((sum, s) => sum + parseFloat(s.hours || '0'), 0);
      const dayQuizzes = quizResults.filter(r => r.createdAt?.startsWith(dateStr));
      const avgScore = dayQuizzes.length > 0
        ? Math.round(dayQuizzes.reduce((sum, r) => sum + parseFloat(r.percentage), 0) / dayQuizzes.length)
        : 0;
      return { name, hours: parseFloat(hours.toFixed(1)), score: avgScore };
    });
  }, [sessions, quizResults]);

  const quizChartData = useMemo(() => {
    return quizResults.slice(0, 10).reverse().map((r, i) => ({
      name: `Q${i + 1}`,
      score: Math.round(parseFloat(r.percentage)),
      subject: r.subject || 'General',
    }));
  }, [quizResults]);

  const subjectProgress = useMemo(() => {
    if (!config?.subjects?.length) return [];

    const subjectHours: Record<string, number> = {};
    sessions.forEach(s => {
      if (s.subjectName) {
        subjectHours[s.subjectName] = (subjectHours[s.subjectName] || 0) + parseFloat(s.hours || '0');
      }
    });

    const subjectQuizScores: Record<string, number[]> = {};
    quizResults.forEach(r => {
      const key = r.subject || '';
      if (key) {
        if (!subjectQuizScores[key]) subjectQuizScores[key] = [];
        subjectQuizScores[key].push(parseFloat(r.percentage));
      }
    });

    return config.subjects.map(sub => {
      const studied = subjectHours[sub.name] || 0;
      const target = Math.max(sub.hours * 0.3, 1);
      const hoursProgress = Math.min(100, Math.round((studied / target) * 100));

      const quizScores = subjectQuizScores[sub.name] || [];
      const quizProgress = quizScores.length > 0
        ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
        : 0;

      const progress = Math.min(100, Math.max(hoursProgress, quizProgress));
      return {
        name: sub.name,
        progress,
        studied: parseFloat(studied.toFixed(1)),
        quizzesDone: quizScores.length,
        status: progress >= 80 ? 'excellent' : progress >= 50 ? 'good' : progress >= 25 ? 'warning' : 'danger',
      };
    });
  }, [config, sessions, quizResults]);

  const targetHoursPerSubject = config?.studySettings?.targetHours
    ? config.subjects?.length
      ? Math.round((config.studySettings.targetHours * 30) / (config.subjects.length || 1))
      : 0
    : 0;

  const syllabusPercent = subjectProgress.length > 0
    ? Math.round(subjectProgress.reduce((sum, s) => sum + s.progress, 0) / subjectProgress.length)
    : 0;

  const dangerSubjects = subjectProgress.filter(s => s.status === 'danger');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-[#141414] border border-white/10 rounded-xl p-3 text-sm">
          <p className="text-white font-medium mb-1">{label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} style={{ color: p.color }}>{p.name}: {p.value}{p.name === 'score' ? '%' : 'h'}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-1">Analytics & Progress</h1>
        <p className="text-muted-foreground">Visualize your journey to academic excellence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl flex items-center gap-6">
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" className="stroke-white/10 fill-none" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="34"
                className="stroke-primary fill-none"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - syllabusPercent / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-bold text-white text-lg">{syllabusPercent}%</span>
          </div>
          <div>
            <h3 className="text-muted-foreground font-medium mb-1">Syllabus Covered</h3>
            <p className="text-sm text-white/50">
              {syllabusPercent >= 70 ? 'On track for exam' : syllabusPercent >= 40 ? 'Making progress' : 'Just getting started'}
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">
              {streakDays} <span className="text-lg text-muted-foreground font-normal">Day{streakDays !== 1 ? 's' : ''}</span>
            </h3>
            <p className="text-sm text-muted-foreground">Current Study Streak</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">
              {avgQuizScore > 0 ? `${avgQuizScore}%` : '—'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {quizResults.length > 0 ? `Avg Quiz Score (${quizResults.length} attempts)` : 'No quizzes yet'}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-2">This Week — Study Hours</h3>
          <p className="text-sm text-muted-foreground mb-6">{totalHours.toFixed(1)} total hours logged</p>
          {sessions.length === 0 ? (
            <div className="h-[240px] flex flex-col items-center justify-center gap-3">
              <Clock className="w-10 h-10 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">No study sessions logged yet.</p>
              <p className="text-xs text-white/30">Use the Study Planner to log sessions.</p>
            </div>
          ) : (
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="hours" name="hours" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Subject Progress</h3>
          {subjectProgress.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
              <p className="text-muted-foreground text-sm text-center">Complete setup to see subject tracking.</p>
            </div>
          ) : (
            <div className="space-y-5 flex-1">
              {subjectProgress.slice(0, 6).map((sub, i) => (
                <div key={sub.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white font-medium truncate pr-3 max-w-[150px]">{sub.name}</span>
                    <span className="text-muted-foreground shrink-0">{sub.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sub.progress}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full rounded-full ${
                        sub.status === 'excellent' ? 'bg-green-500' :
                        sub.status === 'good' ? 'bg-primary' :
                        sub.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {sub.studied > 0 ? `${sub.studied}h studied` : ''}
                    {sub.studied > 0 && (sub as any).quizzesDone > 0 ? ' · ' : ''}
                    {(sub as any).quizzesDone > 0 ? `${(sub as any).quizzesDone} quiz${(sub as any).quizzesDone > 1 ? 'zes' : ''} done` : sub.studied === 0 ? 'Not started' : ''}
                  </p>
                </div>
              ))}
            </div>
          )}

          {dangerSubjects.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-400 mb-1">Needs Attention</h4>
                  <p className="text-xs text-red-400/80">
                    {dangerSubjects.map(s => s.name).join(', ')} {dangerSubjects.length === 1 ? 'is' : 'are'} behind schedule.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {quizResults.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-primary" /> Quiz Performance History
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Your last {quizChartData.length} quiz attempts</p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#141414', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any) => [`${val}%`, 'Score']}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-xl text-center">
              <span className="text-2xl font-bold text-white">{quizResults.length}</span>
              <p className="text-xs text-muted-foreground mt-1">Total Quizzes</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <span className="text-2xl font-bold text-primary">{avgQuizScore}%</span>
              <p className="text-xs text-muted-foreground mt-1">Average Score</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <span className="text-2xl font-bold text-green-400">
                {quizResults.length > 0 ? Math.max(...quizResults.map(r => Math.round(parseFloat(r.percentage)))) : 0}%
              </span>
              <p className="text-xs text-muted-foreground mt-1">Best Score</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <span className="text-2xl font-bold text-white">
                {quizResults.length > 0 ? quizResults.reduce((sum, r) => sum + r.score, 0) : 0}
              </span>
              <p className="text-xs text-muted-foreground mt-1">Total Correct</p>
            </div>
          </div>

          {/* Per-subject quiz breakdown */}
          {(() => {
            const bySubject: Record<string, { attempts: number; scores: number[] }> = {};
            quizResults.forEach(r => {
              const sub = r.subject || 'General';
              if (!bySubject[sub]) bySubject[sub] = { attempts: 0, scores: [] };
              bySubject[sub].attempts++;
              bySubject[sub].scores.push(Math.round(parseFloat(r.percentage)));
            });
            const subjects = Object.entries(bySubject).sort((a, b) => {
              const aAvg = a[1].scores.reduce((s, v) => s + v, 0) / a[1].scores.length;
              const bAvg = b[1].scores.reduce((s, v) => s + v, 0) / b[1].scores.length;
              return bAvg - aAvg;
            });
            if (!subjects.length) return null;
            return (
              <div className="mt-6">
                <h4 className="text-sm font-bold text-white mb-3">Per-Subject Quiz Performance</h4>
                <div className="space-y-2">
                  {subjects.map(([name, data]) => {
                    const avg = Math.round(data.scores.reduce((s, v) => s + v, 0) / data.scores.length);
                    return (
                      <div key={name} className="flex items-center gap-3">
                        <span className="text-xs text-white/60 w-36 truncate shrink-0">{name}</span>
                        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${avg >= 80 ? 'bg-green-500' : avg >= 60 ? 'bg-primary' : 'bg-red-500'}`}
                            style={{ width: `${avg}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold w-10 text-right shrink-0 ${avg >= 80 ? 'text-green-400' : avg >= 60 ? 'text-primary' : 'text-red-400'}`}>{avg}%</span>
                        <span className="text-xs text-muted-foreground shrink-0">{data.attempts} {data.attempts === 1 ? 'quiz' : 'quizzes'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}
