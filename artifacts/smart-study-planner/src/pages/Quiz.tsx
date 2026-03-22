import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_QUIZ_QUESTIONS } from '@/lib/data';
import { Trophy, ArrowRight, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = DEMO_QUIZ_QUESTIONS[currentQ];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    setIsSubmitted(true);
    if (selectedOption === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < DEMO_QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / DEMO_QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="max-w-2xl mx-auto pt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-10 text-center border-t-4 border-t-primary relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
          
          <Trophy className="w-20 h-20 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-muted-foreground mb-8">Great job testing your knowledge.</p>
          
          <div className="flex justify-center items-end gap-2 mb-10">
            <span className="text-6xl font-black text-white">{percentage}%</span>
            <span className="text-xl text-muted-foreground mb-2">Score</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10 text-left">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl">
              <span className="text-green-400 font-bold block text-2xl">{score}</span>
              <span className="text-sm text-green-400/80">Correct Answers</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
              <span className="text-red-400 font-bold block text-2xl">{DEMO_QUIZ_QUESTIONS.length - score}</span>
              <span className="text-sm text-red-400/80">Incorrect Answers</span>
            </div>
          </div>

          <button onClick={resetQuiz} className="px-8 py-3 rounded-xl bg-primary text-black font-bold flex items-center gap-2 mx-auto hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
            <RotateCcw className="w-5 h-5" /> Retake Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-4">
      {/* Header / Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Daily Knowledge Check</h1>
          <p className="text-muted-foreground text-sm">Computer Science Fundamentals</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-primary">Question {currentQ + 1} of {DEMO_QUIZ_QUESTIONS.length}</span>
        </div>
      </div>
      
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQ + 1) / DEMO_QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card rounded-3xl p-6 md:p-10"
        >
          <h2 className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = isSubmitted && idx === question.correctAnswer;
              const isWrong = isSubmitted && isSelected && !isCorrect;
              
              let classes = "w-full p-5 rounded-2xl border text-left transition-all font-medium flex items-center justify-between ";
              
              if (!isSubmitted) {
                classes += isSelected 
                  ? "border-primary bg-primary/10 text-white gold-glow shadow-inner" 
                  : "border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white";
              } else {
                if (isCorrect) classes += "border-green-500 bg-green-500/20 text-white";
                else if (isWrong) classes += "border-red-500 bg-red-500/20 text-white";
                else classes += "border-white/5 opacity-50";
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={classes}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs border ${isSelected && !isSubmitted ? 'bg-primary border-primary text-black' : 'border-white/20'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </span>
                  
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                  {isSubmitted && isWrong && <XCircle className="w-5 h-5 text-red-400" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary-foreground/90 text-sm"
              >
                <span className="font-bold text-primary block mb-1">Explanation:</span>
                <span className="text-white/80">{question.explanation}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            {!isSubmitted ? (
              <button 
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-8 py-3 rounded-xl bg-white text-black font-bold disabled:opacity-50 transition-all hover:bg-gray-200"
              >
                Submit Answer
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-primary text-black font-bold flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
              >
                {currentQ === DEMO_QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Question'} <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
