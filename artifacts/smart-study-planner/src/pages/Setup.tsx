import React, { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, Clock, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { MSBTE_DATA } from '@/lib/data';
import { useAppContext, Subject } from '@/context/AppContext';

type SetupData = {
  courseType: 'diploma' | 'btech' | '';
  branch: string;
  year: string;
  semester: string;
  selectedSubjects: Subject[];
  config: {
    startTime: string;
    endTime: string;
    targetHours: number;
    targetDate: string;
    includeWeekends: boolean;
  }
};

export default function Setup() {
  const [, setLocation] = useLocation();
  const { completeSetup, user } = useAppContext();
  
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SetupData>({
    courseType: '',
    branch: '',
    year: '',
    semester: '',
    selectedSubjects: [],
    config: {
      startTime: '18:00',
      endTime: '22:00',
      targetHours: 3,
      targetDate: '',
      includeWeekends: false
    }
  });

  const totalSteps = 6;

  // Derived options based on selections
  const branchOptions = useMemo(() => {
    if (!data.courseType) return [];
    return Object.keys(MSBTE_DATA[data.courseType]);
  }, [data.courseType]);

  const yearOptions = ["First Year", "Second Year", "Third Year", ...(data.courseType === 'btech' ? ["Fourth Year"] : [])];
  
  const semesterOptions = useMemo(() => {
    if (!data.year) return [];
    switch (data.year) {
      case "First Year": return ["sem1", "sem2"];
      case "Second Year": return ["sem3", "sem4"];
      case "Third Year": return ["sem5", "sem6"];
      case "Fourth Year": return ["sem7", "sem8"];
      default: return [];
    }
  }, [data.year]);

  const availableSubjects = useMemo(() => {
    if (!data.courseType || !data.branch || !data.semester) return [];
    const courseData = MSBTE_DATA[data.courseType as keyof typeof MSBTE_DATA];
    if (!courseData) return [];
    const branchData = courseData[data.branch as keyof typeof courseData] as Record<string, Subject[]>;
    if (!branchData) return [];
    return branchData[data.semester] || [];
  }, [data.courseType, data.branch, data.semester]);

  // Handlers
  const handleNext = () => {
    if (step === 4 && data.selectedSubjects.length === 0) {
      // Auto-select all subjects when arriving at step 5
      setData(prev => ({ ...prev, selectedSubjects: [...availableSubjects] }));
    }
    if (step < totalSteps) setStep(s => s + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const handleFinish = () => {
    completeSetup({
      course: data.courseType,
      branch: data.branch,
      year: data.year,
      semester: data.semester,
      subjects: data.selectedSubjects,
      studySettings: data.config
    });
    // Simulate generation loading
    setStep(7); // Loading step
    setTimeout(() => {
      setLocation('/dashboard');
    }, 2500);
  };

  const toggleSubject = (subject: Subject) => {
    setData(prev => {
      const exists = prev.selectedSubjects.find(s => s.code === subject.code);
      if (exists) {
        return { ...prev, selectedSubjects: prev.selectedSubjects.filter(s => s.code !== subject.code) };
      } else {
        return { ...prev, selectedSubjects: [...prev.selectedSubjects, subject] };
      }
    });
  };

  // Validators for Next button
  const canProceed = () => {
    switch(step) {
      case 1: return data.courseType !== '';
      case 2: return data.branch !== '';
      case 3: return data.year !== '';
      case 4: return data.semester !== '';
      case 5: return data.selectedSubjects.length > 0;
      case 6: return data.config.targetDate !== '';
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Select Course Type</h2>
            <p className="text-muted-foreground mb-8">What are you currently pursuing?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setData({ ...data, courseType: 'diploma', branch: '', year: '', semester: '' })}
                className={`p-6 rounded-2xl border text-left transition-all ${data.courseType === 'diploma' ? 'border-primary bg-primary/10 gold-glow' : 'border-white/10 glass-card hover:border-white/30'}`}
              >
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${data.courseType === 'diploma' ? 'bg-primary text-black' : 'bg-secondary text-white'}`}>
                  <GraduationCap />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Diploma (Polytechnic)</h3>
                <p className="text-sm text-muted-foreground">3-year MSBTE K-Scheme curriculum</p>
              </button>
              <button
                onClick={() => setData({ ...data, courseType: 'btech', branch: '', year: '', semester: '' })}
                className={`p-6 rounded-2xl border text-left transition-all ${data.courseType === 'btech' ? 'border-primary bg-primary/10 gold-glow' : 'border-white/10 glass-card hover:border-white/30'}`}
              >
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${data.courseType === 'btech' ? 'bg-primary text-black' : 'bg-secondary text-white'}`}>
                  <BookOpen />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Degree (B.E / B.Tech)</h3>
                <p className="text-sm text-muted-foreground">4-year Engineering curriculum</p>
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Select Branch</h2>
            <p className="text-muted-foreground mb-8">Choose your engineering discipline.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {branchOptions.map(branch => (
                <button
                  key={branch}
                  onClick={() => setData({ ...data, branch, year: '', semester: '' })}
                  className={`p-4 rounded-xl border text-left transition-all ${data.branch === branch ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-card text-muted-foreground hover:bg-white/5 hover:text-white'}`}
                >
                  {branch}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
      case 4:
        const isYear = step === 3;
        const options = isYear ? yearOptions : semesterOptions;
        const title = isYear ? "Which Year?" : "Which Semester?";
        const field = isYear ? 'year' : 'semester';
        
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white mb-2">{title}</h2>
            <p className="text-muted-foreground mb-8">Select your current academic standing.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map(opt => {
                const label = isYear ? opt : `Semester ${opt.replace('sem', '')}`;
                const isSelected = data[field as keyof SetupData] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setData({ ...data, [field]: opt })}
                    className={`p-5 rounded-xl border text-center font-medium transition-all ${isSelected ? 'border-primary bg-primary/10 text-primary gold-glow' : 'border-white/10 glass-card text-muted-foreground hover:bg-white/5 hover:text-white'}`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Confirm Subjects</h2>
            <p className="text-muted-foreground mb-6">Uncheck any subjects you don't want to include in your study plan.</p>
            
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {availableSubjects.map((subject, i) => {
                const isSelected = data.selectedSubjects.some(s => s.code === subject.code);
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={subject.code}
                    onClick={() => toggleSubject(subject)}
                    className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${isSelected ? 'border-primary/50 bg-primary/5' : 'border-white/10 glass-card opacity-60'}`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${isSelected ? 'bg-primary border-primary text-black' : 'border-muted-foreground'}`}>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-bold ${isSelected ? 'text-white' : 'text-muted-foreground'}`}>{subject.name}</h4>
                        <span className="text-xs text-muted-foreground">{subject.code}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className={`px-2 py-0.5 rounded-full bg-black/50 border ${
                          subject.difficulty === 'Easy' ? 'border-green-500/30 text-green-400' :
                          subject.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-400' :
                          'border-red-500/30 text-red-400'
                        }`}>
                          {subject.difficulty}
                        </span>
                        <span>{subject.hours} hrs total</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Study Preferences</h2>
            <p className="text-muted-foreground mb-8">Let AI know how you prefer to study.</p>
            
            <div className="space-y-5">
              <div className="glass-card p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Daily Target Hours</label>
                  <span className="text-primary font-bold">{data.config.targetHours}h</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="12" 
                  value={data.config.targetHours}
                  onChange={(e) => setData({ ...data, config: { ...data.config, targetHours: parseInt(e.target.value) } })}
                  className="w-full accent-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-xl">
                  <label className="text-xs text-muted-foreground mb-2 block">Preferred Start Time</label>
                  <input 
                    type="time" 
                    value={data.config.startTime}
                    onChange={(e) => setData({ ...data, config: { ...data.config, startTime: e.target.value } })}
                    className="w-full bg-transparent text-white border border-white/10 rounded-lg p-2 focus:border-primary outline-none"
                  />
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <label className="text-xs text-muted-foreground mb-2 block">Preferred End Time</label>
                  <input 
                    type="time" 
                    value={data.config.endTime}
                    onChange={(e) => setData({ ...data, config: { ...data.config, endTime: e.target.value } })}
                    className="w-full bg-transparent text-white border border-white/10 rounded-lg p-2 focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="glass-card p-4 rounded-xl">
                <label className="text-xs text-muted-foreground mb-2 block">Target Exam Date</label>
                <input 
                  type="date" 
                  value={data.config.targetDate}
                  onChange={(e) => setData({ ...data, config: { ...data.config, targetDate: e.target.value } })}
                  className="w-full bg-transparent text-white border border-white/10 rounded-lg p-2 focus:border-primary outline-none"
                />
              </div>

              <label className="glass-card p-4 rounded-xl flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-white">Include Weekends</p>
                  <p className="text-xs text-muted-foreground">Study on Saturday & Sunday</p>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${data.config.includeWeekends ? 'bg-primary' : 'bg-secondary'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${data.config.includeWeekends ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={data.config.includeWeekends}
                  onChange={(e) => setData({ ...data, config: { ...data.config, includeWeekends: e.target.checked } })}
                />
              </label>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 relative mb-8">
              <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-display mb-2">Generating Smart Plan</h2>
            <p className="text-muted-foreground">Analyzing syllabus, difficulty, and your schedule...</p>
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 pb-20 px-4">
      {step < 7 && (
        <div className="w-full max-w-2xl mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm font-bold text-primary">{Math.round((step/totalSteps)*100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(step/totalSteps)*100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {step < 7 && (
          <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={step === totalSteps ? handleFinish : handleNext}
              disabled={!canProceed()}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-yellow-600 text-black font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 disabled:grayscale disabled:hover:shadow-none"
            >
              {step === totalSteps ? 'Generate Plan' : 'Continue'} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
