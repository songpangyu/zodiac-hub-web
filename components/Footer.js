import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative mt-20 border-t border-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-3 mb-4">
                            <span className="text-3xl">✨</span>
                            <span className="text-xl font-bold gradient-text">Zodiac Hub</span>
                        </Link>
                        <p className="text-gray-400 text-sm max-w-md">
                            Discover your cosmic destiny with personalized horoscope readings,
                            zodiac compatibility analysis, and connect with a community of
                            astrology enthusiasts.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/compatibility"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Compatibility
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/encyclopedia"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Encyclopedia
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/profile"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Zodiac Signs */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Zodiac Signs</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map(
                                (symbol, index) => (
                                    <span
                                        key={index}
                                        className="text-2xl text-center hover:scale-125 transition-transform cursor-pointer"
                                        title={
                                            [
                                                "Aries",
                                                "Taurus",
                                                "Gemini",
                                                "Cancer",
                                                "Leo",
                                                "Virgo",
                                                "Libra",
                                                "Scorpio",
                                                "Sagittarius",
                                                "Capricorn",
                                                "Aquarius",
                                                "Pisces",
                                            ][index]
                                        }
                                    >
                                        {symbol}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Team Credits */}
                <div className="mt-12 pt-8 border-t border-purple-500/20">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            <p>
                                © {new Date().getFullYear()} Zodiac Hub. All rights reserved.
                            </p>
                        </div>
                        <div className="text-gray-400 text-sm text-center md:text-right">
                            <p className="mb-1">Created by:</p>
                            <p className="text-purple-400">
                                Pangyu Song • Licheng Huang • Mason Wang
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Stars */}
                <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>
        </footer>
    );
}
