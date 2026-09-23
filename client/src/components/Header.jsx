import { Link } from "react-router-dom"

export function Header({setDisplayMode}){
    return (
        <header className="shrink-0 h-[10%] border-b-2 border-slate-600 flex justify-between items-center">
            <button 
                className="h-full p-5 text-center text-2xl text-white ml-10 hover:cursor-pointer"
            >
            <Link to="/">🌍 A T L A S</Link>
            </button>

            <div className="flex justify-center items-center gap-8 mr-20">
                <button
                    onClick={() => setDisplayMode("cards")}
                    className="h-full bg-slate-800 p-3 text-white rounded-md text-lg font-semibold 
                    hover:bg-slate-800 hover:cursor-pointer hover:scale-105 hover:bg-slate-900
                    tracking-widest"
                >
                    <Link to="/comparison">🃏 Cards</Link>
                </button>
                <button
                    onClick={() => setDisplayMode("table")}
                    className="h-full bg-slate-800 p-3 text-white rounded-md text-lg font-semibold 
                    hover:bg-slate-800 hover:cursor-pointer hover:scale-105 hover:bg-slate-900
                    tracking-widest"
                >
                    <Link to="/comparison">📋 Table</Link>
                </button>
                <button
                    onClick={() => setDisplayMode("insights")}
                    className="h-full bg-slate-800 p-3 text-white rounded-md text-lg font-semibold 
                    hover:bg-slate-800 hover:cursor-pointer hover:scale-105 hover:bg-slate-900
                    tracking-widest"
                >
                    <Link to="/comparison">📊 Insights</Link>
                </button>
                <button
                    className="h-full bg-slate-800 p-3 text-white rounded-md text-lg font-semibold 
                    hover:bg-slate-800 hover:cursor-pointer hover:scale-105 hover:bg-slate-900
                    tracking-widest"
                >
                    <Link to="/explore">📊 Map (Beta)</Link>
                </button>
            </div>
        </header>
    )
}