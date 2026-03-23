import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, TrendingUp, Target, ChevronRight, BookOpen, Flame, BrainCircuit } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { api } from '@/lib/api';
import { Link } from 'wouter';

export default function Dashboard() {
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
    : null;

  const totalHours = sessions.reduce((sum, s) => sum + parseFloat(s.hours || '0'), 0);

  const today = new Date().toISOString().slice(0, 10);
  const todayHours = sessions
    .filter(s => s.sessionDate === today)
    .reduce((sum, s) => sum + parseFloat(s.hours || '0'), 0);

  const thisWeekStart = new Date();
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay() + 1);
  const thisWeekEnd = new Date(thisWeekStart);
  thisWeekEnd.setDate(thisWeekStart.getDate() + 6);

  const weekSessions = sessions.filter(s => {
    const d = new Date(s.sessionDate);
    return d >= thisWeekStart && d <= thisWeekEnd;
  });
  const weekHours = weekSessions.reduce((sum, s) => sum + parseFloat(s.hours || '0'), 0);
  const targetWeekHours = (config?.studySettings.targetHours || 3) * (config?.studySettings.includeWeekends ? 7 : 5);
  const weekCompletion = targetWeekHours > 0 ? Math.min(100, Math.round((weekHours / targetWeekHours) * 100)) : 0;

  const predictedScore = avgQuizScore !== null
    ? Math.min(100, Math.round(avgQuizScore * 0.6 + weekCompletion * 0.3 + Math.min(100, totalHours / 2) * 0.1))
    : null;

  const subjects = config?.subjects?.slice(0, 3) || [];
  const startTime = config?.studySettings?.startTime || '18:00';
  const endTime = config?.studySettings?.endTime || '22:00';
  const targetHours = config?.studySettings?.targetHours || 3;

  const generateSchedule = () => {
    if (!subjects.length) return [];
    const slots = [];
    const [sh, sm] = startTime.split(':').map(Number);
    for (let i = 0; i < Math.min(subjects.length, 3); i++) {
      const startH = sh + i;
      const endH = startH + 1;
      slots.push({
        time: `${String(startH).padStart(2, '0')}:${String(sm).padStart(2, '0')} - ${String(endH).padStart(2, '0')}:${String(sm).padStart(2, '0')}`,
        subject: subjects[i]?.name || '',
        topic: getTopicForSubject(subjects[i]?.name || ''),
        status: i === 0 ? 'completed' : i === 1 ? 'current' : 'pending',
      });
    }
    return slots;
  };

  const getTopicForSubject = (name: string) => {
    const topics: Record<string, string> = {
      'Operating System': 'Process Management & Scheduling',
      'Java Programming': 'Collections Framework',
      'Software Engineering': 'SDLC Models & Agile',
      'Database Management System': 'SQL Joins & Normalization',
      'Computer Networks': 'TCP/IP Protocols',
      'Data Structure Using C': 'Tree Traversals',
      'Engineering Mathematics I': 'Differential Calculus',
      'Machine Learning': 'Linear Regression & Gradient Descent',
    };
    return topics[name] || 'Core Concepts Review';
  };

  const todaySchedule = generateSchedule();

  const stats = [
    {
      label: "Today's Study",
      value: todayHours > 0 ? `${todayHours.toFixed(1)}h` : '0h',
      target: `${targetHours}h`,
      icon: Clock,
      color: 'text-blue-400',
    },
    {
      label: 'Weekly Completion',
      value: `${weekCompletion}%`,
      target: '100%',
      icon: CheckCircle2,
      color: 'text-green-400',
    },
    {
      label: 'Total Study Hours',
      value: totalHours > 0 ? `${totalHours.toFixed(0)}h` : '0h',
      target: `${targetHours * 30}h`,
      icon: Target,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Welcome back, <span className="text-primary">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-muted-foreground">
            {config ? `${config.course === 'diploma' ? 'Diploma' : 'B.Tech'} • ${config.branch} • ${config.semester.replace('sem', 'Semester ')}` : 'Set up your profile to get started'}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="glass-card px-4 py-2 rounded-full border-primary/30 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-white">
              {quizResults.length > 0 ? `${quizResults.length} quiz${quizResults.length > 1 ? 'zes' : ''} completed` : 'Ready to study'}
            </span>
          </div>
        </motion.div>
      </div>

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
            <h3 className="text-3xl font-display font-bold text-white mb-1">
              {predictedScore !== null ? `${predictedScore}%` : avgQuizScore !== null ? `${avgQuizScore}%` : '—'}
            </h3>
            <p className="text-sm text-primary mb-2">
              {predictedScore !== null ? 'Predicted Exam Score' : 'Avg Quiz Score'}
            </p>
            <div className="text-[10px] text-white/50 leading-tight">
              {predictedScore !== null ? 'Quiz(60%) + Consistency(30%) + Hours(10%)' : 'Complete quizzes to see prediction'}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-white">Today's Schedule</h2>
            <Link href="/planner">
              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                View Full Plan <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {!config ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Complete your setup to see a personalized schedule.</p>
              <Link href="/setup">
                <button className="mt-4 px-6 py-2 rounded-xl bg-primary text-black font-bold">Go to Setup</button>
              </Link>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-2">
              {todaySchedule.map((slot, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 transition-colors ${slot.status === 'current' ? 'bg-primary/10 border border-primary/30' : 'hover:bg-white/5 border border-transparent'}`}
                >
                  <div className="text-sm font-medium text-muted-foreground min-w-[130px]">{slot.time}</div>
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
          )}

          {quizResults.length > 0 && (
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-primary" /> Recent Quiz Results</h3>
              <div className="space-y-3">
                {quizResults.slice(0, 3).map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-white font-medium">{r.subject || 'General'}</span>
                      <span className="text-xs text-muted-foreground ml-2">{r.score}/{r.total} correct</span>
                    </div>
                    <span className={`text-sm font-bold ${parseFloat(r.percentage) >= 80 ? 'text-green-400' : parseFloat(r.percentage) >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {parseFloat(r.percentage).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white">Daily Action</h2>
          <div className="glass-card rounded-2xl p-6 text-center border-t-2 border-t-primary relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {quizResults.length === 0 ? 'Start First Quiz' : 'Daily Quiz'}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {quizResults.length === 0
                ? 'Test your knowledge to unlock your predicted exam score.'
                : 'Keep your streak going — retake the quiz to improve.'}
            </p>
            <Link href="/quiz">
              <button className="w-full py-3 rounded-xl bg-primary text-black font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                {quizResults.length === 0 ? 'Take First Quiz' : 'Take Quiz'}
              </button>
            </Link>
          </div>

          {sessions.length > 0 && (
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Flame className="w-4 h-4 text-orange-400" /> Study Activity</h3>
              <div className="space-y-2">
                {sessions.slice(0, 4).map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground truncate max-w-[140px]">{s.subjectName}</span>
                    <span className="text-white font-medium">{parseFloat(s.hours).toFixed(1)}h</span>
                  </div>
                ))}
              </div>
              <Link href="/progress">
                <button className="mt-4 text-xs text-primary hover:underline w-full text-center flex items-center justify-center gap-1">
                  View All Progress <ChevronRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
