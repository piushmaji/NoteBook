import { LayoutGrid, Star, Check, CheckCircle2, Maximize2, Plus, Search, Settings, Clock, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import supabase from '../../Helper/Supabase/Supabase';
import Loader from '../Loader/Loader';
import Sidebar from '../Sidebar/Sidebar';
import { format } from "timeago.js"

import { useAuth } from '../../context/Authentication/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';


import toast from 'react-hot-toast';

const PRIORITIES = [
    { label: "High", value: "high", color: "bg-red-500 text-white shadow-red-200", dot: "bg-red-400" },
    { label: "Medium", value: "medium", color: "bg-amber-400 text-white shadow-amber-200", dot: "bg-amber-400" },
    { label: "Low", value: "low", color: "bg-emerald-500 text-white shadow-emerald-200", dot: "bg-emerald-400" },
];

const priorityTagStyles = {
    high: "bg-red-100/60 text-red-700",
    medium: "bg-amber-100/50 text-amber-700",
    low: "bg-emerald-100/50 text-emerald-700",
};

const NoteBookApp = () => {
    const [filter, setFilter] = useState('all')
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [priority, setPriority] = useState("medium")

    const [editingNote, setEditingNote] = useState(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { user, authLoading } = useAuth()


    function timeAgo(date) {
        return format(date)
    }

    const filterNotes = notes
        .filter((note) => note && (filter === "all" || (filter === "favs" ? note.isfavourite : filter === "done" ? note.iscompleted : true)))
        .filter((note) =>
            note.title?.toLowerCase().includes(search.toLowerCase()) ||
            note.description?.toLowerCase().includes(search.toLowerCase())
        )


    useEffect(() => {

        if (user) {
            fetchNotes();
        }
    }, [user])

    useEffect(() => {

        if (!authLoading && !user) {
            navigate("/login")
        }

    }, [user, authLoading])

    //fetching notes
    async function fetchNotes() {

        setLoading(true)

        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })

        if (error) {
            toast.error(error.message)
            return;
        } else {
            setNotes(data);
        }

        setLoading(false)

    }


    //Save and edit all notes
    async function saveNote() {

        if (!title.trim()) return;

        if (editingNote) {
            const { error } = await supabase
                .from("notes")
                .update({ title, description, priority })
                .eq("user_id", user.id)
                .eq("id", editingNote.id)

            setTimeout(() => toast.success("Note updated successfully!"), 500);

            if (error) {
                toast.error(error.message);
            }

        } else {
            const { error } = await supabase
                .from("notes")
                .insert([{ title, description, priority, user_id: user.id }])

            setTimeout(() => toast.success("Note saved successfully!"), 500);

            if (error) {
                toast.error(error.message);
            }
        }

        setTitle("")
        setDescription("")
        setPriority("medium")
        setIsActive(false)
        setEditingNote(null)
        fetchNotes()
    }


    //Delete notes
    async function deleteNote(id) {

        const { error } = await supabase
            .from("notes")
            .delete()
            .eq("user_id", user.id)
            .eq("id", id)

        setTimeout(() => toast.success("Note deleted successfully!"), 500);
        if (error) toast.error(error.message)
        fetchNotes()
    }


    //toggle favourite notes
    async function toggleFavourite(id, currentStatus) {
        const { error } = await supabase
            .from("notes")
            .update({ isfavourite: !currentStatus })
            .eq("id", id)
            .eq("user_id", user.id)

        if (error) {
            toast.error(error.message)
            return
        }

        setNotes(notes.map(note =>
            note.id === id ? { ...note, isfavourite: !currentStatus } : note
        ))

    }


    //toggle Complete notes
    async function toggleComplete(id, currentStatus) {

        const { error } = await supabase
            .from("notes")
            .update({ iscompleted: !currentStatus })
            .eq("id", id)
            .eq("user_id", user.id)

        if (error) {
            toast.error(error.message)
            return;
        }

        setNotes(notes.map(note => (
            note.id === id ? { ...note, iscompleted: !currentStatus } : note
        )))

    }

    //Open notes for seen in full with
    const openNote = (note) => {
        setIsActive(true)
        setEditingNote(note)
        setTitle(note.title)
        setDescription(note.description)
        setPriority(note.priority)
    }

    if (authLoading) return (<Loader />)
    if (loading) return (<Loader />)

    return (
        <div className="relative flex h-screen w-full bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-700">

            {/* --- SIDEBAR --- */}
            <div className='absolute z-50'>
                <Sidebar filter={filter} setFilter={setFilter} />
            </div>
            {/* --- MAIN CONTENT AREA --- */}
            <main className="ml-0 flex-1 overflow-y-auto p-6 lg:ml-20 lg:p-12">
                <header className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Note Book</h1>
                        <p className="mt-1 text-slate-500">Simplify your thoughts, execute your vision.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search notes..."
                                className="h-11 w-64 rounded-2xl border border-slate-200 bg-white pl-10 pr-9 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        <button onClick={() => setIsActive(!isActive)}
                            className="flex h-11 items-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.03] active:scale-95">
                            <Plus size={18} /><span>New Entry</span>
                        </button>
                    </div>
                </header>

                {/* --- GRID --- */}
                {filterNotes.length === 0 ? (
                    <div className="flex h-[60vh] flex-col items-center justify-center text-center">

                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 shadow-inner ">
                            <LayoutGrid size={36} />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-slate-800">
                            No notes yet
                        </h2>

                        <p className="mt-2 max-w-sm text-sm text-slate-500">
                            Capture your ideas, tasks, or reminders. Start by creating your first note.
                        </p>

                        <button
                            onClick={() => setIsActive(true)}
                            className="mt-6 flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                        >
                            <Plus size={18} />
                            Create First Note
                        </button>

                    </div>
                ) : (<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filterNotes.map((note) => (
                        <div key={note.id}
                            className={`group relative flex flex-col gap-4 rounded-3xl p-6  border  bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${note.isfavourite
                                ? "ring-2 ring-rose-300/60 bg-linear-to-br from-rose-100 via-pink-50 to-white border-rose-200/50"
                                : "border-slate-400/60"
                                }`}>

                            < div className="flex items-start justify-between" >
                                {/* LEFT BUTTONS */}
                                <div className="flex gap-2" >
                                    <button onClick={() => toggleFavourite(note.id, note.isfavourite)}
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-md transition-all duration-300 ${note.isfavourite ? "bg-rose-500 text-white shadow-rose-200 scale-105" : "bg-white text-slate-400 hover:text-rose-500 border border-slate-200"}`}>
                                        <Star size={16} fill={note.isfavourite ? "currentColor" : "none"} />
                                    </button>
                                    <button onClick={() => toggleComplete(note.id, note.iscompleted)}
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-md transition-all duration-300 ${note.iscompleted ? "bg-emerald-500 text-white shadow-emerald-200 scale-105" : "bg-white text-slate-400 hover:text-emerald-600 border border-slate-200"}`}>
                                        <Check size={16} />
                                    </button>
                                </div>

                                {/* RIGHT BUTTONS */}
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => openNote(note)}
                                        className="rounded-full bg-white/80 p-2 text-slate-400 opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:text-slate-900 shadow-sm border border-slate-100">
                                        <Maximize2 size={14} />
                                    </button>

                                    {/* DELETE BUTTON */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteNote(note.id)
                                        }
                                        }
                                        title="Delete note"
                                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-transparent bg-white/80 text-slate-300 opacity-0 group-hover:opacity-100 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 hover:shadow-md hover:shadow-red-100 hover:scale-110 active:scale-95">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div>
                                <h3 className={`text-lg font-bold ${note.iscompleted ? "line-through text-slate-400" : "text-slate-900"}`}>
                                    {note.title}
                                </h3>
                                <p className={`mt-2 line-clamp-4 text-sm leading-relaxed ${note.iscompleted ? "text-slate-400" : "text-slate-600"}`}>
                                    {note.description}
                                </p>
                            </div>

                            {/* TAGS */}
                            <div className="mt-auto flex flex-wrap gap-2 pt-4 ">
                                <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase ${priorityTagStyles[note.priority] ?? priorityTagStyles.medium}`}>
                                    #{note.priority ?? "medium"}
                                </span>
                                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase text-slate-500">
                                    {timeAgo(note.created_at)}
                                </span>
                            </div>
                        </div >
                    ))}
                </div >)}
            </main >

            {/* --- MODAL --- */}
            {
                isActive && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md">
                        <div className="w-full max-w-3xl scale-100 rounded-[2.5rem] border border-white/20 bg-white p-10 shadow-2xl shadow-black/20 transition-all">
                            <div className="mb-8 flex items-center justify-between">
                                <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-indigo-600 ring-1 ring-indigo-100">Focus Mode</span>
                                <button
                                    onClick={() => setIsActive(false)}
                                    className="rounded-full bg-slate-100 p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-900">
                                    <X size={20} />
                                </button>
                            </div>

                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                type="text"
                                placeholder='Your Notes Title'
                                className="w-full bg-transparent text-5xl font-black tracking-tight text-slate-900 focus:outline-none"
                            />
                            <textarea
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                className="mt-6 min-h-75 w-full resize-none bg-transparent text-xl leading-relaxed text-slate-600 focus:outline-none"
                                placeholder="Start typing your vision..."
                            />

                            {/* --- PRIORITY SELECTOR --- */}
                            <div className="mt-6 flex flex-col gap-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Priority</span>
                                <div className="flex gap-2">
                                    {PRIORITIES.map((p) => (
                                        <button
                                            key={p.value}
                                            onClick={() => setPriority(p.value)}
                                            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold shadow-md transition-all duration-200 hover:scale-105 active:scale-95
                                            ${priority === p.value
                                                    ? `${p.color} shadow-md scale-105`
                                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 shadow-none"
                                                }`}>
                                            <span className={`h-2 w-2 rounded-full ${priority === p.value ? "bg-white/70" : p.dot}`} />
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <footer className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                                <div className="flex gap-4 text-slate-400">
                                    <Clock size={20} />
                                    <span className="text-sm font-medium">Edited {timeAgo(editingNote?.created_at)} ago</span>
                                </div>
                                <button onClick={saveNote}
                                    className="rounded-2xl bg-slate-900 px-8 py-3 font-bold text-white transition-transform active:scale-95">
                                    {editingNote ? "Update" : "Save Changes"}
                                </button>
                            </footer>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default NoteBookApp;