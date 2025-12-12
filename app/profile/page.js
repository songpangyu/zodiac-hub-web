"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import {
    doc,
    getDoc,
    setDoc,
    collection,
    getDocs,
    deleteDoc,
    query,
    orderBy,
} from "firebase/firestore";
import { zodiacSigns, getZodiacByDate } from "@/lib/zodiac-data";
import Link from "next/link";

export default function ProfilePage() {
    const { user, loading, firebaseSignOut } = useUserAuth();
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [compatibilityHistory, setCompatibilityHistory] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        birthDate: "",
        zodiacSign: "",
    });
    const [activeTab, setActiveTab] = useState("profile");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    const fetchUserData = async () => {
        try {
            // Fetch profile
            const profileRef = doc(db, "users", user.uid, "profile", "data");
            const profileDoc = await getDoc(profileRef);
            if (profileDoc.exists()) {
                setProfile(profileDoc.data());
                setEditForm({
                    birthDate: profileDoc.data().birthDate || "",
                    zodiacSign: profileDoc.data().zodiacSign || "",
                });
            }

            // Fetch bookmarks
            const bookmarksRef = collection(db, "users", user.uid, "bookmarks");
            const bookmarksSnap = await getDocs(bookmarksRef);
            setBookmarks(bookmarksSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

            // Fetch compatibility history
            const historyRef = collection(db, "users", user.uid, "compatibility_history");
            const historyQuery = query(historyRef, orderBy("savedAt", "desc"));
            const historySnap = await getDocs(historyQuery);
            setCompatibilityHistory(
                historySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleSaveProfile = async () => {
        try {
            let zodiacSign = editForm.zodiacSign;

            // Auto-detect zodiac from birth date if provided
            if (editForm.birthDate && !editForm.zodiacSign) {
                const date = new Date(editForm.birthDate);
                const detected = getZodiacByDate(date.getMonth() + 1, date.getDate());
                if (detected) {
                    zodiacSign = detected.name;
                }
            }

            const profileRef = doc(db, "users", user.uid, "profile", "data");
            await setDoc(
                profileRef,
                {
                    birthDate: editForm.birthDate,
                    zodiacSign: zodiacSign,
                    updatedAt: new Date().toISOString(),
                },
                { merge: true }
            );

            setProfile({
                ...profile,
                birthDate: editForm.birthDate,
                zodiacSign: zodiacSign,
            });
            setEditForm({ ...editForm, zodiacSign });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    const handleRemoveBookmark = async (bookmarkId) => {
        try {
            await deleteDoc(doc(db, "users", user.uid, "bookmarks", bookmarkId));
            setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
        } catch (error) {
            console.error("Error removing bookmark:", error);
        }
    };

    const handleDeleteHistory = async (historyId) => {
        try {
            await deleteDoc(doc(db, "users", user.uid, "compatibility_history", historyId));
            setCompatibilityHistory(compatibilityHistory.filter((h) => h.id !== historyId));
        } catch (error) {
            console.error("Error deleting history:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="cosmic-spinner"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const tabs = [
        { id: "profile", label: "Profile", icon: "👤" },
        { id: "bookmarks", label: "Bookmarks", icon: "🔖" },
        { id: "history", label: "History", icon: "📜" },
    ];

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="glass-card p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={user.photoURL || "/default-avatar.png"}
                            alt={user.displayName}
                            className="w-24 h-24 rounded-full border-4 border-purple-500"
                        />
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold text-white">{user.displayName}</h1>
                            <p className="text-gray-400">{user.email}</p>
                            {profile?.zodiacSign && (
                                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                    <span className="text-2xl">
                                        {zodiacSigns.find((s) => s.name === profile.zodiacSign)?.symbol}
                                    </span>
                                    <span className="text-purple-400">{profile.zodiacSign}</span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={firebaseSignOut}
                            className="cosmic-btn-secondary px-6 py-2"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                                    : "glass-card text-gray-400 hover:text-white"
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "profile" && (
                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Your Zodiac Profile</h2>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Birth Date
                                    </label>
                                    <input
                                        type="date"
                                        value={editForm.birthDate}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, birthDate: e.target.value })
                                        }
                                        className="cosmic-input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Zodiac Sign (auto-detected from birth date)
                                    </label>
                                    <select
                                        value={editForm.zodiacSign}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, zodiacSign: e.target.value })
                                        }
                                        className="cosmic-select w-full"
                                    >
                                        <option value="">Auto-detect from birth date</option>
                                        {zodiacSigns.map((sign) => (
                                            <option key={sign.name} value={sign.name}>
                                                {sign.symbol} {sign.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={handleSaveProfile} className="cosmic-btn px-6 py-2">
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="cosmic-btn-secondary px-6 py-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                                        <p className="text-sm text-gray-400 mb-1">Birth Date</p>
                                        <p className="text-white">
                                            {profile?.birthDate || "Not set"}
                                        </p>
                                    </div>
                                    <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                                        <p className="text-sm text-gray-400 mb-1">Zodiac Sign</p>
                                        <p className="text-white flex items-center gap-2">
                                            {profile?.zodiacSign ? (
                                                <>
                                                    <span className="text-2xl">
                                                        {zodiacSigns.find((s) => s.name === profile.zodiacSign)?.symbol}
                                                    </span>
                                                    {profile.zodiacSign}
                                                </>
                                            ) : (
                                                "Not set"
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="cosmic-btn px-6 py-2"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "bookmarks" && (
                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Saved Horoscopes ({bookmarks.length})
                        </h2>
                        {bookmarks.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-400 mb-4">
                                    You haven't bookmarked any horoscopes yet.
                                </p>
                                <Link href="/" className="cosmic-btn px-6 py-2">
                                    Explore Horoscopes
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookmarks.map((bookmark) => (
                                    <div
                                        key={bookmark.id}
                                        className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20"
                                    >
                                        <Link
                                            href={`/horoscope/${bookmark.sign.toLowerCase()}`}
                                            className="flex items-center gap-4 flex-1"
                                        >
                                            <span
                                                className="text-4xl"
                                                style={{ color: bookmark.signData?.color }}
                                            >
                                                {bookmark.signData?.symbol}
                                            </span>
                                            <div>
                                                <p className="text-white font-semibold">{bookmark.sign}</p>
                                                <p className="text-sm text-gray-400 line-clamp-1">
                                                    {bookmark.horoscope?.slice(0, 100)}...
                                                </p>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={() => handleRemoveBookmark(bookmark.id)}
                                            className="text-red-400 hover:text-red-300 p-2"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "history" && (
                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Compatibility History ({compatibilityHistory.length})
                        </h2>
                        {compatibilityHistory.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-400 mb-4">
                                    No compatibility checks saved yet.
                                </p>
                                <Link href="/compatibility" className="cosmic-btn px-6 py-2">
                                    Check Compatibility
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {compatibilityHistory.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-3xl">
                                                    {zodiacSigns.find((s) => s.name === item.sign1)?.symbol}
                                                </span>
                                                <span className="text-gray-400">❤️</span>
                                                <span className="text-3xl">
                                                    {zodiacSigns.find((s) => s.name === item.sign2)?.symbol}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">
                                                    {item.sign1} & {item.sign2}
                                                </p>
                                                <p className="text-sm text-gray-400">{item.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl font-bold text-purple-400">
                                                {item.score}%
                                            </span>
                                            <button
                                                onClick={() => handleDeleteHistory(item.id)}
                                                className="text-red-400 hover:text-red-300 p-2"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
