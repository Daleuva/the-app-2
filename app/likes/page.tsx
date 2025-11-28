"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { Crown, Sparkles, Lock, Heart, X } from "lucide-react";
import ProfileDetailModal from "@/components/ProfileDetailModal";
import MiniMatchModal from "@/components/MiniMatchModal";

// Mock data for likes
const MOCK_LIKES = [
    {
        id: 1,
        name: "Jessica",
        age: 24,
        bio: "Adventure seeker & coffee lover ☕ Love exploring new places and capturing moments. Weekend hiker, weekday marketer.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
        distance: 3,
        work: "Marketing Manager at TechCorp",
        school: "NYU - Business & Marketing",
        interests: ["Travel", "Photography", "Coffee", "Art", "Hiking"],
        photos: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop&q=60"
        ],
        type: "like"
    },
    {
        id: 2,
        name: "Sarah",
        age: 22,
        bio: "Art student with a passion for creativity. Love painting, museums, and indie music. Looking for someone to explore the city with!",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60",
        distance: 5,
        work: "Freelance Artist",
        school: "School of Visual Arts",
        interests: ["Art", "Music", "Museums", "Coffee", "Photography"],
        photos: [
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60"
        ],
        type: "superlike"
    },
    {
        id: 3,
        name: "Emma",
        age: 25,
        bio: "Yoga instructor and wellness enthusiast. Believer in good vibes and positive energy. Let's find balance together! 🧘‍♀️",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60",
        distance: 2,
        work: "Yoga Instructor at Zen Studio",
        school: "UCLA - Health Sciences",
        interests: ["Yoga", "Fitness", "Nature", "Cooking", "Travel"],
        photos: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60"
        ],
        type: "like"
    },
    {
        id: 4,
        name: "Olivia",
        age: 26,
        bio: "Tech entrepreneur and foodie. Building the future one startup at a time. Love trying new restaurants and traveling!",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=60",
        distance: 4,
        work: "Founder at StartupXYZ",
        school: "Stanford - Computer Science",
        interests: ["Technology", "Food", "Travel", "Wine", "Hiking"],
        photos: [
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60"
        ],
        type: "superlike"
    },
    {
        id: 5,
        name: "Sophia",
        age: 23,
        bio: "Book lover and aspiring writer. Coffee addict who enjoys deep conversations. Let's discuss our favorite novels! 📚",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=60",
        distance: 6,
        work: "Content Writer at MediaCo",
        school: "Columbia - Literature",
        interests: ["Reading", "Coffee", "Writing", "Movies", "Art"],
        photos: [
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60"
        ],
        type: "like"
    },
    {
        id: 6,
        name: "Ava",
        age: 27,
        bio: "Fitness trainer with a love for the outdoors. Marathon runner and adventure seeker. Let's stay active together! 💪",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&auto=format&fit=crop&q=60",
        distance: 3,
        work: "Personal Trainer at FitLife",
        school: "University of Miami - Kinesiology",
        interests: ["Fitness", "Running", "Hiking", "Beach", "Sports"],
        photos: [
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60"
        ],
        type: "like"
    }
];

