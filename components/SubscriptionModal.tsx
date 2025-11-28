"use client";

import { X, Check, Star } from "lucide-react";
import { motion } from "framer-motion";

interface SubscriptionModalProps {
    onClose: () => void;
}

export default function SubscriptionModal({ onClose }: SubscriptionModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 z-10 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white backdrop-blur-md"
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="h-40 bg-gradient-to-br from-[#EDA61D] to-[#F3CE5E] flex flex-col items-center justify-center text-white pt-8">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm">
                        <Star size={32} fill="currentColor" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-wide">Saturn Premium</h2>
                </div>

                {/* Features */}
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#EDA61D]/10 flex items-center justify-center text-[#EDA61D]">
                            <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-gray-700 font-medium">See who likes you</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#EDA61D]/10 flex items-center justify-center text-[#EDA61D]">
                            <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-gray-700 font-medium">Unlimited Likes</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#EDA61D]/10 flex items-center justify-center text-[#EDA61D]">
                            <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-gray-700 font-medium">5 Super Likes a day</span>
                    </div>
                </div>

                {/* Pricing */}
                <div className="px-6 pb-6">
                    <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
                        <div className="flex-1 min-w-[100px] border-2 border-[#EDA61D] bg-[#EDA61D]/5 rounded-xl p-3 flex flex-col items-center relative">
                            <div className="absolute -top-3 bg-[#EDA61D] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                Most Popular
                            </div>
                            <span className="text-xl font-bold text-gray-900">12</span>
                            <span className="text-xs text-gray-500 mb-1">months</span>
                            <span className="text-sm font-bold text-[#EDA61D]">$8.99/mo</span>
                        </div>
                        <div className="flex-1 min-w-[100px] border border-gray-200 rounded-xl p-3 flex flex-col items-center grayscale opacity-60">
                            <span className="text-xl font-bold text-gray-900">6</span>
                            <span className="text-xs text-gray-500 mb-1">months</span>
                            <span className="text-sm font-bold text-gray-900">$12.99/mo</span>
                        </div>
                        <div className="flex-1 min-w-[100px] border border-gray-200 rounded-xl p-3 flex flex-col items-center grayscale opacity-60">
                            <span className="text-xl font-bold text-gray-900">1</span>
                            <span className="text-xs text-gray-500 mb-1">month</span>
                            <span className="text-sm font-bold text-gray-900">$19.99/mo</span>
                        </div>
                    </div>

                    <button className="w-full py-4 rounded-full bg-gradient-to-r from-[#EDA61D] to-[#F3CE5E] text-white font-bold shadow-lg uppercase tracking-wide text-sm hover:brightness-105 transition-all">
                        Continue
                    </button>

                    <p className="text-[10px] text-center text-gray-400 mt-4">
                        Recurring billing, cancel anytime.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
