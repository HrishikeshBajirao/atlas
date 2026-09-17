import { Link } from "react-router-dom"
import cardsViewScreenshot from "../../assets/background/cards-view-screenshot.png";

export function SelectDisplayMode({setDisplayMode}){
    return (
        <div className="mt-8 h-full text-slate-400 text-2xl mx-auto flex flex-wrap justify-center gap-10 relative overflow-hidden">

            {/* Screenshot */}
            <img
                src={cardsViewScreenshot}
                className="
                    absolute
                    -bottom-10
                    left-1/2
                    w-[100%]
                    max-w-none
                    -translate-x-1/2
                    rotate-[-3deg]
                    opacity-40
                    brightness-50
                    saturate-50
                    transition-all duration-500
                    group-hover:opacity-60
                    group-hover:scale-105
                "
            />

            {/* Fade over screenshot */}
            <div
                className="
                    absolute inset-0
                    bg-gradient-to-b
                    from-slate-900
                    via-slate-900/70
                    to-transparent
                "
            />

            <Link 
                to="/explore"
                className="mt-10 min-w-[50%] mx-50 pt-3 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer transition-transform duration-200 ease-in-out z-10"
                onClick={() => setDisplayMode("map")}
            >
                <h3 className="text-3xl text-center">🗺️ Interactive World Map (Beta)</h3>
            </Link>
            <Link 
                to="/comparison"
                className="mt-1 w-[25%] min-w-[350px] h-[60%] p-5 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer transition-transform duration-200 ease-in-out z-10"
                onClick={() => setDisplayMode("cards")}
            >
                <h3 className="text-3xl text-center mt-10">🃏 Compare Countries</h3>
                <p className="text-xl mt-4 text-center mt-6 w-[60%] mx-auto"> Explore countries side by side with detailed cards.</p>
            </Link>

            <Link 
                to="/comparison"
                className="mt-1 w-[25%] min-w-[350px] h-[60%] p-5 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer transition-transform duration-200 ease-in-out z-10"
                onClick={() => setDisplayMode("table")}
            >
                <h3 className="text-3xl text-center mt-10">📋 Compare Data</h3>
                <p className="text-xl mt-4 text-center mt-6"> Compare country attributes in a structured table.</p>
            </Link>

            <Link 
                to="/comparison"
                className="mt-1 w-[25%] min-w-[350px] h-[60%] p-5 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer transition-transform duration-200 ease-in-out z-10"
                onClick={() => setDisplayMode("insights")}
            >
                <h3 className="text-3xl text-center mt-10">📊 Explore Countries</h3>
                <p className="text-xl mt-4 text-center mt-6"> Discover patterns through interavtive visualizations.</p>
            </Link>
        </div>
    )
}