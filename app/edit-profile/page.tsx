"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, X, Plus, AlertTriangle } from "lucide-react";

const INTEREST_TAGS = [
    "Travel", "Music", "Sports", "Art", "Photography", "Cooking",
    "Fitness", "Reading", "Movies", "Gaming", "Dancing", "Yoga",
    "Coffee", "Wine", "Hiking", "Beach", "Pets", "Fashion",
    "Technology", "Food", "Nature", "Adventure", "Netflix", "Concerts"
];

export default function EditProfilePage() {
    const [name, setName] = useState("John");
    const [age, setAge] = useState("28");
    const [bio, setBio] = useState("Software Engineer who loves to travel and explore new places.");
    const [work, setWork] = useState("Software Engineer at TechCorp");
    const [school, setSchool] = useState("MIT - Computer Science");
    const [selectedInterests, setSelectedInterests] = useState<string[]>(["Travel", "Technology", "Coffee"]);
    const [allowPhotoSharing, setAllowPhotoSharing] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [photos, setPhotos] = useState([
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60",
    ]);

    // Discovery Settings
    const [ageRange, setAgeRange] = useState({ min: 18, max: 35 });
    const [distance, setDistance] = useState(50);
    const [location, setLocation] = useState("New York, NY");

    // Track if form has been modified
    const [isModified, setIsModified] = useState(false);

    // Validation state
    const [isValid, setIsValid] = useState(true);

    // Mark form as modified when any field changes
    useEffect(() => {
        setIsModified(true);
    }, [name, age, bio, work, school, selectedInterests, photos, allowPhotoSharing, ageRange, distance, location]);

    // Validate form
    useEffect(() => {
        const nameValid = name.trim().length > 0;
        const ageValid = parseInt(age) >= 18;
        const ageRangeValid = ageRange.min <= ageRange.max && ageRange.min >= 18;
        const locationValid = location.trim().length > 0;

        setIsValid(nameValid && ageValid && ageRangeValid && locationValid);
    }, [name, age, ageRange, location]);

    const handleMinAgeChange = (value: number) => {
        const newMin = Math.max(18, value);
        if (newMin <= ageRange.max) {
            setAgeRange({ ...ageRange, min: newMin });
        }
    };

    const handleMaxAgeChange = (value: number) => {
        const newMax = Math.max(18, value);
        if (newMax >= ageRange.min) {
            setAgeRange({ ...ageRange, max: newMax });
        }
    };

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else if (selectedInterests.length < 5) {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && photos.length < 6) {
            const mockUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60";
            setPhotos([...photos, mockUrl]);
        }
    };

    const removePhoto = (index: number) => {
        if (photos.length > 1) {
            setPhotos(photos.filter((_, i) => i !== index));
        }
    };

    const handlePhotoSharingToggle = (checked: boolean) => {
        if (checked) {
            setShowWarningModal(true);
        } else {
            setAllowPhotoSharing(false);
        }
    };

    const confirmPhotoSharing = () => {
        setAllowPhotoSharing(true);
        setShowWarningModal(false);
    };

    const handleSave = () => {
        if (!isValid) return;

        console.log({
            name,
            age,
            bio,
            work,
            school,
            selectedInterests,
            photos,
            allowPhotoSharing,
            ageRange,
            distance,
            location
        });
        setIsModified(false);
        alert("Profile updated successfully!");
    };

    return (
        <div className="flex flex-col h-screen w-full bg-black text-white overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-black flex-shrink-0">
                <Link href="/profile" className="text-purple-400 hover:text-purple-300">
                    <ChevronLeft size={28} />
                </Link>
                <h1 className="text-xl font-bold text-white">Edit Profile</h1>
                <button
                    onClick={handleSave}
                    disabled={!isModified || !isValid}
                    className={`text-purple-400 font-semibold transition-all ${isModified && isValid
                        ? 'hover:text-purple-300 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                        }`}
                >
                    Save
                </button>
            </header>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 pb-20">
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Profile Photo - Circular and Centered */}
                    <div className="flex flex-col items-center gap-4 py-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                            <Image
                                src={photos[0]}
                                alt="Profile"
                                fill
                                className="object-cover"
                                sizes="128px"
                                priority
                            />
                        </div>
                        <p className="text-sm text-purple-300">Main Profile Photo</p>
                    </div>

                    {/* Photos Grid - Responsive */}
                    <div>
                        <label className="block text-sm font-semibold text-purple-300 mb-2">
                            Photos ({photos.length}/6)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {photos.map((photo, index) => (
                                <div key={index} className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-sm">
                                    <Image src={photo} alt={`Photo ${index + 1}`} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 200px" />
                                    {photos.length > 1 && (
                                        <button
                                            onClick={() => removePhoto(index)}
                                            className="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                    {index === 0 && (
                                        <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                                            Main
                                        </div>
                                    )}
                                </div>
                            ))}

                            {photos.length < 6 && (
                                <label className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-purple-500/50 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition-all">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                    />
                                    <Plus size={32} className="text-purple-400 mb-2" />
                                    <span className="text-sm text-purple-300">Add Photo</span>
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-white">Personal Info</h2>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">Age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-none"
                                maxLength={150}
                            />
                            <p className="text-xs text-purple-300/50 mt-1">{bio.length}/150</p>
                        </div>

                        {/* Work */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">Work (Optional)</label>
                            <input
                                type="text"
                                value={work}
                                onChange={(e) => setWork(e.target.value)}
                                placeholder="e.g. Software Engineer at Google"
                                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-purple-500/30 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* School */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">School (Optional)</label>
                            <input
                                type="text"
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                                placeholder="e.g. Stanford University"
                                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-purple-500/30 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    {/* Photo Sharing Setting */}
                    <div className="bg-purple-900/30 border border-purple-500/30 rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-white">Allow Photo Sharing</h3>
                                <p className="text-sm text-purple-300">Let matches send you photos in chat</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={allowPhotoSharing}
                                    onChange={(e) => handlePhotoSharingToggle(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* Discovery Settings */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-white">Discovery Settings</h2>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">
                                Location {location.trim().length === 0 && <span className="text-red-400">*Required</span>}
                            </label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g. New York, NY"
                                className={`w-full px-4 py-3 rounded-xl bg-gray-900 border ${location.trim().length === 0 ? 'border-red-500' : 'border-purple-500/30'
                                    } text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            />
                        </div>

                        {/* Age Range */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-semibold text-purple-300">Age Range</label>
                                <span className="text-purple-300 text-sm">{ageRange.min} - {ageRange.max}</span>
                            </div>

                            <div className="space-y-4">
                                {/* Min Age Slider */}
                                <div>
                                    <label className="text-xs text-purple-300 mb-2 block">Minimum Age: {ageRange.min}</label>
                                    <input
                                        type="range"
                                        min="18"
                                        max={ageRange.max}
                                        value={ageRange.min}
                                        onChange={(e) => handleMinAgeChange(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                    />
                                </div>

                                {/* Max Age Slider */}
                                <div>
                                    <label className="text-xs text-purple-300 mb-2 block">Maximum Age: {ageRange.max}</label>
                                    <input
                                        type="range"
                                        min={ageRange.min}
                                        max="99"
                                        value={ageRange.max}
                                        onChange={(e) => handleMaxAgeChange(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Distance */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-semibold text-purple-300">Maximum Distance</label>
                                <span className="text-purple-300 text-sm">{distance} km</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={distance}
                                onChange={(e) => setDistance(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                            <div className="flex justify-between text-xs text-purple-300/60 mt-1">
                                <span>1 km</span>
                                <span>100 km</span>
                            </div>
                        </div>
                    </div>

                    {/* Interests */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Interests</h3>
                        <p className="text-sm text-purple-300 mb-3">Select up to 5 interests</p>
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
                                                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                                : "bg-gray-900 border border-purple-500/30 text-purple-300 hover:border-purple-500"
                                            }`}
                                    >
                                        {interest}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-xs text-purple-300/50 mt-3">
                            {selectedInterests.length}/5 selected
                        </p>
                    </div>
                </div>
            </div>

            {/* Photo Sharing Warning Modal */}
            {showWarningModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                <AlertTriangle size={24} className="text-yellow-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Enable Photo Sharing?</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            By enabling photo sharing, you allow matches to send you photos in chat. Make sure you're comfortable with this before proceeding.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowWarningModal(false)}
                                className="flex-1 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmPhotoSharing}
                                className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
                            >
                                Enable
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
