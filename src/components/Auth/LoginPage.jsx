import { useState } from "react";
import { LayoutGrid, Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import supabase from '../../Helper/Supabase/Supabase';

const LoginPage = ({ onLogin }) => {
    const [mode, setMode] = useState("login"); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPass, setShowPass] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isLogin = mode === "login";

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 p-4 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700">

            {/* Soft background blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-rose-100/30 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">

                {/* ── Card ── */}
                <div className="rounded-4xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-200/60 overflow-hidden">

                    {/* Brand header — matches NoteBookApp sidebar logo */}
                    <div className="flex items-center gap-4 border-b border-slate-100 px-8 py-7">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                            <LayoutGrid size={22} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Note Book</h1>
                            <p className="mt-0.5 text-sm text-slate-500">
                                {isLogin ? "Welcome back — sign in to continue." : "Create your free account."}
                            </p>
                        </div>
                    </div>

                    {/* Mode toggle */}
                    <div className="px-8 pt-6">
                        <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1">
                            {["login", "signup"].map(m => (
                                <button
                                    key={m}
                                    onClick={() => { setMode(m); setError(""); }}
                                    className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-200
                                        ${mode === m
                                            ? "bg-white text-slate-900 shadow-sm"
                                            : "text-slate-400 hover:text-slate-600"}`}>
                                    {m === "login" ? "Sign In" : "Sign Up"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Inputs ── */}
                    <div className="flex flex-col gap-4 px-8 py-6">

                        {/* Name — signup only */}
                        {!isLogin && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                                <div className="relative">
                                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-800 placeholder-slate-300 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</label>
                            <div className="relative">
                                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-800 placeholder-slate-300 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</label>
                                {isLogin && (
                                    <button className="text-[11px] font-medium text-slate-400 underline underline-offset-2 hover:text-indigo-600 transition-colors">
                                        Forgot password?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <input
                                    type={showPass ? "text" : "password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-10 text-sm text-slate-800 placeholder-slate-300 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                />
                                <button
                                    onClick={() => setShowPass(p => !p)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Submit — same style as "New Entry" button in NoteBookApp */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !email.trim() || !password.trim()}
                            className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.03] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
                            {loading ? (
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="text-[11px] font-medium text-slate-400">or</span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        {/* Google OAuth */}
                        <button className="flex h-11 w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.01] active:scale-95">
                            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-100 bg-slate-50/50 px-8 py-5 text-center">
                        <p className="text-xs text-slate-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => { setMode(isLogin ? "signup" : "login"); setError(""); }}
                                className="font-bold text-slate-700 underline underline-offset-2 hover:text-indigo-600 transition-colors">
                                {isLogin ? "Sign up free" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Tagline — mirrors NoteBookApp subtitle */}
                <p className="mt-5 text-center text-[11px] font-medium tracking-wide text-slate-400">
                    Simplify your thoughts, execute your vision.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;