"use client";

import { useState } from "react";
import { zodiacSigns } from "@/lib/zodiac-data";

export default function CompatibilityForm({ onCalculate }) {
    const [sign1, setSign1] = useState("");
    const [sign2, setSign2] = useState("");
    // [NEW] State for loading simulation
    const [isCalculating, setIsCalculating] = useState(false);

    // [UPDATED] Changed to async function to handle delay
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sign1 && sign2) {
            // [NEW] Start loading simulation
            setIsCalculating(true);
            
            // [NEW] Simulate "Reading the Stars" delay (1.5 seconds)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            onCalculate(sign1, sign2);
            
            // [NEW] Stop loading
            setIsCalculating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card p-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Zodiac <span className="gradient-text">Compatibility</span> Calculator
                </h2>
                <p className="text-gray-400">
                    Discover the cosmic connection between two zodiac signs
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                {/* First Sign */}
                <div className="w-full md:w-auto">
                    <label className="block text-sm text-gray-400 mb-2 text-center">
                        First Sign
                    </label>
                    <select
                        value={sign1}
                        onChange={(e) => setSign1(e.target.value)}
                        className="cosmic-select w-full md:w-48"
                        required
                        disabled={isCalculating} // [UPDATED] Disable input during calculation
                    >
                        <option value="">Select Sign</option>
                        {zodiacSigns.map((sign) => (
                            <option key={sign.name} value={sign.name}>
                                {sign.symbol} {sign.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Heart Icon */}
                <div className="hidden md:flex items-center justify-center">
                    <div className="relative">
                        <span className={`text-4xl transition-transform duration-700 ${isCalculating ? 'animate-pulse scale-125' : ''}`}>
                            💫
                        </span>
                        <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl"></div>
                    </div>
                </div>

                {/* Second Sign */}
                <div className="w-full md:w-auto">
                    <label className="block text-sm text-gray-400 mb-2 text-center">
                        Second Sign
                    </label>
                    <select
                        value={sign2}
                        onChange={(e) => setSign2(e.target.value)}
                        className="cosmic-select w-full md:w-48"
                        required
                        disabled={isCalculating} // [UPDATED] Disable input during calculation
                    >
                        <option value="">Select Sign</option>
                        {zodiacSigns.map((sign) => (
                            <option key={sign.name} value={sign.name}>
                                {sign.symbol} {sign.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Selected Signs Preview */}
            {sign1 && sign2 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                    <div className={`text-center transition-opacity duration-500 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                        <span className="text-5xl" style={{ color: zodiacSigns.find(s => s.name === sign1)?.color }}>
                            {zodiacSigns.find(s => s.name === sign1)?.symbol}
                        </span>
                        <p className="text-sm text-gray-400 mt-1">{sign1}</p>
                    </div>
                    <span className="text-2xl">❤️</span>
                    <div className={`text-center transition-opacity duration-500 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                        <span className="text-5xl" style={{ color: zodiacSigns.find(s => s.name === sign2)?.color }}>
                            {zodiacSigns.find(s => s.name === sign2)?.symbol}
                        </span>
                        <p className="text-sm text-gray-400 mt-1">{sign2}</p>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 text-center">
                <button
                    type="submit"
                    disabled={!sign1 || !sign2 || isCalculating}
                    // [UPDATED] Added dynamic classes for loading state and disabled state
                    className={`cosmic-btn px-8 py-3 text-lg transition-all duration-300 
                        ${(!sign1 || !sign2) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                        ${isCalculating ? 'cursor-wait opacity-90' : ''} 
                    `}
                >
                    {/* [UPDATED] Conditional rendering for button text */}
                    {isCalculating ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">✨</span> Reading the Stars...
                        </span>
                    ) : (
                        "Calculate Compatibility ✨"
                    )}
                </button>
            </div>
        </form>
    );
}
