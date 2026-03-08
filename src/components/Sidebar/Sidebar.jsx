import { useState, useEffect } from 'react';
import { LayoutGrid, Star, CheckCircle2, Clock, Settings, LogOut, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Authentication/AuthProvider';

const Sidebar = ({ filter, setFilter }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, handleLogout } = useAuth()

    const isLoggedIn = !!user;
    const email = user?.email;
    const displayName = user?.user_metadata?.name || "User";
    const initials = displayName.split(" ").map(n => n[0]).join("");

    // Close popup on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuOpen && !e.target.closest('.gear-wrapper')) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    const navItems = [
        { icon: Clock, label: "All", value: "all" },
        { icon: Star, label: "Favs", value: "favs" },
        { icon: CheckCircle2, label: "Done", value: "done" },
    ];

    return (
        <>
            <style>{`
                /* ── Desktop popup ── */
                .menu-popup {
                    transform-origin: bottom left;
                    transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.34, 1.4, 0.64, 1);
                }
                .menu-popup.closed {
                    opacity: 0;
                    transform: translateY(8px) scale(0.94);
                    pointer-events: none;
                }
                .menu-popup.open {
                    opacity: 1;
                    transform: translateY(0px) scale(1);
                    pointer-events: all;
                }
                .gear-btn {
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s, color 0.2s;
                }
                .gear-btn.open   { transform: rotate(45deg); }
                .gear-btn.closed { transform: rotate(0deg); }

                /* ── Mobile bottom nav glass effect ── */
                .mobile-nav-bar {
                    background: rgba(255,255,255,0.88);
                    backdrop-filter: blur(24px) saturate(200%);
                    -webkit-backdrop-filter: blur(24px) saturate(200%);
                    border-top: 1px solid rgba(226,232,240,0.6);
                    box-shadow: 0 -4px 24px rgba(99,102,241,0.07), 0 -1px 6px rgba(0,0,0,0.04);
                }

                /* ── Mobile popup ── */
                .mobile-popup {
                    transform-origin: bottom right;
                    transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.45, 0.64, 1);
                }
                .mobile-popup.closed {
                    opacity: 0;
                    transform: translateY(10px) scale(0.95);
                    pointer-events: none;
                }
                .mobile-popup.open {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    pointer-events: all;
                }

                /* Active dot indicator */
                .active-dot {
                    width: 4px; height: 4px;
                    border-radius: 9999px;
                    background: #6366f1;
                    margin: 3px auto 0;
                    transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
                }

                /* Tap highlight off */
                .nav-tap { -webkit-tap-highlight-color: transparent; }
            `}</style>

            {/* DESKTOP SIDEBAR — hidden below lg*/}

            <aside className="fixed left-0 top-0 hidden h-full w-20 flex-col items-center border-r border-slate-200/60 bg-white/40 pb-8 pt-8 backdrop-blur-xl lg:flex">

                {/* Logo */}
                <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                    <LayoutGrid size={24} />
                </div>

                {/* Nav */}
                <nav className="flex flex-1 flex-col gap-8">
                    {navItems.map(({ icon: Icon, label, value }) => (
                        <button key={value} onClick={() => setFilter(value)}
                            className={`group relative flex flex-col items-center gap-1 hover:text-slate-600 ${filter === value ? "text-indigo-600" : "text-slate-400"}`}>
                            <div className={`rounded-xl ${filter === value ? "bg-indigo-50" : ""} p-3 transition-all duration-300 group-hover:bg-slate-100 group-hover:scale-110`}>
                                <Icon size={22} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                        </button>
                    ))}
                </nav>

                {/* Gear + Popup */}
                <div className="gear-wrapper relative flex flex-col items-center">
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        className={`gear-btn rounded-xl p-3 ${menuOpen ? "open bg-indigo-50 text-indigo-600" : "closed text-slate-400 hover:bg-slate-100 hover:text-slate-700"}`}>
                        <Settings size={22} />
                    </button>

                    <div className={`menu-popup ${menuOpen ? "open" : "closed"}`}
                        style={{ position: "fixed", bottom: "72px", left: "88px", width: "210px", zIndex: 9999 }}>
                        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-400/20 overflow-hidden">
                            {isLoggedIn ? (
                                <>
                                    <div className="px-4 pt-4 pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shadow-md shadow-indigo-200/50">
                                                {initials}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-800 truncate leading-tight capitalize">{displayName}</p>
                                                <p className="text-[10px] text-slate-400 truncate mt-0.5">{email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx-3 border-t border-slate-100" />
                                    <div className="p-1.5">
                                        <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all group">
                                            <LogOut size={14} className="shrink-0 group-hover:-translate-x-0.5 transition-transform duration-200" />
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="p-1.5">
                                    <div className="px-3 pt-2.5 pb-1.5">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Not signed in</p>
                                    </div>
                                    <Link to="/registration">
                                        <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-all group">
                                            <LogIn size={14} className="shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
                                            Sign In
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div style={{
                            position: "absolute", left: "-5px", bottom: "18px",
                            transform: "rotate(45deg)", width: "10px", height: "10px",
                            background: "white",
                            borderLeft: "1px solid rgba(226,232,240,0.8)",
                            borderBottom: "1px solid rgba(226,232,240,0.8)",
                        }} />
                    </div>
                </div>
            </aside>


            {/*MOBILE BOTTOM NAV — visible only below lg*/}

            <nav className="mobile-nav-bar lg:hidden fixed bottom-0 left-0 right-0 z-50">
                <div className="flex items-center justify-around px-4 py-2 pb-[max(8px,env(safe-area-inset-bottom))]">

                    {navItems.map(({ icon: Icon, label, value }) => (
                        <button key={value} onClick={() => setFilter(value)}
                            className={`nav-tap flex flex-col items-center gap-0 min-w-14 py-1.5 px-3 rounded-2xl transition-all duration-200 active:scale-95
                                ${filter === value ? "text-indigo-600" : "text-slate-400"}`}>
                            <div className={`p-2 rounded-xl transition-all duration-200 ${filter === value ? "bg-indigo-50" : ""}`}>
                                <Icon size={20} strokeWidth={filter === value ? 2.5 : 1.8} />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest mt-0.5">{label}</span>
                            <div className="active-dot" style={{
                                opacity: filter === value ? 1 : 0,
                                transform: filter === value ? "scale(1)" : "scale(0)"
                            }} />
                        </button>
                    ))}

                    {/* Slim divider */}
                    <div className="h-8 w-px bg-slate-200" />

                    {/* Profile / Settings button */}
                    <div className="gear-wrapper relative">
                        <button
                            onClick={() => setMenuOpen(o => !o)}
                            className={`nav-tap flex flex-col items-center gap-0 min-w-14 py-1.5 px-3 rounded-2xl transition-all duration-200 active:scale-95
                                ${menuOpen ? "text-indigo-600" : "text-slate-400"}`}>
                            {isLoggedIn ? (
                                <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-white text-[11px] font-bold transition-all duration-200
                                    ${menuOpen ? "bg-indigo-600 shadow-lg shadow-indigo-200/70 scale-105" : "bg-indigo-400"}`}>
                                    {initials}
                                </div>
                            ) : (
                                <div className={`p-2 rounded-xl transition-all duration-200 ${menuOpen ? "bg-indigo-50" : ""}`}>
                                    <Settings size={20} strokeWidth={menuOpen ? 2.5 : 1.8} />
                                </div>
                            )}
                            <span className="text-[9px] font-bold uppercase tracking-widest mt-0.5">
                                {isLoggedIn ? "Me" : "Menu"}
                            </span>
                            <div className="active-dot" style={{
                                opacity: menuOpen ? 1 : 0,
                                transform: menuOpen ? "scale(1)" : "scale(0)"
                            }} />
                        </button>

                        {/* Mobile popup card — slides up */}
                        <div
                            className={`mobile-popup ${menuOpen ? "open" : "closed"}`}
                            style={{ position: "fixed", bottom: "80px", right: "12px", width: "215px", zIndex: 9999 }}>

                            <div className="rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-400/20 overflow-hidden">
                                {isLoggedIn ? (
                                    <>
                                        <div className="px-4 pt-4 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-200/60">
                                                    {initials}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-slate-800 truncate leading-tight capitalize">{displayName}</p>
                                                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mx-3 border-t border-slate-100" />
                                        <div className="p-1.5">
                                            <button
                                                onClick={() => { handleLogout(); setMenuOpen(false); }}
                                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-all group active:scale-95">
                                                <LogOut size={14} className="shrink-0 group-hover:-translate-x-0.5 transition-transform duration-200" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-1.5">
                                        <div className="px-3 pt-2.5 pb-1.5">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Not signed in</p>
                                        </div>
                                        <Link to="/registration" onClick={() => setMenuOpen(false)}>
                                            <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-all group active:scale-95">
                                                <LogIn size={14} className="shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
                                                Sign In
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Arrow pointing down toward nav */}
                            <div style={{
                                position: "absolute", right: "30px", bottom: "-5px",
                                transform: "rotate(45deg)", width: "10px", height: "10px",
                                background: "white",
                                borderRight: "1px solid rgba(226,232,240,0.8)",
                                borderBottom: "1px solid rgba(226,232,240,0.8)",
                            }} />
                        </div>
                    </div>

                </div>
            </nav>
        </>
    );
};

export default Sidebar;