import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../Helper/Supabase/Supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        setLoading(false)

        if (error) {
            setError(error.message)
            return
        }
        navigate("/")
        setName("")
        setEmail("")
        setPassword("")
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            console.log(error.message)
            return
        }
        navigate('/')
        console.log("Logged in:")
    }


    const handleLogout = async () => {

        const { error } = supabase.auth.signOut()
        if (error) return navigate("/login")

    }
    return (
        <AuthContext.Provider value={{ user, handleLogin, handleSubmit, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)