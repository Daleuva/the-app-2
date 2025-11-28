"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Phone, Mail } from "lucide-react";

export default function LoginPage() {
    const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - in production, send to API
        const contact = loginMethod === "phone" ? phoneNumber : email;
        console.log(`Sending verification code to ${contact}`);

        // Redirect to verification page
        window.location.href = `/verify?method=${loginMethod}&contact=${encodeURIComponent(contact)}`;
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3">
                <Link href="/welcome" className="text-purple-600 hover:text-purple-700">
                    <ChevronLeft size={28} />
                </Link>
                <button
                    onClick={() => setLoginMethod(loginMethod === "phone" ? "email" : "phone")}
                    className="text-purple-600 text-sm font-semibold hover:text-purple-700 transition-colors"
                >
                    Use {loginMethod === "phone" ? "Email" : "Phone"}
                </button>
            </header>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm"
                >
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg">
                        {loginMethod === "phone" ? (
                            <Phone size={32} className="text-white" />
                        ) : (
                            <Mail size={32} className="text-white" />
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
                        {loginMethod === "phone" ? "Enter your number" : "Enter your email"}
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        {loginMethod === "phone"
                            ? "We'll send you a verification code"
                            : "We'll send you a verification link"}
                    </p>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {loginMethod === "phone" ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                        <Phone size={20} />
                                    </div>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-600 focus:outline-none text-gray-800 bg-white shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-600 focus:outline-none text-gray-800 bg-white shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            Continue
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-500 mt-6">
                        By continuing, you agree to our{" "}
                        <a href="#" className="text-purple-600 underline">Terms</a> and{" "}
                        <a href="#" className="text-purple-600 underline">Privacy Policy</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
