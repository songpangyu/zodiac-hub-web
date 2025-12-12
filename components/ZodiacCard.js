import Link from "next/link";

export default function ZodiacCard({ sign }) {
    const { name, symbol, dateRange, element, color } = sign;

    const elementColors = {
        Fire: "from-orange-500 to-red-600",
        Earth: "from-green-500 to-emerald-700",
        Air: "from-blue-400 to-cyan-500",
        Water: "from-indigo-500 to-purple-600",
    };

    return (
        <Link href={`/horoscope/${name.toLowerCase()}`}>
            <div className="zodiac-card glass-card p-6 cursor-pointer group relative overflow-hidden">
                {/* Background Glow */}
                <div
                    className="absolute -inset-1 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                    style={{ background: color }}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Symbol */}
                    <div
                        className="zodiac-symbol text-6xl mb-4 text-center transition-all duration-300"
                        style={{ color: color }}
                    >
                        {symbol}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-center text-white mb-2 group-hover:gradient-text transition-all duration-300">
                        {name}
                    </h3>

                    {/* Date Range */}
                    <p className="text-sm text-gray-400 text-center mb-3">{dateRange}</p>

                    {/* Element Badge */}
                    <div className="flex justify-center">
                        <span
                            className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${elementColors[element]} text-white font-medium`}
                        >
                            {element}
                        </span>
                    </div>
                </div>

                {/* Decorative Stars */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full opacity-60 group-hover:animate-pulse"></div>
                <div className="absolute bottom-4 left-2 w-1 h-1 bg-yellow-400 rounded-full opacity-40 group-hover:animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute top-1/2 right-4 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-50 group-hover:animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
        </Link>
    );
}
