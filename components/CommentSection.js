"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import CommentItem from "./CommentItem";

export default function CommentSection({ sign }) {
    const { user } = useUserAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const commentsRef = collection(db, "horoscopes", sign.toLowerCase(), "comments");
        const q = query(commentsRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const commentsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setComments(commentsData);
                setIsLoading(false);
            },
            (error) => {
                console.error("Error fetching comments:", error);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [sign]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;

        setIsSubmitting(true);
        try {
            const commentsRef = collection(db, "horoscopes", sign.toLowerCase(), "comments");
            await addDoc(commentsRef, {
                text: newComment.trim(),
                userId: user.uid,
                userName: user.displayName || "Anonymous",
                userPhoto: user.photoURL || "",
                createdAt: serverTimestamp(),
                likes: [],
            });
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="glass-card p-8 mt-8">
            <h3 className="text-2xl font-bold text-white mb-6">
                💬 Community Discussion
            </h3>

            {/* Comment Form */}
            {user ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex items-start space-x-4">
                        <img
                            src={user.photoURL || "/default-avatar.png"}
                            alt={user.displayName}
                            className="w-10 h-10 rounded-full border-2 border-purple-500"
                        />
                        <div className="flex-1">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Share your thoughts about today's horoscope..."
                                className="cosmic-input w-full min-h-[100px] resize-none"
                                maxLength={500}
                            />
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-400">
                                    {newComment.length}/500 characters
                                </span>
                                <button
                                    type="submit"
                                    disabled={!newComment.trim() || isSubmitting}
                                    className="cosmic-btn px-6 py-2 text-sm disabled:opacity-50"
                                >
                                    {isSubmitting ? "Posting..." : "Post Comment"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="mb-8 p-6 bg-purple-500/10 rounded-xl border border-purple-500/20 text-center">
                    <p className="text-gray-400">
                        Please{" "}
                        <span className="text-purple-400 font-semibold">sign in</span> to
                        join the discussion
                    </p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="cosmic-spinner"></div>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400">
                            No comments yet. Be the first to share your thoughts! ✨
                        </p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            sign={sign}
                            currentUser={user}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
