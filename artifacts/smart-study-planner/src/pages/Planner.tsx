import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wand2, Download, Settings2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function Planner() {
  const { config } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [timetable, setTimetable] = useState<any[]>([]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = ["18:00", "19:00", "20:00", "21:00", "22:00"];

  // Mock generation logic
  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (!config?.subjects) return;
      
      const newPlan = [];
      const subjects = config.subjects;
      
      for (let day = 0; day < (config.studySettings.includeWeekends ? 7 : 5); day++) {
        for (let slot = 0; slot < config.studySettings.targetHours; slot++) {
          const subject = subjects[(day + slot) % subjects.length];
          if (subject) {
            newPlan.push({
              day,
              slot,
              subject: subject.name,
              code: subject.code,
              type: slot % 2 === 0 ? 'Theory' : 'Practice'
            });
          }
        }
      }
      setTimetable(newPlan);
      setIsGenerating(false);
    }, 2000);
  };

  useEffect(() => {
    if (config && timetable.length === 0) {
      generatePlan();
    }
  }, [config]);

  // Color generator for subjects
  const getSubjectColor = (code: string) => {
    const colors = [
      "border-blue-500/30 bg-blue-500/10 text-blue-200",
      "border-green-500/30 bg-green-500/10 text-green-200",
      "border-purple-500/30 bg-purple-500/10 text-purple-200",
      "border-pink-500/30 bg-pink-500/10 text-pink-200",
      "border-orange-500/30 bg-orange-500/10 text-orange-200",
      "border-primary/30 bg-primary/10 text-primary",
    ];
    let hash = 0;
    for (let i = 0; i < code.length; i++) hash = code.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Smart Planner</h1>
          <p className="text-muted-foreground">AI-optimized weekly schedule based on your goals.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={generatePlan}
            className="px-4 py-2 bg-secondary border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Settings2 className="w-4 h-4" /> Customize
          </button>
          <button 
            onClick={generatePlan}
            className="px-4 py-2 bg-primary text-black rounded-lg font-medium hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-shadow flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" /> Regenerate
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between glass-card p-4 rounded-2xl">
        <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white"><ChevronLeft /></button>
        <span className="font-bold text-white">This Week (Oct 24 - Oct 30)</span>
        <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white"><ChevronRight /></button>
      </div>

      {/* Grid */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/5 relative min-h-[400px]">
        <AnimatePresence>
          {isGenerating && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-primary font-medium animate-pulse">Re-optimizing schedule...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-x-auto hide-scrollbar">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-8 border-b border-white/10 bg-black/40">
              <div className="p-4 border-r border-white/10 text-center text-sm font-medium text-muted-foreground">Time</div>
              {days.map((day, i) => (
                <div key={day} className={`p-4 text-center text-sm font-medium ${i > 4 && !config?.studySettings.includeWeekends ? 'text-white/20' : 'text-white'}`}>
                  {day}
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.slice(0, config?.studySettings.targetHours || 3).map((time, slotIdx) => (
              <div key={time} className="grid grid-cols-8 border-b border-white/5">
                <div className="p-4 border-r border-white/10 text-center text-xs text-muted-foreground flex items-center justify-center">
                  {time}
                </div>
                
                {days.map((day, dayIdx) => {
                  const isWeekend = dayIdx > 4;
                  const isOffDay = isWeekend && !config?.studySettings.includeWeekends;
                  
                  const task = timetable.find(t => t.day === dayIdx && t.slot === slotIdx);

                  return (
                    <div key={`${day}-${time}`} className={`p-2 border-r border-white/5 ${isOffDay ? 'bg-black/40 diagonal-stripes' : ''}`}>
                      {task && !isOffDay && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (dayIdx * 0.05) + (slotIdx * 0.1) }}
                          className={`h-full p-2 rounded-lg border ${getSubjectColor(task.code)} flex flex-col justify-center cursor-pointer hover:brightness-110 transition-all`}
                        >
                          <span className="text-[10px] uppercase tracking-wider opacity-80 mb-1">{task.type}</span>
                          <span className="font-bold text-xs leading-tight line-clamp-2">{task.subject}</span>
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
      
      <style dangerouslySetInnerHTML={{__html: `
        .diagonal-stripes {
          background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px);
        }
      `}} />
    </div>
  );
}
