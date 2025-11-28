"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion";
import SwipeCard from "./SwipeCard";
import { X, Heart, Star, RotateCcw } from "lucide-react";

interface Profile {
    id: number;
    name: string;
    age: number;
    distance: string;
    image: string;
    bio?: string;
    work?: string;
    school?: string;
    interests?: string[];
    photos?: string[];
}

interface CardStackProps {
    profiles: Profile[];
    isPremium?: boolean;
}

export default function CardStack({ profiles: initialProfiles, isPremium = false }: CardStackProps) {
    const [profiles, setProfiles] = useState(initialProfiles);
    const [lastSwipedProfile, setLastSwipedProfile] = useState<Profile | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

    // Overlay opacities
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);
    const superLikeOpacity = useTransform(y, [-100, 0], [1, 0]);

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (isModalOpen) return;

        const threshold = 100;
        const superLikeThreshold = -100;

        if (info.offset.y < superLikeThreshold) {
            // Super Like
            controls.start({ y: -500, opacity: 0 });
            setTimeout(removeCard, 200);
        } else if (info.offset.x > threshold) {
            // Like
            controls.start({ x: 500, opacity: 0 });
            setTimeout(removeCard, 200);
        } else if (info.offset.x < -threshold) {
            // Nope
            controls.start({ x: -500, opacity: 0 });
            setTimeout(removeCard, 200);
        } else {
            // Return to center
            controls.start({ x: 0, y: 0, opacity: 1 });
        }
    };

    const handleSuperLike = () => {
        if (isModalOpen) return;
        controls.start({ y: -500, opacity: 0 });
        setTimeout(removeCard, 200);
    };

    const handleLike = () => {
        if (isModalOpen) return;
        controls.start({ x: 500, opacity: 0 });
        setTimeout(removeCard, 200);
    };

    const handleDislike = () => {
        if (isModalOpen) return;
        controls.start({ x: -500, opacity: 0 });
        setTimeout(removeCard, 200);
    };

    const removeCard = () => {
        if (profiles.length > 0) {
            const removedProfile = profiles[0];
            console.log('Removing card:', removedProfile.name);
            setProfiles(prev => prev.slice(1));
            setLastSwipedProfile(removedProfile);
        }
        x.set(0);
        y.set(0);
        controls.set({ x: 0, y: 0, opacity: 1 });
    };

    const handleRewind = () => {
        if (isPremium && lastSwipedProfile) {
            console.log('Rewinding to:', lastSwipedProfile.name);
            setProfiles(prev => [lastSwipedProfile, ...prev]);
            setLastSwipedProfile(null);
        }
    };

    if (profiles.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-purple-300">
                <p className="text-lg">No more profiles</p>
            </div>
        );
    }

    const canRewind = isPremium && lastSwipedProfile !== null;

    return (
        <div className="relative flex-1 flex items-center justify-center overflow-hidden px-2 sm:px-4">
            <div className="relative w-full max-w-md h-full max-h-[calc(100vh-200px)] sm:max-h-[700px] aspect-[3/4]">
                {profiles.slice(0, 2).reverse().map((profile, index) => {
                    const isFront = index === profiles.slice(0, 2).length - 1;

                    return (
                        <motion.div
                            key={profile.id}
                            className="absolute w-full h-full"
                            style={{
                                zIndex: isFront ? 10 : 5,
                                x: isFront ? x : 0,
                                y: isFront ? y : 0,
                                rotate: isFront ? rotate : 0,
                                scale: isFront ? 1 : 0.95,
                            }}
                            animate={isFront ? controls : {}}
                            drag={isFront && !isModalOpen ? true : false}
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            onDragEnd={handleDragEnd}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <SwipeCard profile={profile} onModalStateChange={setIsModalOpen} />

                            {/* Like/Nope/Super Like Overlays */}
                            {isFront && (
                                <>
                                    <motion.div
                                        style={{ opacity: likeOpacity }}
                                        className="absolute top-8 left-8 border-4 border-purple-400 rounded-lg px-4 py-2 -rotate-12 z-20"
                                    >
                                        <span className="text-purple-400 text-4xl font-bold uppercase tracking-widest">Like</span>
                                    </motion.div>
                                    <motion.div
                                        style={{ opacity: nopeOpacity }}
                                        className="absolute top-8 right-8 border-4 border-[#ef4444] rounded-lg px-4 py-2 rotate-12 z-20"
                                    >
                                        <span className="text-[#ef4444] text-4xl font-bold uppercase tracking-widest">Nope</span>
                                    </motion.div>
                                    <motion.div
                                        style={{ opacity: superLikeOpacity }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#3b82f6] rounded-lg px-6 py-3 z-20 bg-white/90 backdrop-blur-sm"
                                    >
                                        <span className="text-[#3b82f6] text-4xl font-bold uppercase tracking-widest flex items-center gap-2">
                                            <Star size={36} fill="currentColor" />
                                            Super Like
                                        </span>
                                    </motion.div>
                                </>
                            )}
                        </motion.div>
                    );
                })}

                {/* Action Buttons */}
                <div className="absolute bottom-6 left-0 w-full flex justify-center items-center gap-4 z-30 pointer-events-none">
                    {/* Rewind Button - Premium Only */}
                    {isPremium && (
                        <button
                            onClick={handleRewind}
                            disabled={!canRewind}
                            className={`w-12 h-12 bg-purple-900/50 border border-purple-500/30 rounded-full shadow-lg flex items-center justify-center transition-all pointer-events-auto ${canRewind
                                ? 'text-yellow-400 hover:scale-110 hover:bg-yellow-500/20'
                                : 'text-gray-600 opacity-50 cursor-not-allowed'
                                }`}
                        >
                            <RotateCcw size={20} strokeWidth={2.5} />
                        </button>
                    )}

                    <button
                        onClick={handleDislike}
                        className="w-14 h-14 bg-purple-900/50 border border-purple-500/30 rounded-full shadow-xl flex items-center justify-center text-red-400 hover:scale-110 transition-transform pointer-events-auto"
                    >
                        <X size={28} strokeWidth={3} />
                    </button>
                    <button
                        onClick={handleSuperLike}
                        className="w-12 h-12 bg-purple-900/50 border border-purple-500/30 rounded-full shadow-lg flex items-center justify-center text-blue-400 hover:scale-110 transition-transform pointer-events-auto"
                    >
                        <Star size={24} fill="currentColor" strokeWidth={0} />
                    </button>
                    <button
                        onClick={handleLike}
                        className="w-14 h-14 bg-purple-900/50 border border-purple-500/30 rounded-full shadow-xl flex items-center justify-center text-purple-400 hover:scale-110 transition-transform pointer-events-auto"
                    >
                        <Heart size={28} fill="currentColor" strokeWidth={0} />
                    </button>
                </div>
            </div>
        </div>
    );
}
