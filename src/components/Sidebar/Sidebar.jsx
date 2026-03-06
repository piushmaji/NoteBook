import { useState } from 'react';
import { LayoutGrid, Star, CheckCircle2, Clock, Settings, LogOut, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ filter, setFilter }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const isLoggedIn = false;

    return (
        <>
            <style>{`
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
            `}</style>

            <aside className="fixed left-0 top-0 hidden h-full w-20 flex-col items-center border-r border-slate-200/60 bg-white/40 pb-8 pt-8 backdrop-blur-xl lg:flex">

                {/* Logo */}
                <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                    <LayoutGrid size={24} />
                </div>

                {/* Nav */}
                <nav className="flex flex-1 flex-col gap-8">
                    <button onClick={() => setFilter("all")} className={`group relative flex flex-col items-center gap-1 hover:text-slate-600 ${filter === "all" ? "text-indigo-600" : "text-slate-400"}`}>
                        <div className={`rounded-xl ${filter === "all" ? "bg-indigo-50" : ""} p-3 transition-all duration-300 group-hover:bg-slate-100 group-hover:scale-110`}>
                            <Clock size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">All</span>
                    </button>

                    <button onClick={() => setFilter("favs")} className={`group relative flex flex-col items-center gap-1 hover:text-slate-600 ${filter === "favs" ? "text-indigo-600" : "text-slate-400"}`}>
                        <div className={`rounded-xl ${filter === "favs" ? "bg-indigo-50" : ""} p-3 transition-all duration-300 group-hover:bg-slate-100 group-hover:scale-110`}>
                            <Star size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Favs</span>
                    </button>

                    <button onClick={() => setFilter("done")} className={`group relative flex flex-col items-center gap-1 hover:text-slate-600 ${filter === "done" ? "text-indigo-600" : "text-slate-400"}`}>
                        <div className={`rounded-xl ${filter === "done" ? "bg-indigo-50" : ""} p-3 transition-all duration-300 group-hover:bg-slate-100 group-hover:scale-110`}>
                            <CheckCircle2 size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Done</span>
                    </button>
                </nav>

                {/* ── Gear + Popup ── */}
                <div className="relative flex flex-col items-center">

                    {/* Gear button */}
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        className={`gear-btn rounded-xl p-3 ${menuOpen ? "open bg-indigo-50 text-indigo-600" : "closed text-slate-400 hover:bg-slate-100 hover:text-slate-700"}`}>
                        <Settings size={22} />
                    </button>

                    {/* ── Popup — opens to the RIGHT of sidebar ── */}
                    <div
                        className={`menu-popup ${menuOpen ? "open" : "closed"}`}
                        style={{
                            position: "fixed",
                            bottom: "24px",
                            left: "88px",
                            width: "210px",
                            zIndex: 9999,
                        }}>

                        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-400/20 overflow-hidden">

                            {isLoggedIn ? (
                                <>
                                    {/* Avatar + name + email */}
                                    <div className="px-4 pt-4 pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shadow-md shadow-indigo-200/50">
                                                {initials}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-800 truncate leading-tight capitalize">
                                                    {displayName}
                                                </p>
                                                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                                    {email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="mx-3 border-t border-slate-100" />

                                    {/* Sign out */}
                                    <div className="p-1.5">
                                        <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all group">
                                            <LogOut size={14} className="shrink-0 group-hover:-translate-x-0.5 transition-transform duration-200" />
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                /* Not logged in */
                                <div className="p-1.5">
                                    <div className="px-3 pt-2.5 pb-1.5">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Not signed in</p>
                                    </div>
                                    <Link to="/register"><button
                                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-all group">
                                        <LogIn size={14} className="shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
                                        Sign In
                                    </button></Link>
                                </div>
                            )}
                        </div>

                        {/* Left arrow tip pointing toward the sidebar */}
                        <div style={{
                            position: "absolute",
                            left: "-5px",
                            bottom: "18px",
                            transform: "rotate(45deg)",
                            width: "10px",
                            height: "10px",
                            background: "white",
                            borderLeft: "1px solid rgba(226,232,240,0.8)",
                            borderBottom: "1px solid rgba(226,232,240,0.8)",
                        }} />
                    </div>
                </div>

            </aside>
        </>
    );
};

export default Sidebar;