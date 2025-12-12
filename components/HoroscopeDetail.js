"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useUserAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function HoroscopeDetail({ sign, horoscope, signData }) {
    const { user } = useUserAuth();
    const [activeTab, setActiveTab] = useState("daily");
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkBookmark = async () => {
            if (user) {
                const bookmarkRef = doc(db, "users", user.uid, "bookmarks", sign.toLowerCase());
                const bookmarkDoc = await getDoc(bookmarkRef);
                setIsBookmarked(bookmarkDoc.exists());
            }
        };
        checkBookmark();
    }, [user, sign]);

    const handleBookmark = async () => {
        if (!user) {
            alert("Please sign in to bookmark horoscopes");
            return;
        }

        setIsLoading(true);
        try {
            const bookmarkRef = doc(db, "users", user.uid, "bookmarks", sign.toLowerCase());

            if (isBookmarked) {
                await deleteDoc(bookmarkRef);
                setIsBookmarked(false);
            } else {
                await setDoc(bookmarkRef, {
                    sign: sign,
                    signData: signData,
                    horoscope: horoscope?.data?.horoscope_data || "",
                    bookmarkedAt: new Date().toISOString(),
                });
                setIsBookmarked(true);
            }
        } catch (error) {
            console.error("Error bookmarking:", error);
        }
        setIsLoading(false);
    };

    const tabs = [
        { id: "daily", label: "Daily" },
        { id: "weekly", label: "Weekly" },
        { id: "monthly", label: "Monthly" },
    ];

    return (
        <div className="glass-card p-8 relative overflow-hidden">
            {/* Background Constellation */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                    <circle cx="50" cy="50" r="2" fill="white" />
                    <circle cx="150" cy="80" r="2" fill="white" />
                    <circle cx="100" cy="150" r="2" fill="white" />
                    <circle cx="200" cy="120" r="2" fill="white" />
                    <circle cx="300" cy="100" r="2" fill="white" />
                    <circle cx="350" cy="200" r="2" fill="white" />
                    <line x1="50" y1="50" x2="150" y2="80" className="constellation-line" />
                    <line x1="150" y1="80" x2="100" y2="150" className="constellation-line" />
                    <line x1="100" y1="150" x2="200" y2="120" className="constellation-line" />
                    <line x1="200" y1="120" x2="300" y2="100" className="constellation-line" />
                    <line x1="300" y1="100" x2="350" y2="200" className="constellation-line" />
                </svg>
            </div>

            {/* Header */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <span
                        className="text-6xl md:text-7xl"
                        style={{ color: signData?.color }}
                    >
                        {signData?.symbol}
                    </span>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {sign.charAt(0).toUpperCase() + sign.slice(1)}
                        </h1>
                        <p className="text-gray-400">{signData?.dateRange}</p>
                    </div>
                </div>

                {/* Bookmark Button */}
                <button
                    onClick={handleBookmark}
                    disabled={isLoading}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${isBookmarked
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                            : "bg-purple-500/20 text-purple-400 border border-purple-500/50 hover:bg-purple-500/30"
                        }`}
                >
                    <svg
                        className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
                        fill={isBookmarked ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                    <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="relative z-10 flex space-x-2 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Horoscope Content */}
            <div className="relative z-10">
                {activeTab === "daily" && (
                    <div className="space-y-6">
                        <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {horoscope?.data?.horoscope_data ||
                                    "Your horoscope is being written in the stars..."}
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="glass-card p-4 text-center">
                                <p className="text-xs text-gray-400 mb-1">Element</p>
                                <p className="text-lg font-semibold text-white">
                                    {signData?.element}
                                </p>
                            </div>
                            <div className="glass-card p-4 text-center">
                                <p className="text-xs text-gray-400 mb-1">Ruling Planet</p>
                                <p className="text-lg font-semibold text-white">
                                    {signData?.rulingPlanet}
                                </p>
                            </div>
                            <div className="glass-card p-4 text-center">
                                <p className="text-xs text-gray-400 mb-1">Lucky Numbers</p>
                                <p className="text-lg font-semibold text-white">
                                    {signData?.luckyNumbers?.slice(0, 3).join(", ")}
                                </p>
                            </div>
                            <div className="glass-card p-4 text-center">
                                <p className="text-xs text-gray-400 mb-1">Date</p>
                                <p className="text-lg font-semibold text-white">
                                    {format(new Date(), "MMM d, yyyy")}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "weekly" && (
                    <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            This week brings cosmic energy to your {signData?.element} nature.
                            Embrace your {signData?.traits?.[0].toLowerCase()} side and let your
                            {" "}{signData?.rulingPlanet} guide you through new opportunities.
                            Focus on your strengths: {signData?.strengths?.slice(0, 3).join(", ")}.
                        </p>
                    </div>
                )}

                {activeTab === "monthly" && (
                    <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            This month is a time for reflection and growth. As a {sign}, your
                            {" "}{signData?.element} element will help you navigate challenges with
                            grace. Your ruling planet {signData?.rulingPlanet} encourages you to
                            embrace your {signData?.traits?.join(", ").toLowerCase()} qualities.
                        </p>
                    </div>
                )}
            </div>

            {/* Traits Section */}
            <div className="relative z-10 mt-8 pt-8 border-t border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Key Traits</h3>
                <div className="flex flex-wrap gap-2">
                    {signData?.traits?.map((trait, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-sm text-gray-300"
                        >
                            {trait}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
