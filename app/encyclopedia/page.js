import { zodiacSigns } from "@/lib/zodiac-data";
import Link from "next/link";

export const metadata = {
    title: "Zodiac Encyclopedia - Zodiac Hub",
    description:
        "Explore comprehensive information about all 12 zodiac signs. Learn about personality traits, strengths, weaknesses, and more.",
};

export default function EncyclopediaPage() {
    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Zodiac</span>{" "}
                        <span className="gradient-text">Encyclopedia</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Dive deep into the mysteries of each zodiac sign. Discover
                        personality traits, elemental influences, and cosmic insights.
                    </p>
                </div>

                {/* Element Introduction */}
                <div className="grid md:grid-cols-4 gap-4 mb-16">
                    {[
                        { name: "Fire", emoji: "🔥", color: "orange", signs: "Aries, Leo, Sagittarius" },
                        { name: "Earth", emoji: "🌍", color: "green", signs: "Taurus, Virgo, Capricorn" },
                        { name: "Air", emoji: "💨", color: "blue", signs: "Gemini, Libra, Aquarius" },
                        { name: "Water", emoji: "💧", color: "purple", signs: "Cancer, Scorpio, Pisces" },
                    ].map((element) => (
                        <div
                            key={element.name}
                            className="glass-card p-4 text-center hover:scale-105 transition-transform"
                        >
                            <span className="text-3xl">{element.emoji}</span>
                            <h3 className="text-lg font-bold text-white mt-2">{element.name}</h3>
                            <p className="text-xs text-gray-400 mt-1">{element.signs}</p>
                        </div>
                    ))}
                </div>

                {/* All Signs */}
                <div className="space-y-12">
                    {zodiacSigns.map((sign, index) => (
                        <div
                            key={sign.name}
                            id={sign.name.toLowerCase()}
                            className="glass-card p-8 relative overflow-hidden"
                        >
                            {/* Background Glow */}
                            <div
                                className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
                                style={{ background: sign.color }}
                            />

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Symbol and Basic Info */}
                                    <div className="md:w-1/3">
                                        <div className="text-center md:text-left">
                                            <span
                                                className="text-8xl md:text-9xl"
                                                style={{ color: sign.color }}
                                            >
                                                {sign.symbol}
                                            </span>
                                            <h2 className="text-3xl font-bold text-white mt-4">
                                                {sign.name}
                                            </h2>
                                            <p className="text-gray-400 text-sm">{sign.dateRange}</p>

                                            <div className="mt-4 space-y-2">
                                                <div className="flex items-center justify-center md:justify-start gap-2">
                                                    <span className="text-gray-500">Element:</span>
                                                    <span className="text-white">{sign.element}</span>
                                                </div>
                                                <div className="flex items-center justify-center md:justify-start gap-2">
                                                    <span className="text-gray-500">Planet:</span>
                                                    <span className="text-white">{sign.rulingPlanet}</span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/horoscope/${sign.name.toLowerCase()}`}
                                                className="cosmic-btn inline-block mt-6 px-6 py-2 text-sm"
                                            >
                                                View Horoscope →
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Description and Traits */}
                                    <div className="md:w-2/3">
                                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                            {sign.description}
                                        </p>

                                        {/* Traits */}
                                        <div className="mb-6">
                                            <h4 className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                                                Key Traits
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {sign.traits.map((trait) => (
                                                    <span
                                                        key={trait}
                                                        className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-sm text-gray-300"
                                                    >
                                                        {trait}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Strengths and Weaknesses */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="text-sm text-green-400 uppercase tracking-wide mb-2">
                                                    Strengths
                                                </h4>
                                                <ul className="space-y-1">
                                                    {sign.strengths.slice(0, 4).map((strength) => (
                                                        <li key={strength} className="text-gray-400 text-sm flex items-center">
                                                            <span className="text-green-400 mr-2">+</span>
                                                            {strength}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-sm text-red-400 uppercase tracking-wide mb-2">
                                                    Weaknesses
                                                </h4>
                                                <ul className="space-y-1">
                                                    {sign.weaknesses.slice(0, 4).map((weakness) => (
                                                        <li key={weakness} className="text-gray-400 text-sm flex items-center">
                                                            <span className="text-red-400 mr-2">−</span>
                                                            {weakness}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Lucky Numbers */}
                                        <div className="mt-6">
                                            <h4 className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                                                Lucky Numbers
                                            </h4>
                                            <div className="flex gap-2">
                                                {sign.luckyNumbers.map((num) => (
                                                    <span
                                                        key={num}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-semibold"
                                                    >
                                                        {num}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Navigation */}
                <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
                    <div className="glass-card p-4">
                        <p className="text-xs text-gray-400 mb-2">Quick Jump</p>
                        <div className="grid grid-cols-4 gap-2">
                            {zodiacSigns.map((sign) => (
                                <a
                                    key={sign.name}
                                    href={`#${sign.name.toLowerCase()}`}
                                    className="text-2xl hover:scale-125 transition-transform"
                                    title={sign.name}
                                >
                                    {sign.symbol}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
