"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, MapPin, Briefcase, GraduationCap } from "lucide-react";
import Image from "next/image";

interface Profile {
    id: number;
    name: string;
    age: number;
    bio: string;
    image: string;
    distance: number;
    work?: string;
    school?: string;
    interests?: string[];
    photos?: string[];
}

interface ProfileDetailModalProps {
    profile: Profile;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfileDetailModal({ profile, isOpen, onClose }: ProfileDetailModalProps) {
    const photos = profile.photos || [profile.image];
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const handlePhotoSwipe = (event: any, info: PanInfo) => {
        const threshold = 50;

        if (info.offset.x > threshold) {
            // Swipe right - previous photo
            setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
        } else if (info.offset.x < -threshold) {
            // Swipe left - next photo
            setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black flex items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-md h-full max-h-[900px] overflow-y-auto bg-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with Back Button */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-purple-500/30 hover:bg-black/80 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Swipeable Photo Carousel */}
                        <div className="relative w-full aspect-[3/4] -mt-16 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPhotoIndex}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={handlePhotoSwipe}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full h-full cursor-grab active:cursor-grabbing"
                                >
                                    <Image
                                        src={photos[currentPhotoIndex]}
                                        alt={`${profile.name} - Photo ${currentPhotoIndex + 1}`}
                                        fill
                                        className="object-cover pointer-events-none"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Photo Indicators */}
                            {photos.length > 1 && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                                    {photos.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPhotoIndex(index)}
                                            className={`h-1 rounded-full transition-all ${index === currentPhotoIndex
                                                ? "w-8 bg-white"
                                                : "w-1 bg-white/50"
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                        </div>

                        {/* Profile Info */}
                        <div className="bg-black px-6 pb-40">
                            {/* Name and Age */}
                            <div className="flex items-end gap-3 mb-4 -mt-12 relative z-10">
                                <h1 className="text-4xl font-bold text-white">{profile.name}</h1>
                                <span className="text-3xl font-medium text-white/90">{profile.age}</span>
                            </div>

                            {/* Distance */}
                            <div className="flex items-center gap-2 mb-6">
                                <MapPin size={16} className="text-purple-400" />
                                <span className="text-purple-300">{profile.distance} miles away</span>
                            </div>

                            {/* Work/School */}
                            {(profile.work || profile.school) && (
                                <div className="space-y-3 mb-6">
                                    {profile.work && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                                                <Briefcase size={18} className="text-purple-400" />
                                            </div>
                                            <span className="text-white">{profile.work}</span>
                                        </div>
                                    )}
                                    {profile.school && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                                                <GraduationCap size={18} className="text-purple-400" />
                                            </div>
                                            <span className="text-white">{profile.school}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Bio */}
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-white mb-2">About</h2>
                                <p className="text-purple-100 leading-relaxed">{profile.bio}</p>
                            </div>

                            {/* Interests */}
                            {profile.interests && profile.interests.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-bold text-white mb-3">Interests</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.interests.map((interest, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
