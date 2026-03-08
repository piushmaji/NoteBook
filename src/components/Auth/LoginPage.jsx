import { useState } from "react";
import { LayoutGrid, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Authentication/AuthProvider";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const { handleLogin } = useAuth()


    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white mb-4">
                        <LayoutGrid size={22} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Note Book</h1>
                    <p className="mt-1 text-sm text-slate-500">Welcome back, sign in to continue</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Email</label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Password</label>
                            <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type={showPass ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-10 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white transition-all"
                            />
                            <button onClick={() => setShowPass(p => !p)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={() => {
                            handleLogin({ email, password })
                        }}
                        disabled={!email.trim() || !password.trim()}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                        Sign In
                        <ArrowRight size={16} />
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-xs text-slate-400">or</span>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    {/* Google */}
                    <button className="flex h-11 w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all">
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>
                </div>

                <p className="mt-5 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/registration" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                        Sign up free
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;