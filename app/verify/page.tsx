"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Mail, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const method = searchParams.get("method") || "phone";
    const contact = searchParams.get("contact") || "";

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Auto-focus first input
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = code.join("");
        console.log("Verification code:", verificationCode);

        // Mock verification - in production, verify with API
        if (verificationCode.length === 6) {
            window.location.href = "/setup-profile";
        }
    };

    const handleResend = () => {
        alert(`Verification code resent to ${contact}`);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3">
                <Link href="/login" className="text-purple-600 hover:text-purple-700">
                    <ChevronLeft size={28} />
                </Link>
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
                        {method === "phone" ? (
                            <Phone size={32} className="text-white" />
                        ) : (
                            <Mail size={32} className="text-white" />
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
                        Enter verification code
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        We sent a code to <span className="font-semibold">{contact}</span>
                    </p>

                    {/* Form */}
                    <form onSubmit={handleVerify} className="space-y-6">
                        {/* Code Input */}
                        <div className="flex justify-center gap-2">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-purple-200 focus:border-purple-600 focus:outline-none text-gray-800 bg-white shadow-sm"
                                />
                            ))}
                        </div>

                        {/* Resend */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-purple-600 text-sm font-semibold hover:text-purple-700 transition-colors"
                            >
                                Didn't receive the code? Resend
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={code.join("").length !== 6}
                            className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Verify & Continue
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
