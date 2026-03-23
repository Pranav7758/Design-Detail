import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wand2, CheckCircle2, Plus, Clock } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { api } from '@/lib/api';

type PlannedTask = {
  day: number;
  slot: number;
  subject: string;
  code: string;
  type: string;
  completed?: boolean;
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const FULL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Planner() {
  const { config, user } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [timetable, setTimetable] = useState<PlannedTask[]>([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [savingTask, setSavingTask] = useState<string | null>(null);

  const getWeekDates = useCallback(() => {
    const now = new Date();
    const day = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + weekOffset * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [weekOffset]);

  const weekDates = getWeekDates();
  const formatDate = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const weekLabel = `${formatDate(weekDates[0])} – ${formatDate(weekDates[6])}`;

  const timeSlots = (() => {
    if (!config) return ['18:00', '19:00', '20:00'];
    const [h] = (config.studySettings.startTime || '18:00').split(':').map(Number);
    return Array.from({ length: config.studySettings.targetHours || 3 }, (_, i) => {
      const hour = h + i;
      return `${String(hour).padStart(2, '0')}:00`;
    });
  })();

  const generatePlan = useCallback(() => {
    if (!config?.subjects?.length) return;
    setIsGenerating(true);
    setTimeout(() => {
      const subjects = config.subjects;
      const activeDays = config.studySettings.includeWeekends ? 7 : 5;
      const newPlan: PlannedTask[] = [];

      for (let day = 0; day < activeDays; day++) {
        for (let slot = 0; slot < timeSlots.length; slot++) {
          const subject = subjects[(day * timeSlots.length + slot) % subjects.length];
          if (subject) {
            newPlan.push({
              day,
              slot,
              subject: subject.name,
              code: subject.code,
              type: slot % 3 === 0 ? 'Theory' : slot % 3 === 1 ? 'Practice' : 'Revision',
              completed: false,
            });
          }
        }
      }
      setTimetable(newPlan);
      setIsGenerating(false);
    }, 1500);
  }, [config, timeSlots.length]);

  useEffect(() => {
    if (config && timetable.length === 0) {
      generatePlan();
    }
  }, [config]);

  const getSubjectColor = (code: string) => {
    const colors = [
      'border-blue-500/30 bg-blue-500/10 text-blue-200',
      'border-green-500/30 bg-green-500/10 text-green-200',
      'border-purple-500/30 bg-purple-500/10 text-purple-200',
      'border-pink-500/30 bg-pink-500/10 text-pink-200',
      'border-orange-500/30 bg-orange-500/10 text-orange-200',
      'border-primary/30 bg-primary/10 text-primary',
      'border-cyan-500/30 bg-cyan-500/10 text-cyan-200',
      'border-yellow-500/30 bg-yellow-500/10 text-yellow-200',
    ];
    let hash = 0;
    for (let i = 0; i < code.length; i++) hash = code.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  const handleMarkComplete = async (task: PlannedTask, dayIdx: number) => {
    if (!user?.id) return;
    const taskKey = `${dayIdx}-${task.slot}`;
    setSavingTask(taskKey);
    try {
      const sessionDate = weekDates[dayIdx].toISOString().slice(0, 10);
      await api.saveSession({
        userId: user.id,
        subjectName: task.subject,
        subjectCode: task.code,
        hours: 1,
        sessionDate,
        completed: true,
        topic: task.type,
      });
      setTimetable(prev =>
        prev.map(t =>
          t.day === task.day && t.slot === task.slot
            ? { ...t, completed: true }
            : t
        )
      );
    } catch (e) {
      console.error('Failed to save session', e);
    } finally {
      setSavingTask(null);
    }
  };

  const completedCount = timetable.filter(t => t.completed).length;
  const totalTasks = timetable.length;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Smart Planner</h1>
          <p className="text-muted-foreground">AI-optimized weekly schedule based on your goals.</p>
        </div>
        <button
          onClick={generatePlan}
          disabled={isGenerating || !config}
          className="px-5 py-2.5 bg-primary text-black rounded-xl font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-shadow flex items-center gap-2 disabled:opacity-50"
        >
          <Wand2 className="w-4 h-4" /> Regenerate Plan
        </button>
      </div>

      {totalTasks > 0 && (
        <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-sm text-white font-medium">{completedCount} of {totalTasks} sessions completed this week</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-sm text-muted-foreground">{totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0}%</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between glass-card p-4 rounded-2xl">
        <button onClick={() => setWeekOffset(o => o - 1)} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="font-bold text-white">{weekLabel}</span>
          {weekOffset === 0 && <span className="ml-2 text-xs text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">This Week</span>}
        </div>
        <button onClick={() => setWeekOffset(o => o + 1)} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {!config ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Study Plan Yet</h3>
          <p className="text-muted-foreground">Complete your profile setup to generate a personalized schedule.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden border border-white/5 relative min-h-[400px]">
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-primary font-medium animate-pulse">Generating smart schedule...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="overflow-x-auto hide-scrollbar">
            <div style={{ minWidth: `${8 * 110}px` }}>
              <div className="grid border-b border-white/10 bg-black/40" style={{ gridTemplateColumns: '90px repeat(7, 1fr)' }}>
                <div className="p-3 border-r border-white/10 text-center text-xs font-medium text-muted-foreground">Time</div>
                {DAYS.map((day, i) => {
                  const date = weekDates[i];
                  const isToday = weekOffset === 0 && new Date().toDateString() === date.toDateString();
                  const isWeekend = i >= 5;
                  const isOff = isWeekend && !config.studySettings.includeWeekends;
                  return (
                    <div key={day} className={`p-3 text-center border-r border-white/5 ${isOff ? 'opacity-30' : ''}`}>
                      <p className={`text-xs font-bold ${isToday ? 'text-primary' : 'text-white'}`}>{day}</p>
                      <p className="text-[10px] text-muted-foreground">{date.getDate()}</p>
                      {isToday && <div className="w-1.5 h-1.5 bg-primary rounded-full mx-auto mt-1"></div>}
                    </div>
                  );
                })}
              </div>

              {timeSlots.map((time, slotIdx) => (
                <div key={time} className="grid border-b border-white/5" style={{ gridTemplateColumns: '90px repeat(7, 1fr)' }}>
                  <div className="p-3 border-r border-white/10 text-center text-xs text-muted-foreground flex items-center justify-center">
                    {time}
                  </div>
                  {DAYS.map((day, dayIdx) => {
                    const isWeekend = dayIdx >= 5;
                    const isOff = isWeekend && !config.studySettings.includeWeekends;
                    const task = timetable.find(t => t.day === dayIdx && t.slot === slotIdx);
                    const taskKey = `${dayIdx}-${slotIdx}`;
                    const isSaving = savingTask === taskKey;

                    return (
                      <div
                        key={`${day}-${time}`}
                        className={`p-1.5 border-r border-white/5 min-h-[80px] ${isOff ? 'bg-black/30 opacity-30' : ''}`}
                        style={isOff ? { backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.02) 8px, rgba(255,255,255,0.02) 16px)' } : {}}
                      >
                        {task && !isOff && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (dayIdx * 0.03) + (slotIdx * 0.05) }}
                            className={`h-full p-2 rounded-lg border ${task.completed ? 'border-green-500/30 bg-green-500/10' : getSubjectColor(task.code)} flex flex-col justify-between cursor-pointer group relative`}
                          >
                            {task.completed ? (
                              <>
                                <div className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                                  <span className="text-[9px] text-green-400 uppercase tracking-wider">Done</span>
                                </div>
                                <span className="font-bold text-[10px] leading-tight text-green-300 line-clamp-2">{task.subject}</span>
                              </>
                            ) : (
                              <>
                                <div>
                                  <span className="text-[9px] uppercase tracking-wider opacity-70 block">{task.type}</span>
                                  <span className="font-bold text-[10px] leading-tight line-clamp-2">{task.subject}</span>
                                </div>
                                <button
                                  onClick={() => handleMarkComplete(task, dayIdx)}
                                  disabled={isSaving}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 text-[9px] flex items-center gap-1 hover:text-green-300"
                                >
                                  {isSaving ? (
                                    <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <><Plus className="w-2.5 h-2.5" /> Log</>
                                  )}
                                </button>
                              </>
                            )}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {config && (
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-3">Your Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {config.subjects.map((s, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-full text-xs border font-medium ${getSubjectColor(s.code)}`}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
