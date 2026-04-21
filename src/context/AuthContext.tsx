import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import { supabase } from "../supabase-client";
import type {User} from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    signInWithGitHub: () => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({data:{session}})=> setUser(session?.user ?? null))

        const {data:listener} = supabase.auth.onAuthStateChange((_,session)=> setUser(session?.user ?? null));
        /*
        * It runs:
        * When the component unmounts (user navigates away from the page)
        */
        return () => {
            listener.subscription.unsubscribe();
        }
        /*
        * Without  this cleanup:
        * The listener would keep running even after the component is gone
        * Memory leak: Your app would accumulate dead listeners over time
        * Multiple listeners: If the component remounts, you'd have duplicate listeners firing the same updates
        * Performance issues: Each listener consumes memory and processing power
        */
    },[])
    const signInWithGitHub = () => {
        supabase.auth.signInWithOAuth({ provider: "github" });
    };

    const signOut = () => {
        supabase.auth.signOut( );
    };

    return (
        <AuthContext.Provider value={{ user, signInWithGitHub, signOut }}>
            {" "}
            {children}{" "}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return context;
};