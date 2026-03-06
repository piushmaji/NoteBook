const SkeletonCard = ({ favourite = false }) => (
    <div className={`flex flex-col gap-4 rounded-3xl border p-6 shadow-sm
        ${favourite
            ? "border-rose-200/60 bg-linear-to-br from-rose-50 via-pink-50 to-white"
            : "border-slate-200/80 bg-white"
        }`}>

        {/* Top row — star + check buttons */}
        <div className="flex items-center justify-between">
            <div className="flex gap-2">
                <div className={`h-8 w-8 rounded-lg shimmer ${favourite ? "bg-rose-100" : "bg-slate-100"}`} />
                <div className="h-8 w-8 rounded-lg shimmer bg-slate-100" />
            </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2 mt-1">
            <div className="h-5 w-2/3 rounded-full shimmer bg-slate-200" />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
            <div className="h-3.5 w-full rounded-full shimmer bg-slate-100" />
            <div className="h-3.5 w-4/5 rounded-full shimmer bg-slate-100" />
        </div>

        {/* Tags row */}
        <div className="flex gap-2 pt-3 mt-auto">
            <div className={`h-6 w-16 rounded-full shimmer ${favourite ? "bg-rose-100" : "bg-slate-100"}`} />
            <div className="h-6 w-24 rounded-full shimmer bg-slate-100" />
        </div>
    </div>
);

const Loader = () => {
    return (
        <div className="flex h-screen w-full bg-slate-50 font-sans antialiased overflow-hidden">

            {/* ── Sidebar skeleton — matches exact sidebar in screenshot ── */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-full w-17 flex-col items-center border-r border-slate-200/60 bg-white/60 backdrop-blur-xl pb-8 pt-7 gap-0">

                {/* Logo square */}
                <div className="h-11 w-11 rounded-2xl shimmer bg-indigo-200 mb-10" />

                {/* Nav items — All, Favs, Done */}
                <div className="flex flex-col gap-7 flex-1 items-center">
                    {/* "All" — active state with indigo tint */}
                    <div className="flex flex-col items-center gap-1.5">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 shimmer" />
                        <div className="h-2 w-5 rounded-full shimmer bg-indigo-100" />
                    </div>
                    {[1, 2].map(i => (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                            <div className="h-10 w-10 rounded-xl shimmer bg-slate-100" />
                            <div className="h-2 w-5 rounded-full shimmer bg-slate-100" />
                        </div>
                    ))}
                </div>

                {/* Settings */}
                <div className="h-9 w-9 rounded-xl shimmer bg-slate-100" />
            </aside>

            {/* ── Main content ── */}
            <main className="ml-0 lg:ml-17 flex-1 overflow-y-auto p-6 lg:px-10 lg:py-8">

                {/* Header skeleton — matches "Note Book" title + search + button */}
                <header className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex flex-col gap-2.5">
                        <div className="h-9 w-40 rounded-2xl shimmer bg-slate-300" />
                        <div className="h-3.5 w-72 rounded-full shimmer bg-slate-200" />
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search bar */}
                        <div className="h-11 w-56 rounded-full shimmer bg-white border border-slate-200 shadow-sm" />
                        {/* New Entry button */}
                        <div className="h-11 w-32 rounded-2xl shimmer bg-slate-800/80" />
                    </div>
                </header>

                {/* ── Card grid — 4 columns matching screenshot exactly ── */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {/* Row 1 — matches screenshot: normal, fav, fav, normal */}
                    <SkeletonCard />
                    <SkeletonCard favourite />
                    <SkeletonCard favourite />
                    <SkeletonCard />

                    {/* Row 2 — all normal */}
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />

                    {/* Row 3 — partial, matches screenshot bottom */}
                    <SkeletonCard />
                    <SkeletonCard favourite />
                </div>
            </main>

            {/* Shimmer animation */}
            <style>{`
                @keyframes shimmer {
                    0%   { opacity: 1; }
                    50%  { opacity: 0.5; }
                    100% { opacity: 1; }
                }
                .shimmer {
                    animation: shimmer 1.6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Loader;