"use client";

import { useState } from "react";
import CompatibilityForm from "@/components/CompatibilityForm";
import CompatibilityResult from "@/components/CompatibilityResult";
import { getDetailedCompatibility } from "@/lib/compatibility-data";

export default function CompatibilityPage() {
    const [result, setResult] = useState(null);

    const handleCalculate = (sign1, sign2) => {
        const compatibility = getDetailedCompatibility(sign1, sign2);
        setResult(compatibility);
    };

    const handleReset = () => {
        setResult(null);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Zodiac</span>{" "}
                        <span className="gradient-text">Compatibility</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover the cosmic connection between two zodiac signs. Select any
                        two signs to see their compatibility score and detailed analysis.
                    </p>
                </div>

                {/* Form or Result */}
                {result ? (
                    <CompatibilityResult result={result} onReset={handleReset} />
                ) : (
                    <CompatibilityForm onCalculate={handleCalculate} />
                )}

                {/* Info Section */}
                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <span className="text-2xl mr-2">🔥</span> Element Compatibility
                        </h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <span className="text-orange-400 font-semibold">Fire</span>{" "}
                                (Aries, Leo, Sagittarius) → Best with Fire & Air
                            </li>
                            <li>
                                <span className="text-green-400 font-semibold">Earth</span>{" "}
                                (Taurus, Virgo, Capricorn) → Best with Earth & Water
                            </li>
                            <li>
                                <span className="text-blue-400 font-semibold">Air</span>{" "}
                                (Gemini, Libra, Aquarius) → Best with Air & Fire
                            </li>
                            <li>
                                <span className="text-purple-400 font-semibold">Water</span>{" "}
                                (Cancer, Scorpio, Pisces) → Best with Water & Earth
                            </li>
                        </ul>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <span className="text-2xl mr-2">💫</span> How Compatibility Works
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Our compatibility calculator analyzes multiple factors including:
                        </p>
                        <ul className="space-y-2 text-gray-400">
                            <li>• Elemental harmony between signs</li>
                            <li>• Planetary influences and aspects</li>
                            <li>• Communication compatibility</li>
                            <li>• Emotional connection potential</li>
                            <li>• Shared values and life goals</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
