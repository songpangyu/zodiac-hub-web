import { notFound } from "next/navigation";
import { getDailyHoroscope } from "@/lib/api";
import { getZodiacByName } from "@/lib/zodiac-data";
import HoroscopeDetail from "@/components/HoroscopeDetail";
import CommentSection from "@/components/CommentSection";
import Link from "next/link";

export async function generateStaticParams() {
    const signs = [
        "aries", "taurus", "gemini", "cancer",
        "leo", "virgo", "libra", "scorpio",
        "sagittarius", "capricorn", "aquarius", "pisces"
    ];
    return signs.map((sign) => ({ sign }));
}

export async function generateMetadata({ params }) {
    const { sign } = await params;
    const signData = getZodiacByName(sign);

    if (!signData) {
        return { title: "Sign Not Found - Zodiac Hub" };
    }

    return {
        title: `${signData.name} Daily Horoscope - Zodiac Hub`,
        description: `Read today's horoscope for ${signData.name}. ${signData.description.slice(0, 150)}...`,
    };
}

export default async function HoroscopePage({ params }) {
    const { sign } = await params;
    const signData = getZodiacByName(sign);

    if (!signData) {
        notFound();
    }

    let horoscope = null;
    try {
        horoscope = await getDailyHoroscope(signData.name);
    } catch (error) {
        console.error("Error fetching horoscope:", error);
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to All Signs
                </Link>

                {/* Horoscope Detail */}
                <HoroscopeDetail
                    sign={sign}
                    horoscope={horoscope}
                    signData={signData}
                />

                {/* Comment Section */}
                <CommentSection sign={sign} />

                {/* Related Signs */}
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-white mb-4">
                        Related Signs You Might Like
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {getRelatedSigns(signData.element).map((relatedSign) => (
                            <Link
                                key={relatedSign.name}
                                href={`/horoscope/${relatedSign.name.toLowerCase()}`}
                                className="glass-card p-4 text-center hover:scale-105 transition-transform"
                            >
                                <span
                                    className="text-3xl block mb-2"
                                    style={{ color: relatedSign.color }}
                                >
                                    {relatedSign.symbol}
                                </span>
                                <span className="text-sm text-gray-300">{relatedSign.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function getRelatedSigns(element) {
    const { zodiacSigns } = require("@/lib/zodiac-data");
    return zodiacSigns.filter((sign) => sign.element === element).slice(0, 4);
}
