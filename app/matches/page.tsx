"use client";

import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import Image from "next/image";
import { Search, Shield } from "lucide-react";

const MATCHES = [
    { id: 1, name: "Jessica", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60" },
    { id: 2, name: "David", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60" },
    { id: 3, name: "Sarah", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60" },
];

const MESSAGES = [
    {
        id: 1,
        name: "Jessica",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
        lastMessage: "Hey! How's your day going? 😊",
        time: "2m ago",
        unread: true
    },
    {
        id: 4,
        name: "Michael",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60",
        lastMessage: "That sounds awesome!",
        time: "1h ago",
        unread: false
    },
];

export default function MatchesPage() {
    return (
        <main className="flex flex-col h-screen w-full bg-black">
            {/* Header */}
            <header className="px-4 py-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-black">
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500">
                        <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" alt="Me" fill className="object-cover" sizes="40px" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Messages</h1>
                    <Shield className="ml-auto text-purple-400" size={20} />
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search 2 matches"
                        className="w-full bg-gray-900 border border-purple-500/30 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </header>

            <div className="flex-1 overflow-y-auto pb-20">
                {/* New Matches */}
                <div className="p-4">
                    <h2 className="text-purple-400 font-bold text-sm uppercase tracking-wide mb-3">New Matches</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                        <div className="flex flex-col items-center gap-1 min-w-[80px]">
                            <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border-2 border-purple-500 border-dashed flex items-center justify-center text-purple-400">
                                <span className="text-xl font-bold">99+</span>
                            </div>
                            <span className="text-xs font-medium text-purple-300">Likes</span>
                        </div>
                        {MATCHES.map((match) => (
                            <Link href={`/chat/${match.id}`} key={match.id} className="flex flex-col items-center gap-1 min-w-[80px]">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                    <Image src={match.image} alt={match.name} fill className="object-cover" sizes="64px" />
                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-1 left-0 w-full flex justify-center">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-white">{match.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Messages */}
                <div className="p-4 pt-0">
                    <h2 className="text-purple-300/70 font-bold text-sm uppercase tracking-wide mb-3">Messages</h2>
                    <div className="flex flex-col gap-4">
                        {MESSAGES.map((msg) => (
                            <Link href={`/chat/${msg.id}`} key={msg.id} className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-purple-500/30">
                                    <img src={msg.image} alt={msg.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-white">{msg.name}</h3>
                                        <span className="text-xs text-purple-300/60">{msg.time}</span>
                                    </div>
                                    <p className={`text-sm truncate ${msg.unread ? "text-purple-200 font-medium" : "text-purple-300/70"}`}>
                                        {msg.lastMessage}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <BottomNav />
        </main>
    );
}
