import { LayoutGrid, Star, CheckCircle2, Maximize2, Plus, Search, Hash, Settings, Clock } from 'lucide-react';
import { useState } from 'react';
import supabase from '../../Helper/Supabase/Supabase';

const NoteBookApp = () => {

    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isActive, setIsActive] = useState(false)

    async function addTodo() {
        if (!title.trim()) return;

        const { data, error } = await supabase
            .from("notes")
            .insert([{ title, description }])
            .select();

        if (error) {
            console.log("Error message:", error.message);
            return;
        }

        setNotes(prev => [...prev, data[0]])
        setTitle("")
        setDescription("")
        setIsActive(!isActive)
    }

    return (
        <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-700">

            {/* --- SIDEBAR --- */}
            <aside className="fixed left-0 top-0 hidden h-full w-20 flex-col items-center border-r border-slate-200/60 bg-white/40 pb-8 pt-8 backdrop-blur-xl lg:flex">
                <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                    <LayoutGrid size={24} />
                </div>

                <nav className="flex flex-1 flex-col gap-8">
                    <button className="group relative flex flex-col items-center gap-1 text-indigo-600">
                        <div className="rounded-xl bg-indigo-50 p-3 transition-all duration-300 group-hover:scale-110">
                            <Clock size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">All</span>
                    </button>

                    <button className="group relative flex flex-col items-center gap-1 text-slate-400 transition-colors hover:text-slate-600">
                        <div className="rounded-xl p-3 transition-all duration-300 group-hover:bg-slate-100 group-hover:scale-110">
                            <Star size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Favs</span>
                    </button>

                    <button className="group relative flex flex-col items-center gap-1 text-slate-400 transition-colors hover:text-slate-600">
                        <div className="rounded-xl p-3 transition-all duration-300 group-hover:bg-slate-100 group-hover:scale-110">
                            <CheckCircle2 size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Done</span>
                    </button>
                </nav>

                <button className="rounded-xl p-3 text-slate-400 hover:bg-slate-100 transition-all">
                    <Settings size={22} />
                </button>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="ml-0 flex-1 overflow-y-auto p-6 lg:ml-20 lg:p-12">

                {/* Header Section */}
                <header className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Focus Hub</h1>
                        <p className="mt-1 text-slate-500">Simplify your thoughts, execute your vision.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search notes..."
                                className="h-11 w-64 rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                            />
                        </div>
                        <button
                            onClick={() => {
                                setIsActive(!isActive)
                            }}
                            className="flex h-11 items-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.03] active:scale-95">
                            <Plus size={18} />
                            <span>New Entry</span>
                        </button>
                    </div>
                </header>

                {/* --- BENTO GRID MASONRY --- */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {/* HIGH PRIORITY NOTE (Important) */}
                    <div className="group relative flex flex-col gap-4 rounded-4xl border border-amber-100 bg-linear-to-br from-amber-50 to-white p-6 shadow-xl shadow-amber-200/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-200/60 ring-1 ring-amber-200/50">
                        <div className="flex items-start justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-white shadow-md shadow-amber-200">
                                <Star size={16} fill="currentColor" />
                            </div>
                            <button className="rounded-full bg-white/80 p-2 text-slate-400 opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:text-slate-900 shadow-sm border border-slate-100">
                                <Maximize2 size={14} />
                            </button>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Q3 Product Strategy</h3>
                            <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-600">
                                Finalize the roadmap for the upcoming sprint. Focus on user onboarding friction points and the new API integration patterns.
                            </p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 pt-2">
                            <span className="flex items-center gap-1 rounded-full bg-amber-100/50 px-3 py-1 text-[11px] font-bold uppercase text-amber-700">#high-priority</span>
                            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase text-slate-500">2h left</span>
                        </div>
                    </div>

                    {/* STANDARD NOTE */}
                    <div className="group relative flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-300/50">
                        <div className="flex items-start justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                <Hash size={16} />
                            </div>
                            <button className="rounded-full bg-white p-2 text-slate-400 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:text-slate-900 border border-slate-100">
                                <Maximize2 size={14} />
                            </button>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Weekly Grocery List</h3>
                            <ul className="mt-2 space-y-1 text-sm text-slate-600">
                                <li>• Oat milk (Unsweetened)</li>
                                <li>• Avocados</li>
                                <li>• Dark chocolate 85%</li>
                                <li>• Sourdough bread</li>
                            </ul>
                        </div>
                        <div className="mt-auto pt-4 text-[11px] font-medium text-slate-400">Modified 3 mins ago</div>
                    </div>

                    {/* COMPLETED NOTE */}
                    <div className="group relative flex flex-col gap-4 rounded-4xl border border-slate-100 bg-white/60 p-6 opacity-60 transition-all duration-500 hover:opacity-100 grayscale-40 hover:grayscale-0">
                        <div className="flex items-start justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 shadow-inner">
                                <CheckCircle2 size={16} />
                            </div>
                            <button className="rounded-full bg-white p-2 text-slate-400 opacity-0 shadow-sm transition-all group-hover:opacity-100 border border-slate-100">
                                <Maximize2 size={14} />
                            </button>
                        </div>
                        <div className="line-through decoration-emerald-500/50 decoration-2">
                            <h3 className="text-lg font-bold text-slate-400">Design System Audit</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                Check contrast ratios across the new dark mode palette and export SVG assets.
                            </p>
                        </div>
                        <div className="mt-auto flex items-center gap-2 pt-4">
                            <div className="h-1 flex-1 rounded-full bg-emerald-100">
                                <div className="h-full w-full rounded-full bg-emerald-400"></div>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600">DONE</span>
                        </div>
                    </div>

                    {/* REPEATABLE COMPONENT FOR GRID DEPTH */}
                    <div className="group relative flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
                        <div className="flex items-start justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                                <Hash size={16} />
                            </div>
                            <button className="rounded-full bg-white p-2 text-slate-400 opacity-0 shadow-sm transition-all group-hover:opacity-100 border border-slate-100">
                                <Maximize2 size={14} />
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Project Launch Ideas</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            1. Influencer outreach campaign.<br />
                            2. Early bird access for beta testers.<br />
                            3. Product Hunt launch video script.
                        </p>
                    </div>
                </div>
            </main>

            {/* --- FULL SCREEN OVERLAY (MODAL) VISUAL --- */}

            {isActive ? (<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md">
                <div className="w-full max-w-3xl scale-100 rounded-[2.5rem] border border-white/20 bg-white p-10 shadow-2xl shadow-black/20 transition-all">
                    <div className="mb-8 flex items-center justify-between">
                        <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-indigo-600 ring-1 ring-indigo-100">Focus Mode</span>
                        <button className="rounded-full bg-slate-100 p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-900">
                            <Maximize2 size={20} className="rotate-45" />
                        </button>
                    </div>
                    <input
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        value={title}
                        type="text"
                        placeholder='Your Notes Title'
                        className="w-full bg-transparent text-5xl font-black tracking-tight text-slate-900 focus:outline-none"
                    />
                    <textarea
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        value={description}
                        className="mt-6 min-h-75 w-full resize-none bg-transparent text-xl leading-relaxed text-slate-600 focus:outline-none"
                        placeholder="Start typing your vision..."
                    />
                    <footer className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div className="flex gap-4 text-slate-400">
                            <Clock size={20} />
                            <span className="text-sm font-medium">Edited 12 minutes ago</span>
                        </div>
                        <button
                            onClick={addTodo}
                            className="rounded-2xl bg-slate-900 px-8 py-3 font-bold text-white transition-transform active:scale-95">
                            Save Changes
                        </button>
                    </footer>
                </div>
            </div>) : ""}

        </div>
    );
};

export default NoteBookApp;