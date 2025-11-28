"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function WelcomePage() {
    const [showContent, setShowContent] = useState(false);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop&q=80"
                    alt="Welcome"
                    fill
                    className="object-cover opacity-40"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-end p-8 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-8"
                >
                    {/* Logo/Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-2xl"
                    >
                        <Sparkles size={48} className="text-white" fill="currentColor" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                        Saturn
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Find your perfect match in the stars
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="w-full max-w-sm"
                >
                    <Link
                        href="/login"
                        className="block w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-center"
                    >
                        Get Started
                    </Link>

                    <p className="text-center text-xs text-gray-500 mt-4">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
