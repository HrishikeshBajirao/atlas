import { Link } from "react-router-dom"

export function Header({setDisplayMode}){
    return (
        <header className="shrink-0 h-[10%] border-b-2 border-slate-600 flex justify-between items-center">
            <Link to="/"><button 
                className="h-full p-5 text-center text-2xl text-white ml-10 hover:cursor-pointer"
            >
            🌍 A T L A S
            </button></Link>

            <div className="flex justify-center items-center gap-8 mr-20">
                <Link to="/comparison"><button
                    onClick={() => setDisplayMode("cards")}
                    className="h-full bg-slate-800 p-3 text-white rounded-md text-lg font-semibold 
                    hover:bg-slate-800 hover:cursor-pointer hover:scale-105 hover:bg-slate-900
                    tracking-widest"
                >
                    🃏 Cards
                </button></Link>
                <Link to="/comparison"><button
                    onClick={() => setDisplayMode("table")}
                    className="h-full bg-slate-800 p-3 text-white rounded-md text-lg font-semibold 
                    hover:bg-slate-800 hover:cursor-pointer hover:scale-105 hover:bg-slate-900
                    tracking-widest"
                >
                    📋 Table
                </button></Link>
                <Link to="/comparison"><button
                    onClick={() => setDisplayMode("insights")}
                    className="h-full bg-slate-800 p-3 text-white rounded-md text-lg font-semibold 
                    hover:bg-slate-800 hover:cursor-pointer hover:scale-105 hover:bg-slate-900
                    tracking-widest"
                >
                    📊 Insights
                </button></Link>
                <Link to="/explore"><button
                    className="h-full bg-slate-800 p-3 text-white rounded-md text-lg font-semibold 
                    hover:bg-slate-800 hover:cursor-pointer hover:scale-105 hover:bg-slate-900
                    tracking-widest"
                >
                    📊 Map (Beta)
                </button></Link>
            </div>
        </header>
    )
}