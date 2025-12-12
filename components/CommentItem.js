"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function CommentItem({ comment, sign, currentUser }) {
    const [isLiked, setIsLiked] = useState(
        comment.likes?.includes(currentUser?.uid) || false
    );
    const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);

    const handleLike = async () => {
        if (!currentUser) {
            alert("Please sign in to like comments");
            return;
        }

        try {
            const commentRef = doc(
                db,
                "horoscopes",
                sign.toLowerCase(),
                "comments",
                comment.id
            );

            if (isLiked) {
                await updateDoc(commentRef, {
                    likes: arrayRemove(currentUser.uid),
                });
                setIsLiked(false);
                setLikeCount((prev) => prev - 1);
            } else {
                await updateDoc(commentRef, {
                    likes: arrayUnion(currentUser.uid),
                });
                setIsLiked(true);
                setLikeCount((prev) => prev + 1);
            }
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    const getTimeAgo = () => {
        if (!comment.createdAt) return "Just now";
        const date = comment.createdAt.toDate ? comment.createdAt.toDate() : new Date(comment.createdAt);
        return formatDistanceToNow(date, { addSuffix: true });
    };

    return (
        <div className="comment-item">
            <div className="flex items-start space-x-3">
                {/* Avatar */}
                <img
                    src={comment.userPhoto || "/default-avatar.png"}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full border-2 border-purple-500/50"
                />

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-white">{comment.userName}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{getTimeAgo()}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{comment.text}</p>

                    {/* Actions */}
                    <div className="flex items-center space-x-4 mt-3">
                        <button
                            onClick={handleLike}
                            className={`like-btn flex items-center space-x-1 text-sm ${isLiked ? "text-red-400" : "text-gray-400 hover:text-red-400"
                                }`}
                        >
                            <svg
                                className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                                fill={isLiked ? "currentColor" : "none"}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <span>{likeCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
