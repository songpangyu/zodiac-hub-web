"use client";

import { useEffect, useState } from "react";
import { zodiacSigns } from "@/lib/zodiac-data";
import { useUserAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function CompatibilityResult({ result, onReset }) {
    const { user } = useUserAuth();
    const [animatedScore, setAnimatedScore] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const sign1Data = zodiacSigns.find(
        (s) => s.name.toLowerCase() === result.sign1.toLowerCase()
    );
    const sign2Data = zodiacSigns.find(
        (s) => s.name.toLowerCase() === result.sign2.toLowerCase()
    );

    useEffect(() => {
        // Animate score from 0 to actual score
        const duration = 1500;
        const increment = result.score / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= result.score) {
                setAnimatedScore(result.score);
                clearInterval(timer);
            } else {
                setAnimatedScore(Math.floor(current));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [result.score]);

    const handleSaveResult = async () => {
        if (!user) {
            alert("Please sign in to save results");
            return;
        }

        try {
            const resultId = `${result.sign1}-${result.sign2}-${Date.now()}`;
            await setDoc(doc(db, "users", user.uid, "compatibility_history", resultId), {
                sign1: result.sign1,
                sign2: result.sign2,
                score: result.score,
                title: result.title,
                savedAt: new Date().toISOString(),
            });
            setIsSaved(true);
        } catch (error) {
            console.error("Error saving result:", error);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 85) return "#22c55e";
        if (score >= 70) return "#3b82f6";
        if (score >= 55) return "#f59e0b";
        if (score >= 40) return "#f97316";
        return "#ef4444";
    };

    const circumference = 2 * Math.PI * 80;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    return (
        <div className="glass-card p-8 relative overflow-hidden">
            {/* Background Glow */}
            <div
                className="absolute inset-0 opacity-10 blur-3xl"
                style={{
                    background: `radial-gradient(circle at 30% 50%, ${sign1Data?.color}, transparent 50%), 
                       radial-gradient(circle at 70% 50%, ${sign2Data?.color}, transparent 50%)`,
                }}
            />

            <div className="relative z-10">
                {/* Signs Display */}
                <div className="flex items-center justify-center gap-8 mb-8">
                    <div className="text-center">
                        <span
                            className="text-6xl md:text-7xl block mb-2"
                            style={{ color: sign1Data?.color }}
                        >
                            {sign1Data?.symbol}
                        </span>
                        <span className="text-white font-semibold">{result.sign1}</span>
                    </div>

                    {/* Score Circle */}
                    <div className="score-circle">
                        <svg viewBox="0 0 180 180">
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: "#9333ea" }} />
                                    <stop offset="100%" style={{ stopColor: "#3b82f6" }} />
                                </linearGradient>
                            </defs>
                            <circle cx="90" cy="90" r="80" className="bg-circle" />
                            <circle
                                cx="90"
                                cy="90"
                                r="80"
                                stroke={getScoreColor(result.score)}
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                style={{
                                    transition: "stroke-dashoffset 1.5s ease-out",
                                    transform: "rotate(-90deg)",
                                    transformOrigin: "center",
                                }}
                            />
                        </svg>
                        <div className="text-center">
                            <span className="text-4xl font-bold text-white">{animatedScore}%</span>
                            <p className="text-xs text-gray-400">Match</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <span
                            className="text-6xl md:text-7xl block mb-2"
                            style={{ color: sign2Data?.color }}
                        >
                            {sign2Data?.symbol}
                        </span>
                        <span className="text-white font-semibold">{result.sign2}</span>
                    </div>
                </div>

                {/* Result Title */}
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{result.title}</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">{result.description}</p>
                </div>

                {/* Aspects */}
                {result.aspects && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {Object.entries(result.aspects).map(([aspect, value]) => (
                            <div key={aspect} className="text-center">
                                <div className="relative h-2 bg-purple-500/20 rounded-full overflow-hidden mb-2">
                                    <div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                        style={{ width: `${value}%`, transition: "width 1s ease-out" }}
                                    />
                                </div>
                                <p className="text-sm text-gray-400 capitalize">{aspect}</p>
                                <p className="text-white font-semibold">{value}%</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Advice */}
                <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20 mb-8">
                    <h4 className="text-lg font-semibold text-white mb-2">💫 Cosmic Advice</h4>
                    <p className="text-gray-300">{result.advice}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={handleSaveResult}
                        disabled={isSaved || !user}
                        className={`cosmic-btn px-6 py-2 ${isSaved ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isSaved ? "✓ Saved" : "Save Result"}
                    </button>
                    <button onClick={onReset} className="cosmic-btn-secondary px-6 py-2">
                        Try Another Pair
                    </button>
                </div>

                {!user && (
                    <p className="text-center text-gray-400 text-sm mt-4">
                        Sign in to save your compatibility results
                    </p>
                )}
            </div>
        </div>
    );
}
