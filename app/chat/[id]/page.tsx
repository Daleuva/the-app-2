"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import ProfileDetailModal from "@/components/ProfileDetailModal";
import { ChevronLeft, MoreVertical, ImageIcon, Send } from "lucide-react";

const MOCK_MESSAGES = [
    { id: 1, text: "Hey! How's it going?", sender: "them", time: "10:00 AM", type: "text" },
    { id: 2, text: "Hi! I'm doing great, thanks for asking. How about you?", sender: "me", time: "10:05 AM", type: "text" },
    { id: 3, text: "Pretty good! Just finished work. Any plans for the weekend?", sender: "them", time: "10:10 AM", type: "text" },
];

// Mock profile data for the chat user
const CHAT_USER_PROFILE = {
    id: 1,
    name: "Sarah",
    age: 28,
    bio: "Adventure seeker & coffee lover ☕",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
    distance: 2,
    work: "Product Designer at TechCo",
    school: "Stanford - Design",
    interests: ["Travel", "Photography", "Coffee"],
    photos: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60",
    ]
};

export default function ChatPage() {
    const params = useParams();
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [newMessage, setNewMessage] = useState("");
    const [showProfile, setShowProfile] = useState(false);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, {
                id: messages.length + 1,
                text: newMessage,
                sender: "me",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: "text"
            }]);
            setNewMessage("");
        }
    };

    const handlePhotoShare = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            // Mock: In production, upload to server
            const mockImageUrl = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60";
            setMessages([...messages, {
                id: messages.length + 1,
                text: mockImageUrl,
                sender: "me",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: "image"
            }]);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-black overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-black z-10">
                <Link href="/matches" className="text-purple-400 hover:text-purple-300">
                    <ChevronLeft size={28} />
                </Link>

                <div className="flex items-center gap-3 flex-1 justify-center">
                    <button
                        onClick={() => setShowProfile(true)}
                        className="relative w-10 h-10 rounded-full overflow-hidden border border-purple-500/30 hover:border-purple-500 transition-all"
                    >
                        <Image src={CHAT_USER_PROFILE.image} alt="User" fill className="object-cover" sizes="40px" />
                    </button>
                    <button onClick={() => setShowProfile(true)} className="font-bold text-white hover:text-purple-300 transition-colors">
                        {CHAT_USER_PROFILE.name}
                    </button>
                </div>

                <button className="text-purple-400 hover:text-purple-300">
                    <MoreVertical size={24} />
                </button>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.type === "image" ? (
                            <div className={`max-w-[75%] ${msg.sender === "me" ? "rounded-br-none" : "rounded-bl-none"} rounded-2xl overflow-hidden`}>
                                <div className="relative w-48 h-48 rounded-2xl overflow-hidden">
                                    <Image src={msg.text} alt="Shared" fill className="object-cover" sizes="(max-width: 768px) 192px, 192px" />
                                </div>
                                <span className="text-[10px] text-purple-300/60 block px-2 py-1 bg-black/50">{msg.time}</span>
                            </div>
                        ) : (
                            <div
                                className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.sender === "me"
                                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-br-none"
                                        : "bg-gray-800 text-white rounded-bl-none"
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <span className="text-[10px] text-purple-300/60 mt-1 block">{msg.time}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="border-t border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-black p-4">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <label className="cursor-pointer text-purple-400 hover:text-purple-300 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoShare}
                            className="hidden"
                        />
                        <ImageIcon size={24} />
                    </label>

                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-900 border border-purple-500/30 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <button
                        type="submit"
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center text-white hover:from-purple-700 hover:to-purple-800 transition-all"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>

            {/* Profile Modal */}
            <ProfileDetailModal
                profile={CHAT_USER_PROFILE}
                isOpen={showProfile}
                onClose={() => setShowProfile(false)}
            />

            <BottomNav />
        </div>
    );
}
