import { useState } from 'react'

export function ChartPanel({icon, chartName, chart: Chart, countries}){
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="w-full relative">
            <button
                onClick={() => setExpanded((curr) => !curr)}
                className={`
                    group relative w-full flex items-center justify-between
                    px-6 py-6
                    text-left text-xl font-semibold text-slate-200
                    bg-slate-800
                    border border-slate-700
                    rounded-xl
                    shadow-sm
                    transition-all duration-300 ease-out
                    hover:bg-slate-750
                    hover:border-slate-600
                    hover:shadow-md
                    hover: cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    ${expanded ? "rounded-b-none border-blue-500/40" : ""}
                `}
            >
                <span className="flex items-center gap-3 transition-all duration-300 ease-out group-hover:transalte-x-1">
                    {icon}
                    <span className="ml-2 group-hover:text-white">{chartName}</span>
                </span>

                <span
                    className={`
                        relative
                        w-8 h-8
                        rounded-full
                        text-slate-400
                        text-3xl
                        bg-slate-700
                        transition-transform duration-300
                        group-hover:text-white
                        transition-all duration-300 ease-out group-hover:transalte-x-1
                        ${expanded ? "rotate-90" : ""}
                    `}
                >
                    <span className="absolute -top-[20%] right-[35%]">›</span>
                </span>
            </button>
            <div>
                {expanded && <Chart countries={countries} />}
            </div>
        </div>
    )
}