import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../Helper/Supabase/Supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {

        getCurrentUser()

        const { data: listener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => {
            listener.subscription.unsubscribe()
        }

    }, [])

    //Get current User 
    async function getCurrentUser() {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
            console.error(error.message);
        }

        setUser(data.session?.user ?? null)
        setAuthLoading(false)
    }

    //Login new user and Create New Account

    async function handleSignup({ email, password }) {

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            console.error("Signup error:", error.message)
            return
        }

        navigate("/login");
    }

    //Login Existing User 
    async function handleLogin({ email, password }) {

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            console.error(error.message);
            return;
        }

        navigate("/")

    }

    //LogOut User 
    async function handleLogout() {

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error(error.message);
            return;
        }

        setUser(null);
        navigate("/login")

    }



    return (
        <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout, authLoading }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)