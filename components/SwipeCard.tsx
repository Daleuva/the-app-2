"use client";

import { useState } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import ProfileDetailModal from "./ProfileDetailModal";

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

interface SwipeCardProps {
    profile: Profile;
    style?: React.CSSProperties;
    onModalStateChange?: (isOpen: boolean) => void;
}

export default function SwipeCard({ profile, style, onModalStateChange }: SwipeCardProps) {
    const [showDetail, setShowDetail] = useState(false);

    const handleModalOpen = () => {
        setShowDetail(true);
        onModalStateChange?.(true);
    };

    const handleModalClose = () => {
        setShowDetail(false);
        onModalStateChange?.(false);
    };

    return (
        <>
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-full rounded-3xl overflow-hidden shadow-xl bg-white select-none"
                style={style}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={profile.image}
                        alt={profile.name}
                        fill
                        className="object-cover pointer-events-none"
                        draggable={false}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white pointer-events-none">
                        <div className="flex items-end gap-3 mb-2">
                            <h2 className="text-3xl font-bold">{profile.name}</h2>
                            <span className="text-2xl font-medium opacity-90">{profile.age}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 opacity-90">
                            <span className="text-sm bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm">
                                {profile.distance} miles away
                            </span>
                        </div>

                        <p className="text-sm line-clamp-2 opacity-80 mb-12">
                            {profile.bio}
                        </p>
                    </div>

                    {/* Info Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleModalOpen();
                        }}
                        className="absolute bottom-24 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 pointer-events-auto shadow-lg hover:scale-110 transition-transform z-20"
                    >
                        <Info size={18} />
                    </button>
                </div>
            </div>

            <ProfileDetailModal
                profile={profile}
                isOpen={showDetail}
                onClose={handleModalClose}
            />
        </>
    );
}
