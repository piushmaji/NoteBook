import { useState } from "react";
import { LayoutGrid, Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateEmail = () => {
        if (!email.trim()) return { email: "Email is required." };
        if (!/\S+@\S+\.\S+/.test(email)) return { email: "Enter a valid email address." };
        return {};
    };

    const validateReset = () => {
        const errs = {};
        if (!password) errs.password = "New password is required.";
        else if (password.length < 8) errs.password = "Must be at least 8 characters.";
        if (!confirm) errs.confirm = "Please confirm your password.";
        else if (password !== confirm) errs.confirm = "Passwords don't match.";
        return errs;
    };

    const handleEmailSubmit = () => {
        const errs = validateEmail();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep("reset"); }, 1500);
    };

    const handleReset = () => {
        const errs = validateReset();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setLoading(true);
        setTimeout(() => { setLoading(false); setDone(true); }, 1500);
    };

    const strength = !password ? 0 : password.length < 6 ? 1 : password.length < 8 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;
    const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"][strength];
    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];

    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white mb-4">
                        <LayoutGrid size={22} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Note Book</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        {done ? "Password updated!" : step === "email" ? "Reset your password" : "Create a new password"}
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

                    {done ? (
                        /* ── Success ── */
                        <div className="flex flex-col items-center text-center gap-4 py-2">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                                <CheckCircle size={28} className="text-green-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 text-sm">Password updated successfully</p>
                                <p className="text-xs text-slate-500 mt-1">You can now sign in with your new password.</p>
                            </div>
                            <button
                                onClick={() => navigate("/login")}
                                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 active:scale-95 transition-all"
                            >
                                Back to Sign In
                                <ArrowRight size={16} />
                            </button>
                        </div>

                    ) : step === "email" ? (
                        /* ── Step 1: Email ── */
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                                    Email address
                                </label>
                                <div className="relative">
                                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => { setEmail(e.target.value); setErrors({}); }}
                                        onKeyDown={e => e.key === "Enter" && handleEmailSubmit()}
                                        placeholder="you@example.com"
                                        className={`h-11 w-full rounded-2xl border bg-slate-50 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:bg-white transition-all ${errors.email
                                                ? "border-red-400 focus:border-red-400 focus:ring-red-500/10"
                                                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                                            }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <button
                                onClick={handleEmailSubmit}
                                disabled={loading}
                                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? (
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                    </svg>
                                ) : (
                                    <>Send Reset Link <ArrowRight size={16} /></>
                                )}
                            </button>

                            <p className="text-center text-sm text-slate-500">
                                Remembered it?{" "}
                                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                    ) : (
                        /* ── Step 2: New Password ── */
                        <div className="space-y-5">

                            {/* Email badge */}
                            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200">
                                <Mail size={13} className="text-slate-400 shrink-0" />
                                <span className="text-xs text-slate-600 truncate">{email}</span>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input
                                        type={showPass ? "text" : "password"}
                                        value={password}
                                        onChange={e => { setPassword(e.target.value); setErrors({}); }}
                                        placeholder="Min. 8 characters"
                                        className={`h-11 w-full rounded-2xl border bg-slate-50 pl-9 pr-10 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:bg-white transition-all ${errors.password
                                                ? "border-red-400 focus:border-red-400 focus:ring-red-500/10"
                                                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                                            }`}
                                    />
                                    <button
                                        onClick={() => setShowPass(v => !v)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>

                                {/* Strength bar */}
                                {password && (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map(i => (
                                                <div
                                                    key={i}
                                                    className="h-1 flex-1 rounded-full transition-all duration-300"
                                                    style={{ background: i <= strength ? strengthColor : "#e2e8f0" }}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs" style={{ color: strength ? strengthColor : "#94a3b8" }}>
                                            {strengthLabel}
                                        </p>
                                    </div>
                                )}
                                {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={confirm}
                                        onChange={e => { setConfirm(e.target.value); setErrors({}); }}
                                        onKeyDown={e => e.key === "Enter" && handleReset()}
                                        placeholder="Re-enter your password"
                                        className={`h-11 w-full rounded-2xl border bg-slate-50 pl-9 pr-10 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:bg-white transition-all ${errors.confirm
                                                ? "border-red-400 focus:border-red-400 focus:ring-red-500/10"
                                                : confirm && password === confirm
                                                    ? "border-green-400 focus:border-green-400 focus:ring-green-500/10"
                                                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                                            }`}
                                    />
                                    <button
                                        onClick={() => setShowConfirm(v => !v)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                {errors.confirm && <p className="mt-1.5 text-xs text-red-500">{errors.confirm}</p>}
                                {confirm && password === confirm && !errors.confirm && (
                                    <p className="mt-1.5 text-xs text-green-500">✓ Passwords match</p>
                                )}
                            </div>

                            <button
                                onClick={handleReset}
                                disabled={loading}
                                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? (
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                    </svg>
                                ) : (
                                    <>Update Password <ArrowRight size={16} /></>
                                )}
                            </button>

                            <button
                                onClick={() => { setStep("email"); setErrors({}); setPassword(""); setConfirm(""); }}
                                className="flex w-full items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                            >
                                <ArrowLeft size={14} /> Back
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;