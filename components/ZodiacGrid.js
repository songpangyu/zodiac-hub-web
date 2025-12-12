import ZodiacCard from "./ZodiacCard";
import { zodiacSigns } from "@/lib/zodiac-data";

export default function ZodiacGrid() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Explore Your <span className="gradient-text">Zodiac Sign</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Click on your zodiac sign to discover your daily horoscope, personality
                        traits, and cosmic insights.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {zodiacSigns.map((sign) => (
                        <ZodiacCard key={sign.name} sign={sign} />
                    ))}
                </div>
            </div>
        </section>
    );
}
