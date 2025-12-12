import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zodiac Hub - Your Cosmic Companion",
  description:
    "Discover your daily horoscope, zodiac compatibility, and connect with astrology enthusiasts. Explore the cosmic mysteries of all 12 zodiac signs.",
  keywords:
    "zodiac, horoscope, astrology, compatibility, star signs, daily horoscope",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <AuthProvider>
          {/* Starfield Background */}
          <div className="starfield">
            <div className="nebula"></div>
            <div className="stars"></div>
            <div className="stars-2"></div>
            <div className="stars-3"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-24">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
