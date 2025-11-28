"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Check, Crown, Star, Eye, Zap, Heart, Shield, Sparkles } from "lucide-react";

const BENEFITS = [
    {
        icon: Eye,
        title: "See Who Likes You",
        description: "Know exactly who's interested before you swipe"
    },
    {
        icon: Heart,
        title: "Unlimited Likes",
        description: "Like as many profiles as you want"
    },
    {
        icon: Zap,
        title: "5 Super Likes per Day",
        description: "Stand out and get 3x more matches"
    },
    {
        icon: Star,
        title: "Priority Likes",
        description: "Your profile gets shown first to others"
    },
    {
        icon: Shield,
        title: "Control Your Profile",
        description: "Choose who sees you and manage privacy"
    },
    {
        icon: Sparkles,
        title: "Rewind Swipes",
        description: "Undo your last swipe if you change your mind"
    }
];

const PLANS = [
    {
        id: "1-month",
        duration: "1 Month",
        price: 14.99,
        pricePerMonth: 14.99,
        savings: null,
        popular: false
    },
    {
        id: "3-months",
        duration: "3 Months",
        price: 29.99,
        pricePerMonth: 9.99,
        savings: "Save 33%",
        popular: true
    },
    {
        id: "6-months",
        duration: "6 Months",
        price: 44.99,
        pricePerMonth: 7.49,
        savings: "Save 50%",
        popular: false
    }
];

export default function SubscriptionPage() {
    const [selectedPlan, setSelectedPlan] = useState("3-months");

    const handleSubscribe = () => {
        const plan = PLANS.find(p => p.id === selectedPlan);
        alert(`Subscribing to ${plan?.duration} plan for $${plan?.price}`);
        // In production, integrate with payment gateway
    };

    return (
        <div className="flex flex-col h-screen w-full bg-black text-white overflow-hidden">
            {/* Header */}
            <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-purple-500/20 bg-black">
                <Link href="/profile" className="text-purple-400 hover:text-purple-300">
                    <ChevronLeft size={28} />
                </Link>
                <h1 className="text-xl font-bold">Saturn Premium</h1>
                <div className="w-7" /> {/* Spacer */}
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600 p-8 text-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Crown size={40} className="text-white" fill="currentColor" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
                        <p className="text-white/90 text-lg">
                            Get the most out of Saturn and find your perfect match faster
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-6 text-center">Premium Benefits</h3>
                    <div className="space-y-4">
                        {BENEFITS.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-900/30 to-black border border-purple-500/30 rounded-2xl"
                            >
                                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                                    <benefit.icon size={24} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                                    <p className="text-sm text-purple-200">{benefit.description}</p>
                                </div>
                                <Check size={20} className="text-green-500 flex-shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Plans */}
                <div className="p-6 pb-32">
                    <h3 className="text-2xl font-bold mb-6 text-center">Choose Your Plan</h3>
                    <div className="space-y-3">
                        {PLANS.map((plan) => (
                            <button
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                className={`relative w-full p-4 rounded-2xl border-2 transition-all ${selectedPlan === plan.id
                                    ? "border-yellow-500 bg-gradient-to-r from-yellow-500/20 to-orange-500/20"
                                    : "border-purple-500/30 bg-gray-900"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full text-xs font-bold">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="text-left">
                                        <div className="font-bold text-lg text-white">{plan.duration}</div>
                                        <div className="text-sm text-purple-300">
                                            ${plan.pricePerMonth}/month
                                        </div>
                                        {plan.savings && (
                                            <div className="text-xs text-green-400 font-semibold mt-1">
                                                {plan.savings}
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-white">
                                            ${plan.price}
                                        </div>
                                        <div className="text-xs text-purple-300">total</div>
                                    </div>
                                </div>

                                {selectedPlan === plan.id && (
                                    <div className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                        <Check size={16} className="text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Button - Fixed at bottom */}
            <div className="flex-shrink-0 p-6 bg-gradient-to-t from-black via-black to-transparent border-t border-purple-500/20">
                <button
                    onClick={handleSubscribe}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg shadow-2xl hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105"
                >
                    Continue with {PLANS.find(p => p.id === selectedPlan)?.duration}
                </button>

                <p className="text-center text-xs text-purple-300/60 mt-4">
                    Cancel anytime. Terms and conditions apply.
                </p>
            </div>
        </div>
    );
}
