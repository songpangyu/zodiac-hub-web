import Link from "next/link";
import ZodiacGrid from "@/components/ZodiacGrid";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="hero-title">Discover Your</span>
              <br />
              <span className="text-white">Cosmic Destiny</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
              Explore personalized horoscope readings, zodiac compatibility, and
              connect with a community of astrology enthusiasts
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#zodiac-grid" className="cosmic-btn px-8 py-4 text-lg">
                Explore Your Sign ✨
              </Link>
              <Link
                href="/compatibility"
                className="cosmic-btn-secondary px-8 py-4 text-lg"
              >
                Check Compatibility 💫
              </Link>
            </div>

            {/* Floating Elements */}
            <div className="relative mt-16">
              <div className="flex justify-center items-center gap-8 text-6xl md:text-8xl opacity-80">
                <span className="animate-bounce" style={{ animationDelay: "0s" }}>
                  ♈
                </span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                  ♉
                </span>
                <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                  ♊
                </span>
                <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>
                  ♋
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🌟
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Daily Horoscopes
              </h3>
              <p className="text-gray-400">
                Get personalized daily readings for all 12 zodiac signs with lucky
                numbers and cosmic insights
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                💫
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Compatibility Check
              </h3>
              <p className="text-gray-400">
                Discover the cosmic connection between any two zodiac signs with
                detailed analysis
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                👥
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Community
              </h3>
              <p className="text-gray-400">
                Share your thoughts and connect with fellow astrology enthusiasts
                in our community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zodiac Grid Section */}
      <section id="zodiac-grid">
        <ZodiacGrid />
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Explore the Cosmos?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Sign in with GitHub to unlock personalized features, save your
                favorite horoscopes, and join the cosmic community
              </p>
              <Link href="/encyclopedia" className="cosmic-btn px-8 py-4 text-lg">
                Learn About All Signs 📚
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
