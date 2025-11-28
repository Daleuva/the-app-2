"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Star, HelpCircle, MessageCircle, User } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: Flame, label: "Discover" },
        { href: "/likes", icon: Star, label: "Likes" },
        { href: "/quiz", icon: HelpCircle, label: "Quiz" },
        { href: "/matches", icon: MessageCircle, label: "Chat" },
        { href: "/profile", icon: User, label: "Profile" },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black border-t border-purple-500/20 pb-safe pt-2 px-2 flex justify-between items-center z-50 h-16">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all ${isActive ? "text-purple-500" : "text-gray-500 hover:text-purple-400"
                            }`}
                    >
                        <item.icon size={isActive ? 26 : 22} fill={isActive ? "currentColor" : "none"} strokeWidth={isActive ? 2.5 : 2} />
                    </Link>
                );
            })}
        </div>
    );
}
