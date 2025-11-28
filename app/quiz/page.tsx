"use client";

import { useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ThumbsUp, ThumbsDown } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "Do you enjoy outdoor adventures?",
        emoji: "🏕️"
    },
    {
        id: 2,
        question: "Are you a morning person?",
        emoji: "🌅"
    },
    {
        id: 3,
        question: "Do you prefer staying in over going out?",
        emoji: "🏠"
    },
    {
        id: 4,
        question: "Do you like trying new foods?",
        emoji: "🍜"
    },
    {
        id: 5,
        question: "Are you into fitness and working out?",
        emoji: "💪"
    },
    {
        id: 6,
        question: "Do you enjoy reading books?",
        emoji: "📚"
    },
    {
        id: 7,
        question: "Are you a coffee lover?",
        emoji: "☕"
    },
    {
        id: 8,
        question: "Do you like traveling to new places?",
        emoji: "✈️"
    },
    {
        id: 9,
        question: "Are you a night owl?",
        emoji: "🌙"
    },
    {
        id: 10,
        question: "Do you enjoy cooking?",
        emoji: "👨‍🍳"
    },
    {
        id: 11,
        question: "Are you into music festivals?",
        emoji: "🎵"
    },
    {
        id: 12,
        question: "Do you prefer dogs over cats?",
        emoji: "🐕"
    },
    {
        id: 13,
        question: "Are you spontaneous?",
        emoji: "🎲"
    },
    {
        id: 14,
        question: "Do you like watching movies?",
        emoji: "🎬"
    },
    {
        id: 15,
        question: "Are you a beach person?",
        emoji: "🏖️"
    }
];

export default function QuizPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ questionId: number; answer: boolean }[]>([]);
    const [showComplete, setShowComplete] = useState(false);

    const controls = useAnimation();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

    const yesOpacity = useTransform(x, [50, 150], [0, 1]);
    const noOpacity = useTransform(x, [-150, -50], [1, 0]);

    const currentQuestion = QUIZ_QUESTIONS[currentIndex];

    const handleAnswer = async (answer: boolean, direction: number) => {
        setAnswers([...answers, { questionId: currentQuestion.id, answer }]);

        await controls.start({
            x: direction * 500,
            opacity: 0,
            transition: { duration: 0.3 }
        });

        if (currentIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentIndex(currentIndex + 1);
            controls.set({ x: 0, opacity: 1 });
        } else {
            setShowComplete(true);
        }
    };

    const handleDragEnd = async (event: any, info: PanInfo) => {
        const threshold = 100;
        const velocityX = info.velocity.x;

        if (info.offset.x > threshold || velocityX > 500) {
            // Swipe Right = YES
            await handleAnswer(true, 1);
        } else if (info.offset.x < -threshold || velocityX < -500) {
            // Swipe Left = NO
            await handleAnswer(false, -1);
        } else {
            // Reset
            controls.start({ x: 0, y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } });
        }
    };

    const handleButtonAnswer = (answer: boolean) => {
        handleAnswer(answer, answer ? 1 : -1);
    };

    if (showComplete) {
        return (
            <div className="flex flex-col h-screen w-full bg-black text-white items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                        <ThumbsUp size={48} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h1>
                    <p className="text-purple-200 mb-2">
                        You answered {answers.length} questions
                    </p>
                    <p className="text-purple-300 text-sm mb-8">
                        We'll use your answers to find better matches for you
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full font-bold hover:from-purple-700 hover:to-purple-800 transition-all"
                    >
                        Start Swiping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-full bg-black overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-black z-10">
                <Link href="/profile" className="text-purple-400 hover:text-purple-300">
                    <ChevronLeft size={28} />
                </Link>
                <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-600 to-purple-700 transition-all duration-300"
                            style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                        />
                    </div>
                </div>
                <span className="text-purple-300 text-sm font-bold">
                    {currentIndex + 1}/{QUIZ_QUESTIONS.length}
                </span>
            </header>

            {/* Quiz Card */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
                <motion.div
                    className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
                    style={{ x, y, rotate, opacity }}
                    animate={controls}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.7}
                    onDragEnd={handleDragEnd}
                >
                    {/* Card Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-black" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                        <div className="text-8xl mb-8">{currentQuestion.emoji}</div>
                        <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                            {currentQuestion.question}
                        </h2>
                        <p className="text-purple-300 text-sm">
                            Swipe right for YES, left for NO
                        </p>
                    </div>

                    {/* YES Overlay */}
                    <motion.div
                        style={{ opacity: yesOpacity }}
                        className="absolute top-1/4 right-10 z-20 pointer-events-none"
                    >
                        <div className="w-32 h-32 rounded-full border-8 border-green-500/50 bg-green-500/20 flex items-center justify-center rotate-12">
                            <span className="text-5xl font-bold text-green-500">YES</span>
                        </div>
                    </motion.div>

                    {/* NO Overlay */}
                    <motion.div
                        style={{ opacity: noOpacity }}
                        className="absolute top-1/4 left-10 z-20 pointer-events-none"
                    >
                        <div className="w-32 h-32 rounded-full border-8 border-red-500/50 bg-red-500/20 flex items-center justify-center -rotate-12">
                            <span className="text-5xl font-bold text-red-500">NO</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 pb-20 px-4">
                <button
                    onClick={() => handleButtonAnswer(false)}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <ThumbsDown size={28} className="text-white" fill="currentColor" />
                </button>
                <button
                    onClick={() => handleButtonAnswer(true)}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <ThumbsUp size={28} className="text-white" fill="currentColor" />
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
