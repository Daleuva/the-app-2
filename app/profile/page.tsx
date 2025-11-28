"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { Settings, Edit } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="flex flex-col h-screen w-full bg-black overflow-hidden">
            {/* Header */}
            <header className="flex justify-between items-center px-4 py-3 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-black z-10">
                <h1 className="text-2xl font-bold text-purple-400">Profile</h1>
                <Link href="/edit-profile">
                    <Settings size={24} className="text-purple-400 hover:text-purple-300 transition-colors" />
                </Link>
            </header>

            <div className="flex-1 overflow-y-auto pb-20">
                {/* Profile Card */}
                <div className="max-w-2xl mx-auto">
                    {/* Profile Photo - Circular and Centered */}
                    <div className="flex flex-col items-center gap-4 py-8 px-4">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
                                alt="Profile"
                                fill
                                className="object-cover"
                                sizes="160px"
                                priority
                            />
                        </div>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-1">John, 28</h2>
                            <p className="text-purple-300 text-sm">Software Engineer</p>
                        </div>
                    </div>

                    {/* Profile Info Cards */}
                    <div className="px-4 space-y-4">
                        <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-3xl p-6 space-y-4">
                            <div>
                                <h3 className="text-white font-bold mb-2">About Me</h3>
                                <p className="text-purple-200 text-sm leading-relaxed">
                                    Love coding, coffee, and exploring new places. Always up for an adventure or a good conversation.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-2">Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Technology", "Coffee", "Travel", "Music", "Photography"].map((interest) => (
                                        <span
                                            key={interest}
                                            className="px-3 py-1 rounded-full bg-purple-600/30 border border-purple-500/50 text-purple-200 text-xs"
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium CTA */}
                <div className="p-4 space-y-3">
                    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600 rounded-3xl p-6 shadow-2xl">
                        {/* Animated background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Edit size={20} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Saturn Premium</h3>
                            </div>

                            <p className="text-white/90 text-center mb-4 text-sm">
                                Unlock unlimited likes, see who likes you, and more!
                            </p>

                            <Link
                                href="/subscription"
                                className="block w-full py-4 rounded-full bg-white text-yellow-600 font-bold text-center shadow-lg hover:bg-yellow-50 transition-all transform hover:scale-105"
                            >
                                Get Premium Now
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/edit-profile"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 border border-purple-500/30 rounded-full text-purple-300 font-bold hover:bg-purple-900/30 transition-all"
                    >
                        <Edit size={20} />
                        Edit Profile
                    </Link>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
