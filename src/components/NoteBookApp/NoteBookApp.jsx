import { LayoutGrid, Star, Check, CheckCircle2, Maximize2, Plus, Search, Hash, Settings, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import supabase from '../../Helper/Supabase/Supabase';

const NoteBookApp = () => {
    const [filter, setFilter] = useState('all')
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isActive, setIsActive] = useState(false)


    // All the notes are here
    const filterNotes = notes.filter(note => {
        if (filter === 'done') return note.iscompleted;
        if (filter === 'favs') return note.isfavourite;
        return true;
    })

    useEffect(() => {
        fetchTodo()
    }, [])

    // toggle Complete function
    async function toggleComplete(id, currentStatus) {

        const { data, error } = await supabase
            .from("notes")
            .update({ iscompleted: !currentStatus })
            .eq("id", id)
            .select()

        if (error) console.error("Error Message:", error.message);

        setNotes(prev =>
            prev.map(note =>
                note.id == id ? { ...note, iscompleted: !currentStatus } : note)
        )
    }

    // toggle Favourite function
    async function toggleFavourite(id, currentStatus) {
        const { data, error } = await supabase
            .from("notes")
            .update({ isfavourite: !currentStatus })
            .eq("id", id)
            .select()

        if (error) console.error("Error Message:", error.message);

        setNotes(prev =>
            prev.map(note =>
                note.id == id ? { ...note, isfavourite: !currentStatus } : note)
        )
    }

    //fetch Todo section
    async function fetchTodo() {

        const { data, error } = await supabase.from("notes").select("*").order("created_at", { ascending: true })

        if (error) console.error("Error Message:", error.message);
        else {
            setNotes(data)
        }
    }

    //add Todo section
    async function addTodo() {
        if (!title.trim()) return;

        const { data, error } = await supabase
            .from("notes")
            .insert([{ title, description }])
            .select();

        if (error) {
            console.error("Error message:", error.message);
            return;
        }

        setNotes(prev => [...prev, data[0]])
        setTitle("")
        setDescription("")
        fetchTodo()
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
                    <button
                        onClick={() => {
                            setFilter("all")
                        }}
                        className={`group relative flex flex-col items-center gap-1 hover:text-slate-600 ${filter === "all" ? "text-indigo-600" : "text-slate-400"}`}>
                        <div className={`rounded-xl ${filter === "all" ? "bg-indigo-50" : ""} p-3 transition-all duration-300 group-hover:bg-slate-100 group-hover:scale-110`}>
                            <Clock size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">All</span>
                    </button>

                    <button
                        onClick={() => {
                            setFilter("favs")
                        }}
                        className={`group relative flex flex-col items-center gap-1 hover:text-slate-600 ${filter === "favs" ? "text-indigo-600" : "text-slate-400"}`}>
                        <div className={`rounded-xl ${filter === "favs" ? "bg-indigo-50" : ""} p-3 transition-all duration-300 group-hover:bg-slate-100 group-hover:scale-110`}>
                            <Star size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Favs</span>
                    </button>

                    <button
                        onClick={() => {
                            setFilter("done")
                        }}
                        className={`group relative flex flex-col items-center gap-1 hover:text-slate-600 ${filter === "done" ? "text-indigo-600" : "text-slate-400"}`}>
                        <div className={`rounded-xl ${filter === "done" ? "bg-indigo-50" : ""} p-3 transition-all duration-300 group-hover:bg-slate-100 group-hover:scale-110`}>
                            <CheckCircle2 size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Done</span>
                    </button>
                </nav>

                <button className="rounded-xl p-3 text-slate-400 hover:bg-slate-100 transition-all ">
                    <Settings size={22} className='translate duration-300 hover:rotate-45' />
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
                    {filterNotes.map((note) => (

                        <div
                            key={note.id}
                            className={`group relative flex flex-col gap-4 rounded-4xl border p-6 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ring-1 ${note.isfavourite ? "border-rose-200 bg-linear-to-br from-rose-100 via-pink-50 to-white shadow-rose-200/40 ring-rose-200/50" : "border-slate-200 bg-white shadow-slate-200/40 ring-slate-200/50"}`}>

                            <div className="flex items-start justify-between">

                                {/* LEFT BUTTONS */}
                                <div className="flex gap-2">

                                    {/* Favourite Button */}
                                    <button
                                        onClick={() => toggleFavourite(note.id, note.isfavourite)}
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-md transition-all duration-300 ${note.isfavourite
                                            ? "bg-rose-500 text-white shadow-rose-200 scale-105"
                                            : "bg-white text-slate-400 hover:text-rose-500 border border-slate-200"
                                            }`}>
                                        <Star
                                            size={16}
                                            fill={note.isfavourite ? "currentColor" : "none"}
                                        />
                                    </button>

                                    {/* Completed Button */}
                                    <button
                                        onClick={() => toggleComplete(note.id, note.iscompleted)}
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-md transition-all duration-300 ${note.iscompleted ? "bg-emerald-500 text-white shadow-emerald-200 scale-105" : "bg-white text-slate-400 hover:text-emerald-600 border border-slate-200"}`}>
                                        <Check size={16} />
                                    </button>

                                </div>

                                {/* Existing Maximize Button */}
                                <button className="rounded-full bg-white/80 p-2 text-slate-400 opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:text-slate-900 shadow-sm border border-slate-100">
                                    <Maximize2 size={14} />
                                </button>

                            </div>

                            {/* CONTENT */}
                            <div>
                                <h3
                                    className={`text-lg font-bold ${note.iscompleted ? "line-through text-slate-400" : "text-slate-900"
                                        }`}>
                                    {note.title}
                                </h3>
                                <p className={`mt-2 line-clamp-4 text-sm leading-relaxed ${note.iscompleted ? "text-slate-400" : "text-slate-600"
                                    }`}>
                                    {note.description}
                                </p>
                            </div>

                            {/* TAGS */}
                            <div className="mt-4 flex flex-wrap gap-2 pt-2">
                                <span className="flex items-center gap-1 rounded-full bg-amber-100/50 px-3 py-1 text-[11px] font-bold uppercase text-amber-700">
                                    #high-priority
                                </span>
                                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase text-slate-500">
                                    2h left
                                </span>
                            </div>
                        </div>
                    ))}
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