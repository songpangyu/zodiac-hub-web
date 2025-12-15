"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState(null);

    const gitHubSignIn = async () => {
        
        setError(null);
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            console.error("Error signing in with GitHub:", error);
            
            setError(error.message);
            throw error;
        }
    };

    const firebaseSignOut = async () => {
        try {
            await signOut(auth);
            
            setError(null);
        } catch (error) {
            console.error("Error signing out:", error);
            setError(error.message);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error, 
                gitHubSignIn,
                firebaseSignOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useUserAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useUserAuth must be used within an AuthProvider");
    }
    return context;
}