export default function LikesPage() {
    const [isPremium, setIsPremium] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<typeof MOCK_LIKES[0] | null>(null);
    const [likes, setLikes] = useState(MOCK_LIKES);
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [matchedProfile, setMatchedProfile] = useState<{ name: string; image: string } | null>(null);

    const handleProfileClick = (like: typeof MOCK_LIKES[0]) => {
        if (isPremium) {
            setSelectedProfile(like);
        }
    };

    const handleLike = () => {
        if (selectedProfile) {
            console.log("Liked:", selectedProfile.name);
            // Show match modal
            setMatchedProfile({
                name: selectedProfile.name,
                image: selectedProfile.image
            });
            setShowMatchModal(true);
            // Remove from likes list
            setLikes(likes.filter(l => l.id !== selectedProfile.id));
            setSelectedProfile(null);
        }
    };

    const handleDislike = () => {
        if (selectedProfile) {
            console.log("Disliked:", selectedProfile.name);
            // Remove from likes list
            setLikes(likes.filter(l => l.id !== selectedProfile.id));
            setSelectedProfile(null);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-black overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-black z-10">
                <h1 className="text-2xl font-bold text-purple-400">Likes You</h1>
                <div className="flex items-center gap-3">
                    {/* Premium Toggle for Testing */}
                    <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-full border border-purple-500/30">
                        <span className="text-xs text-purple-300 font-semibold">TEST PREMIUM</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isPremium}
                                onChange={(e) => setIsPremium(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                        </label>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-500">
                        <Crown size={20} fill="currentColor" />
                        <span className="text-sm font-bold">{MOCK_LIKES.length}</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto pb-20">
                {/* Premium Upsell Banner */}
                {!isPremium && (
                    <div className="p-4">
                        <div className="bg-gradient-to-br from-yellow-600/20 via-purple-900/30 to-black border-2 border-yellow-500/30 rounded-3xl p-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                                <Crown size={32} className="text-white" fill="currentColor" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Upgrade to See Who Likes You</h2>
                            <p className="text-purple-200 mb-4">
                                {MOCK_LIKES.length} people already liked you! Get Premium to see who they are.
                            </p>
                            <Link
                                href="/subscription"
                                className="inline-block w-full py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all"
                            >
                                Get Premium Now
                            </Link>
                        </div>
                    </div>
                )}

                {/* Likes Grid */}
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                        {likes.map((like) => (
                            <div
                                key={like.id}
                                onClick={() => handleProfileClick(like)}
                                className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-purple-500/30 ${isPremium ? 'cursor-pointer hover:border-purple-500 transition-all' : ''
                                    }`}
                            >
                                {/* Image with conditional blur */}
                                <div className={`relative w-full h-full ${!isPremium ? 'blur-xl' : ''}`}>
                                    <Image
                                        src={like.image}
                                        alt={isPremium ? like.name : "Hidden"}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 300px"
                                    />
                                </div>

                                {/* Gradient overlay */}
                                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                {/* Super Like Badge */}
                                {like.type === "superlike" && (
                                    <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                        <Sparkles size={16} className="text-white" fill="currentColor" />
                                    </div>
                                )}

                                {/* Lock overlay for non-premium */}
                                {!isPremium && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="w-12 h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center mb-2 border-2 border-yellow-500/50">
                                            <Lock size={24} className="text-yellow-500" />
                                        </div>
                                        <p className="text-white text-xs font-bold">Premium</p>
                                    </div>
                                )}

                                {/* Name (shown only for premium) */}
                                {isPremium && (
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <p className="text-white font-bold text-lg">
                                            {like.name}, {like.age}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA for non-premium */}
                {!isPremium && (
                    <div className="p-4">
                        <Link
                            href="/subscription"
                            className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all"
                        >
                            <Crown size={20} fill="currentColor" />
                            Unlock All Likes
                        </Link>
                    </div>
                )}
            </div>

            {/* Profile Modal with Actions */}
            {selectedProfile && (
                <>
                    <ProfileDetailModal
                        profile={selectedProfile}
                        isOpen={!!selectedProfile}
                        onClose={() => setSelectedProfile(null)}
                    />

                    {/* Action Buttons Overlay */}
                    <div className="fixed bottom-24 left-0 right-0 z-[60] flex justify-center gap-6 px-4">
                        <button
                            onClick={handleDislike}
                            className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-gray-200"
                        >
                            <X size={32} className="text-red-500" strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={handleLike}
                            className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-gray-200"
                        >
                            <Heart size={32} className="text-green-500" fill="currentColor" strokeWidth={2.5} />
                        </button>
                    </div>
                </>
            )}

            {/* Mini Match Modal */}
            <MiniMatchModal
                isOpen={showMatchModal}
                onClose={() => setShowMatchModal(false)}
                matchedProfile={matchedProfile}
            />

            <BottomNav />
        </div>
    );
}
