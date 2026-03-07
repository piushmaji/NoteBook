import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../Helper/Supabase/Supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [mode, setMode] = useState("login");
    const [showPass, setShowPass] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const getUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUser(data.user)

        }
        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null)
            }
        )
        return () => listener.subscription.unsubscribe();
    }, [])

    const handleLogin = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return error.message
        navigate('/')
    }

    const handleSubmit = async (email, password, name) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
            email, password,
            options: { data: { name: name.trim() || "User" } }
        })
        setLoading(false)
        if (error) return error.message
        navigate('/')
    }


    const handleLogout = async () => {

        const { error } = await supabase.auth.signOut()
        if (error) return navigate("/login")

    }
    return (
        <AuthContext.Provider value={{ user, handleLogin, handleSubmit, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)