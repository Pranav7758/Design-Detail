import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_QUIZ_QUESTIONS } from '@/lib/data';
import { Trophy, ArrowRight, RotateCcw, CheckCircle2, XCircle, Save } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { api } from '@/lib/api';

export default function Quiz() {
  const { user, config } = useAppContext();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const question = DEMO_QUIZ_QUESTIONS[currentQ];
  const total = DEMO_QUIZ_QUESTIONS.length;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(q => q + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const finalScore = isFinished
    ? (selectedOption === question.correctAnswer ? score : score)
    : score;

  const saveResult = async (finalScore: number) => {
    if (!user?.id || saved) return;
    setIsSaving(true);
    try {
      const percentage = Math.round((finalScore / total) * 100);
      await api.saveQuizResult({
        userId: user.id,
        score: finalScore,
        total,
        percentage,
        subject: config?.subjects?.[0]?.name || 'Computer Science Fundamentals',
      });
      setSaved(true);
    } catch (e) {
      console.error('Failed to save quiz result', e);
    } finally {
      setIsSaving(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setSaved(false);
  };

  if (isFinished) {
    const lastCorrect = selectedOption === question.correctAnswer;
    const finalTotal = lastCorrect ? score + (isSubmitted ? 0 : 1) : score;
    const usedScore = isSubmitted ? score : (selectedOption === question.correctAnswer ? score + 1 : score);
    const percentage = Math.round((usedScore / total) * 100);

    const getGrade = () => {
      if (percentage >= 90) return { label: 'Excellent!', color: 'text-green-400' };
      if (percentage >= 75) return { label: 'Great Job!', color: 'text-primary' };
      if (percentage >= 60) return { label: 'Good Effort!', color: 'text-yellow-400' };
      return { label: 'Keep Practicing!', color: 'text-red-400' };
    };
    const grade = getGrade();

    return (
      <div className="max-w-2xl mx-auto pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-10 text-center border-t-4 border-t-primary relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

          <Trophy className="w-20 h-20 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-display font-bold text-white mb-1">Quiz Complete!</h2>
          <p className={`text-xl font-bold mb-8 ${grade.color}`}>{grade.label}</p>

          <div className="flex justify-center items-end gap-2 mb-4">
            <span className="text-6xl font-black text-white">{percentage}%</span>
            <span className="text-xl text-muted-foreground mb-2">Score</span>
          </div>

          <p className="text-muted-foreground mb-8">{usedScore} out of {total} questions correct</p>

          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl">
              <span className="text-green-400 font-black block text-3xl">{usedScore}</span>
              <span className="text-sm text-green-400/80">Correct</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
              <span className="text-red-400 font-black block text-3xl">{total - usedScore}</span>
              <span className="text-sm text-red-400/80">Incorrect</span>
            </div>
          </div>

          <div className="space-y-3">
            {!saved && user?.id && (
              <button
                onClick={() => saveResult(usedScore)}
                disabled={isSaving || saved}
                className="w-full py-3 rounded-xl bg-primary text-black font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-60"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><Save className="w-5 h-5" /> Save Result</>
                )}
              </button>
            )}
            {saved && (
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm py-2">
                <CheckCircle2 className="w-5 h-5" /> Result saved to your progress
              </div>
            )}
            <button
              onClick={resetQuiz}
              className="w-full py-3 rounded-xl border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
            >
              <RotateCcw className="w-5 h-5" /> Retake Quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Daily Knowledge Check</h1>
          <p className="text-muted-foreground text-sm">
            {config?.subjects?.[0]?.name || 'Computer Science Fundamentals'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-primary">Question {currentQ + 1} of {total}</span>
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
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
              Q{currentQ + 1}
            </span>
            <span className="text-xs text-muted-foreground">Multiple Choice</span>
          </div>

          <h2 className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = isSubmitted && idx === question.correctAnswer;
              const isWrong = isSubmitted && isSelected && idx !== question.correctAnswer;

              let classes = 'w-full p-5 rounded-2xl border text-left transition-all font-medium flex items-center justify-between gap-4 ';

              if (!isSubmitted) {
                classes += isSelected
                  ? 'border-primary bg-primary/10 text-white gold-glow'
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
                <span className="text-white/80 text-sm leading-relaxed">{question.explanation}</span>
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
