import cardsViewScreenshot from "../../assets/background/cards-view-screenshot.png";


{/* <div className="mt-15 text-slate-400 text-2xl mx-auto flex justify-center gap-5 relative">

<button 
    className="w-[350px] h-[200px] p-5 bg-slate-800 text-white border border-gray rounded-md 
    hover:bg-slate-900 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
    onClick={() => setDisplayMode("cards")}
>
    <h3 className="text-3xl">🃏 Compare Countries</h3>
    <p className="text-xl mt-4"> Explore countries side by side with detailed cards.</p>
</button> */}

export function SelectDisplayMode({setDisplayMode}){
    return (
        <div className="mt-8 h-full text-slate-400 text-2xl mx-auto flex justify-center gap-10 relative overflow-hidden">

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


            <div 
                className="mt-10 w-[25%] min-w-[350px] h-[60%] p-5 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer transition-transform duration-200 ease-in-out z-10"
                onClick={() => setDisplayMode("cards")}
            >
                <h3 className="text-3xl text-center mt-10">🃏 Compare Countries</h3>
                <p className="text-xl mt-4 text-center mt-6 w-[60%] mx-auto"> Explore countries side by side with detailed cards.</p>
            </div>

            <div 
                className="mt-10 w-[25%] min-w-[350px] h-[60%] p-5 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer transition-transform duration-200 ease-in-out z-10"
                onClick={() => setDisplayMode("table")}
            >
                <h3 className="text-3xl text-center mt-10">📋 Compare Data</h3>
                <p className="text-xl mt-4 text-center mt-6"> Compare country attributes in a structured table.</p>
            </div>

            <div 
                className="mt-10 w-[25%] min-w-[350px] h-[60%] p-5 bg-slate-800 text-white border border-gray rounded-md 
                hover:bg-slate-900 hover:cursor-pointer transition-transform duration-200 ease-in-out z-10"
                onClick={() => setDisplayMode("insights")}
            >
                <h3 className="text-3xl text-center mt-10">📊 Explore Countries</h3>
                <p className="text-xl mt-4 text-center mt-6"> Discover patterns through interavtive visualizations.</p>
            </div>
        </div>
    )
}