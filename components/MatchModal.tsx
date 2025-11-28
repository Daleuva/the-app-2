"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    matchedProfile: {
        name: string;
        image: string;
    } | null;
}

export default function MatchModal({ isOpen, onClose, matchedProfile }: MatchModalProps) {
    if (!matchedProfile) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-gradient-to-br from-purple-900 via-pink-900 to-black flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="relative max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
                        >
                            <X size={24} />
                        </button>

                        {/* Content */}
                        <div className="text-center">
                            {/* Title with Animation */}
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="mb-8"
                            >
                                <h1 className="text-5xl font-bold text-white mb-2">It's a Match!</h1>
                                <p className="text-purple-200 text-lg">
                                    You and {matchedProfile.name} liked each other
                                </p>
                            </motion.div>

                            {/* Photos */}
                            <div className="relative mb-8 h-64">
                                {/* Left Photo (User) */}
                                <motion.div
                                    initial={{ x: -100, opacity: 0, rotate: -10 }}
                                    animate={{ x: -20, opacity: 1, rotate: -5 }}
                                    transition={{ delay: 0.3, type: "spring", damping: 15 }}
                                    className="absolute left-0 w-48 h-64 rounded-3xl overflow-hidden border-4 border-white shadow-2xl"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60"
                                        alt="You"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 192px, 192px"
                                    />
                                </motion.div>

                                {/* Right Photo (Match) */}
                                <motion.div
                                    initial={{ x: 100, opacity: 0, rotate: 10 }}
                                    animate={{ x: 20, opacity: 1, rotate: 5 }}
                                    transition={{ delay: 0.3, type: "spring", damping: 15 }}
                                    className="absolute right-0 w-48 h-64 rounded-3xl overflow-hidden border-4 border-white shadow-2xl"
                                >
                                    <Image
                                        src={matchedProfile.image}
                                        alt={matchedProfile.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 192px, 192px"
                                    />
                                </motion.div>

                                {/* Heart Icon in Center */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring", damping: 10, stiffness: 200 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl z-10"
                                >
                                    <Heart size={32} className="text-pink-500" fill="currentColor" />
                                </motion.div>
                            </div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="space-y-3"
                            >
                                <Link
                                    href="/matches"
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                                >
                                    <MessageCircle size={24} />
                                    Send Message
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-lg hover:bg-white/20 transition-all"
                                >
                                    Keep Swiping
                                </button>
                            </motion.div>
                        </div>

                        {/* Confetti/Sparkles Effect */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 0, opacity: 1 }}
                                    animate={{
                                        y: [0, -500],
                                        opacity: [1, 0],
                                        x: Math.random() * 400 - 200,
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        delay: Math.random() * 0.5,
                                        repeat: Infinity,
                                    }}
                                    className="absolute bottom-0 left-1/2"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                    }}
                                >
                                    <Heart
                                        size={12 + Math.random() * 12}
                                        className="text-pink-300"
                                        fill="currentColor"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
