export function SelectDisplayMode({setDisplayMode}){
    return (
        <div className="mt-15 text-slate-400 text-2xl mx-auto flex justify-center gap-5 relative">

            <button 
                className="w-[350px] h-[200px] p-5 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
                onClick={() => setDisplayMode("cards")}
            >
                <h3 className="text-3xl">🃏 Compare Countries</h3>
                <p className="text-xl mt-4"> Explore countries side by side with detailed cards.</p>
            </button>

            <button 
                className="w-[350px] h-[200px] p-5 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
                onClick={() => setDisplayMode("table")}
            >
                <h3 className="text-3xl">📋 Compare Data</h3>
                <p className="text-xl mt-4"> Compare country attributes in a structured table.</p>
            </button>

            <button 
                className="w-[350px] h-[200px] p-5 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
                onClick={() => setDisplayMode("insights")}
            >
                <h3 className="text-3xl">📊 Explore Countries</h3>
                <p className="text-xl mt-4"> Discover patterns through interavtive visualizations.</p>
            </button>
        </div>
    )
}