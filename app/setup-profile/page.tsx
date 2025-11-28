"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Plus, X, AlertCircle } from "lucide-react";

const INTEREST_TAGS = [
    "Travel", "Music", "Sports", "Art", "Photography", "Cooking",
    "Fitness", "Reading", "Movies", "Gaming", "Dancing", "Yoga",
    "Coffee", "Wine", "Hiking", "Beach", "Pets", "Fashion",
    "Technology", "Food", "Nature", "Adventure", "Netflix", "Concerts"
];

export default function SetupProfilePage() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [bio, setBio] = useState("");
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [ageError, setAgeError] = useState("");

    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    const handleBirthdayChange = (value: string) => {
        setBirthday(value);
        setAgeError("");

        if (value) {
            const age = calculateAge(value);
            if (age < 18) {
                setAgeError("You must be at least 18 years old to use Saturn");
            }
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && photos.length < 4) {
            // Mock: In production, upload to server and get URL
            const mockUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60";
            setPhotos([...photos, mockUrl]);
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else if (selectedInterests.length < 5) {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate age
        const age = calculateAge(birthday);
        if (age < 18) {
            setAgeError("You must be at least 18 years old to use Saturn");
            return;
        }

        // Validate at least one photo
        if (photos.length === 0) {
            alert("Please add at least one photo");
            return;
        }

        // Mock save - in production, send to API
        console.log({ name, birthday, bio, selectedInterests, photos });

        // Redirect to quiz or main app
        window.location.href = "/quiz";
    };

    const isFormValid = name && birthday && photos.length > 0 && !ageError;

    return (
        <div className="flex flex-col h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
            {/* Header */}
            <header className="flex-shrink-0 px-4 py-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Set up your profile</h1>
                <p className="text-gray-600">Add photos and basic info to get started</p>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-8">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                    {/* Photos */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Photos (Add at least 1, up to 4)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {photos.map((photo, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-purple-200 shadow-sm"
                                >
                                    <Image src={photo} alt={`Photo ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 200px" />
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(index)}
                                        className="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80"
                                    >
                                        <X size={16} />
                                    </button>
                                    {index === 0 && (
                                        <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                                            Main
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {photos.length < 4 && (
                                <label className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-purple-300 flex flex-col items-center justify-center cursor-pointer hover:border-purple-600 hover:bg-purple-50 transition-all bg-white">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                    />
                                    <Camera size={32} className="text-purple-400 mb-2" />
                                    <span className="text-sm text-purple-600 font-medium">Add Photo</span>
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your first name"
                            className="w-full px-4 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-600 focus:outline-none text-gray-800 bg-white shadow-sm"
                            required
                        />
                    </div>

                    {/* Birthday */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Birthday
                        </label>
                        <input
                            type="date"
                            value={birthday}
                            onChange={(e) => handleBirthdayChange(e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-600 focus:outline-none text-gray-800 bg-white shadow-sm"
                            required
                        />
                        {ageError && (
                            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                <AlertCircle size={16} />
                                <span>{ageError}</span>
                            </div>
                        )}
                        {birthday && !ageError && (
                            <p className="text-sm text-green-600 mt-2">
                                ✓ Age: {calculateAge(birthday)} years old
                            </p>
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            About Me (Optional)
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself..."
                            maxLength={150}
                            className="w-full px-4 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-600 focus:outline-none text-gray-800 bg-white shadow-sm min-h-[100px] resize-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">{bio.length}/150</p>
                    </div>

                    {/* Interests */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Interests (Select up to 5)
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {INTEREST_TAGS.map((interest) => {
                                const isSelected = selectedInterests.includes(interest);
                                const isDisabled = !isSelected && selectedInterests.length >= 5;

                                return (
                                    <button
                                        key={interest}
                                        type="button"
                                        onClick={() => toggleInterest(interest)}
                                        disabled={isDisabled}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
                                            ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                                            : isDisabled
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-white border-2 border-purple-200 text-gray-700 hover:border-purple-600"
                                            }`}
                                    >
                                        {interest}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {selectedInterests.length}/5 selected
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        Continue
                    </button>

                    <p className="text-center text-xs text-gray-500">
                        You must be 18 or older to use Saturn
                    </p>
                </form>
            </div>
        </div>
    );
}
