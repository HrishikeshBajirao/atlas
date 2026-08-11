export function SelectDisplayMode({displayMode, setDisplayMode}){
    return (
        <div className="mt-15 text-slate-400 text-2xl mx-auto flex justify-center gap-5 relative">
            <input 
                id="cards-display" 
                type="radio" 
                name="display-type" 
                value="cards" 
                onChange={(e) => setDisplayMode(e.target.value)}
                checked={displayMode === 'cards'}
                className="appearance-none w-8 h-8 rounded-lg bg-slate-700 font-semibold 
                checked:after:content-['✓'] checked:text-white checked:text-xl checked:flex checked:justify-center checked:items-center"
            />
            <label htmlFor="cards-display">🃏Cards</label>
            <input 
                id="table-display" 
                type="radio" 
                name="display-type" 
                value="table" 
                onChange={(e) => setDisplayMode(e.target.value)}
                checked={displayMode === 'table'}
                className="appearance-none w-8 h-8 rounded-lg bg-slate-700 font-semibold 
                checked:after:content-['✓'] checked:text-white checked:text-xl checked:flex checked:justify-center checked:items-center"
            />
            <label htmlFor="insights-display">📋Table</label>
            <input 
                id="insights-display" 
                type="radio" 
                name="display-type" 
                value="insights" 
                onChange={(e) => setDisplayMode(e.target.value)}
                checked={displayMode === 'insights'}
                className="appearance-none w-8 h-8 rounded-lg bg-slate-700 font-semibold 
                checked:after:content-['✓'] checked:text-white checked:text-xl checked:flex checked:justify-center checked:items-center"
            />
            <label htmlFor="insights-display">Insights</label>
        </div>
    )
}