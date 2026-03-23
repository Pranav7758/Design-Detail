import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuestionsForSubject, getQuestionCount, QuizQuestion } from '@/lib/quiz-questions';
import { Trophy, ArrowRight, RotateCcw, CheckCircle2, XCircle, BookOpen, ChevronRight, Plus, Zap, Clock } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { api } from '@/lib/api';

type Phase = 'select' | 'quiz' | 'result';

export default function Quiz() {
  const { user, config } = useAppContext();

  const [phase, setPhase] = useState<Phase>('select');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [completedSubjects, setCompletedSubjects] = useState<Array<{ name: string; score: number; total: number; percentage: number }>>([]);
  const [finalScore, setFinalScore] = useState(0);

  const subjects = config?.subjects || [];
  const total = questions.length;
  const question = questions[currentQ];

  const startQuiz = (subjectName: string) => {
    const qs = getQuestionsForSubject(subjectName);
    setSelectedSubject(subjectName);
    setQuestions(qs);
    setCurrentQ(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setFinalScore(0);
    setSaved(false);
    setPhase('quiz');
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    const addPoint = selectedOption === question.correctAnswer ? (isSubmitted ? 0 : 1) : 0;
    if (currentQ < total - 1) {
      setCurrentQ(q => q + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      const fs = isSubmitted ? score : score + addPoint;
      setFinalScore(fs);
      setPhase('result');
    }
  };

  const percentage = total > 0 ? Math.round((finalScore / total) * 100) : 0;

  useEffect(() => {
    if (phase === 'result' && user?.id && !saved && !isSaving && total > 0) {
      setIsSaving(true);
      api.saveQuizResult({
        userId: user.id,
        score: finalScore,
        total,
        percentage,
        subject: selectedSubject,
      }).then(() => {
        setSaved(true);
        setCompletedSubjects(prev => [...prev, { name: selectedSubject, score: finalScore, total, percentage }]);
      }).catch(e => {
        console.error('Failed to save quiz result', e);
      }).finally(() => {
        setIsSaving(false);
      });
    }
  }, [phase]);

  const getGrade = (pct: number) => {
    if (pct >= 90) return { label: 'Excellent!', color: 'text-green-400', bg: 'from-green-500/20 to-emerald-500/10' };
    if (pct >= 75) return { label: 'Great Job!', color: 'text-primary', bg: 'from-primary/20 to-yellow-600/10' };
    if (pct >= 60) return { label: 'Good Effort!', color: 'text-yellow-400', bg: 'from-yellow-500/20 to-amber-500/10' };
    return { label: 'Keep Practicing!', color: 'text-red-400', bg: 'from-red-500/20 to-rose-500/10' };
  };

  const grade = getGrade(percentage);

  const availableSubjectsForQuiz = subjects.filter(s =>
    !completedSubjects.find(c => c.name === s.name)
  );

  if (phase === 'select') {
    return (
      <div className="max-w-3xl mx-auto space-y-8 pt-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Daily Knowledge Check</h1>
          <p className="text-muted-foreground">Select each subject you studied today and test your understanding.</p>
        </div>

        {completedSubjects.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Today's Completed Quizzes
            </h3>
            <div className="space-y-3">
              {completedSubjects.map((cs, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      cs.percentage >= 80 ? 'bg-green-500/20 text-green-400' :
                      cs.percentage >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {cs.percentage >= 80 ? '✓' : cs.percentage >= 60 ? '~' : '!'}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white">{cs.name}</span>
                      <p className="text-xs text-muted-foreground">{cs.score}/{cs.total} correct</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${cs.percentage >= 80 ? 'text-green-400' : cs.percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {cs.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {availableSubjectsForQuiz.length === 0 && completedSubjects.length > 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-3xl p-10 text-center">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">All Done for Today!</h2>
            <p className="text-muted-foreground mb-6">You've completed quizzes for all your subjects. Great work!</p>
            <div className="grid grid-cols-2 gap-4 text-left max-w-xs mx-auto">
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl text-center">
                <span className="text-2xl font-black text-primary">{completedSubjects.length}</span>
                <p className="text-xs text-muted-foreground mt-1">Subjects Covered</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center">
                <span className="text-2xl font-black text-green-400">
                  {Math.round(completedSubjects.reduce((sum, s) => sum + s.percentage, 0) / completedSubjects.length)}%
                </span>
                <p className="text-xs text-muted-foreground mt-1">Avg Score</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">
              {completedSubjects.length === 0 ? 'Select a subject you studied today:' : 'Remaining Subjects:'}
            </h2>
            {subjects.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Complete your setup to get subject-specific quizzes.</p>
              </div>
            ) : (
              availableSubjectsForQuiz.map((subject, i) => {
                const qCount = getQuestionCount(subject.name);
                return (
                  <motion.button
                    key={subject.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => startQuiz(subject.name)}
                    className="w-full glass-card rounded-2xl p-5 text-left flex items-center justify-between gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 group-hover:bg-primary/20 transition-colors">
                        {subject.code.slice(-3)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-primary transition-colors">{subject.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${
                            subject.difficulty === 'Easy' ? 'border-green-500/30 text-green-400' :
                            subject.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-400' :
                            'border-red-500/30 text-red-400'
                          }`}>{subject.difficulty}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Zap className="w-3 h-3" /> {qCount} questions
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </motion.button>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="max-w-2xl mx-auto pt-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`glass-card rounded-3xl p-8 md:p-10 text-center border-t-4 border-t-primary relative overflow-hidden bg-gradient-to-b ${grade.bg}`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

          <Trophy className="w-16 h-16 text-primary mx-auto mb-4 relative z-10" />
          <h2 className="text-3xl font-display font-bold text-white mb-1 relative z-10">{selectedSubject}</h2>
          <p className={`text-lg font-bold mb-6 ${grade.color} relative z-10`}>{grade.label}</p>

          <div className="flex justify-center items-end gap-2 mb-4 relative z-10">
            <span className="text-6xl font-black text-white">{percentage}%</span>
            <span className="text-lg text-muted-foreground mb-1">Score</span>
          </div>

          <p className="text-muted-foreground mb-6 relative z-10">{finalScore} out of {total} correct</p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-left relative z-10">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl">
              <span className="text-green-400 font-black block text-3xl">{finalScore}</span>
              <span className="text-sm text-green-400/80">Correct</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
              <span className="text-red-400 font-black block text-3xl">{total - finalScore}</span>
              <span className="text-sm text-red-400/80">Incorrect</span>
            </div>
          </div>

          <div className="mb-6 relative z-10">
            {isSaving ? (
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm py-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Saving to progress...
              </div>
            ) : saved ? (
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm py-2">
                <CheckCircle2 className="w-4 h-4" /> Saved to your progress
              </div>
            ) : null}
          </div>

          <div className="space-y-3 relative z-10">
            {availableSubjectsForQuiz.length > 0 ? (
              <button
                onClick={() => setPhase('select')}
                className="w-full py-3 rounded-xl bg-primary text-black font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
              >
                <Plus className="w-5 h-5" /> Quiz Another Subject
              </button>
            ) : (
              <div className="py-2 text-center text-sm text-green-400">
                All subjects completed for today! 🎉
              </div>
            )}

            <button
              onClick={() => startQuiz(selectedSubject)}
              className="w-full py-3 rounded-xl border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Retake This Quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">{selectedSubject}</h1>
          <p className="text-muted-foreground text-sm">Answer carefully — results are saved automatically</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-primary">Q {currentQ + 1}/{total}</span>
          <p className="text-xs text-muted-foreground">Score: {score}/{currentQ}</p>
        </div>
      </div>

      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQ + (isSubmitted ? 1 : 0)) / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card rounded-3xl p-6 md:p-10"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">Q{currentQ + 1}</span>
            <span className="text-xs text-muted-foreground">Multiple Choice</span>
          </div>

          <h2 className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8">
            {question?.question}
          </h2>

          <div className="space-y-4">
            {question?.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = isSubmitted && idx === question.correctAnswer;
              const isWrong = isSubmitted && isSelected && idx !== question.correctAnswer;

              let classes = 'w-full p-5 rounded-2xl border text-left transition-all font-medium flex items-center justify-between gap-4 ';
              if (!isSubmitted) {
                classes += isSelected
                  ? 'border-primary bg-primary/10 text-white'
                  : 'border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white hover:border-white/30';
              } else {
                if (isCorrect) classes += 'border-green-500 bg-green-500/15 text-white';
                else if (isWrong) classes += 'border-red-500 bg-red-500/15 text-white';
                else classes += 'border-white/5 opacity-40 text-muted-foreground';
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={classes}
                >
                  <span className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-sm border font-bold ${
                      isSelected && !isSubmitted ? 'bg-primary border-primary text-black' :
                      isCorrect ? 'bg-green-500 border-green-500 text-white' :
                      isWrong ? 'bg-red-500 border-red-500 text-white' :
                      'border-white/20 text-muted-foreground'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />}
                  {isSubmitted && isWrong && <XCircle className="w-6 h-6 text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-5 rounded-xl bg-primary/10 border border-primary/20 overflow-hidden"
              >
                <span className="font-bold text-primary block mb-2">Explanation</span>
                <span className="text-white/80 text-sm leading-relaxed">{question?.explanation}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-8 py-3 rounded-xl bg-white text-black font-bold disabled:opacity-40 transition-all hover:bg-gray-100"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-primary text-black font-bold flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
              >
                {currentQ === total - 1 ? 'See Results' : 'Next Question'}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
