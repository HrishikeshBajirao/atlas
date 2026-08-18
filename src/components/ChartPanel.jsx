import { useState } from 'react'

export function ChartPanel({chartName, chart: Chart, countries}){
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="w-full relative">
            <button 
                onClick={() => setExpanded((curr) => !curr)}
                className="w-full text-2xl p-5 border border-2-black"
            >{chartName}</button>
            <div>
                {expanded && <Chart countries={countries} />}
            </div>
        </div>
    )
}