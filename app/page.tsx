"use client";

import { useState } from "react";
import Image from "next/image";
import CardStack from "@/components/CardStack";
import BottomNav from "@/components/BottomNav";

const MOCK_PROFILES = [
  {
    id: 1,
    name: "Jessica",
    age: 24,
    bio: "Adventure seeker & coffee lover ☕ Love exploring new places and capturing moments. Weekend hiker, weekday marketer. Let's grab coffee and plan our next adventure! 📸✨",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    distance: "3 km",
    work: "Marketing Manager at TechCorp",
    school: "NYU - Business & Marketing",
    interests: ["Travel", "Photography", "Coffee", "Art", "Hiking"],
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: 2,
    name: "David",
    age: 27,
    bio: "Chef by day, gamer by night 🎮🍝 Passionate about creating amazing food experiences. Looking for someone to taste test my recipes and maybe beat me at Mario Kart!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
    distance: "5 km",
    work: "Head Chef at Bella Vista",
    school: "Culinary Institute of America",
    interests: ["Cooking", "Gaming", "Wine", "Food", "Travel"],
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: 3,
    name: "Sarah",
    age: 26,
    bio: "Yoga instructor & wellness enthusiast 🧘‍♀️ Believer in good vibes and positive energy. Let's find balance together and explore the city's best healthy spots!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60",
    distance: "2 km",
    work: "Yoga Instructor at Zen Studio",
    school: "UCLA - Health Sciences",
    interests: ["Yoga", "Fitness", "Nature", "Hiking", "Coffee"],
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: 4,
    name: "Michael",
    age: 29,
    bio: "Software engineer who loves building cool stuff 💻 When I'm not coding, you'll find me at concerts or trying new restaurants. Always up for an adventure!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60",
    distance: "4 km",
    work: "Software Engineer at Google",
    school: "MIT - Computer Science",
    interests: ["Technology", "Music", "Food", "Travel", "Concerts"],
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: 5,
    name: "Emma",
    age: 25,
    bio: "Artist & creative soul 🎨 I paint, sketch, and find beauty in everyday moments. Looking for someone who appreciates art and isn't afraid to get a little messy!",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60",
    distance: "6 km",
    work: "Freelance Artist",
    school: "Parsons School of Design",
    interests: ["Art", "Photography", "Museums", "Coffee", "Nature"],
    photos: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: 6,
    name: "Alex",
    age: 28,
    bio: "Fitness trainer & outdoor enthusiast 🏋️ Passionate about helping others reach their goals. Let's hit the gym together or go for a hike!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
    distance: "7 km",
    work: "Personal Trainer at FitLife",
    school: "University of Texas - Kinesiology",
    interests: ["Fitness", "Hiking", "Sports", "Health", "Beach"],
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60"
    ]
  }
];

export default function Home() {
  const [isPremium, setIsPremium] = useState(true); // Set to true for testing

  return (
    <main className="flex flex-col h-screen w-full bg-black overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-purple-900/50 to-black border-b border-purple-500/20 z-10 h-14">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500">
          <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" alt="Me" fill className="object-cover" sizes="40px" />
        </div>
        <h1 className="text-2xl font-bold text-purple-400 tracking-wide">Saturn</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Card Stack - Centered and Responsive */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <CardStack
          profiles={MOCK_PROFILES}
          isPremium={isPremium}
        />
      </div>

      {/* Premium Toggle for Testing */}
      <div className="absolute top-20 right-4 z-50">
        <button
          onClick={() => setIsPremium(!isPremium)}
          className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-black"
        >
          {isPremium ? "Premium ✓" : "Free"}
        </button>
      </div>

      <BottomNav />
    </main>
  );
}
