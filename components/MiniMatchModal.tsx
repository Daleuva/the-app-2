"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MiniMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    matchedProfile: {
        name: string;
        image: string;
    } | null;
}

export default function MiniMatchModal({ isOpen, onClose, matchedProfile }: MiniMatchModalProps) {
    if (!matchedProfile) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="relative bg-gradient-to-br from-purple-900 to-black border-2 border-purple-500/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Floating Hearts Animation */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 0, opacity: 1, x: 0 }}
                                    animate={{
                                        y: -200,
                                        opacity: 0,
                                        x: (Math.random() - 0.5) * 100,
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.2,
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                    }}
                                    className="absolute bottom-0 left-1/2"
                                    style={{
                                        left: `${20 + i * 10}%`,
                                    }}
                                >
                                    <Heart
                                        size={16 + Math.random() * 8}
                                        className="text-pink-400"
                                        fill="currentColor"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center">
                            {/* Title */}
                            <motion.h2
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-bold text-white mb-6"
                            >
                                It's a Match! 💜
                            </motion.h2>

                            {/* Photos */}
                            <div className="relative flex justify-center items-center mb-6 h-32">
                                {/* Left Photo (User) */}
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: -15, opacity: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl z-10"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60"
                                        alt="You"
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </motion.div>

                                {/* Heart Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                    className="absolute z-20 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                                >
                                    <Heart size={24} className="text-white" fill="currentColor" />
                                </motion.div>

                                {/* Right Photo (Match) */}
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 15, opacity: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl z-10"
                                >
                                    <Image
                                        src={matchedProfile.image}
                                        alt={matchedProfile.name}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </motion.div>
                            </div>

                            {/* Text */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-purple-200 mb-6"
                            >
                                You and <span className="font-bold text-white">{matchedProfile.name}</span> liked each other!
                            </motion.p>

                            {/* Buttons */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="space-y-3"
                            >
                                <Link
                                    href="/matches"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                                >
                                    <MessageCircle size={20} />
                                    Send Message
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all"
                                >
                                    Keep Swiping
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
