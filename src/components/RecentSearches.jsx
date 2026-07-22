import fetchCountryData from "../services/fetchCountryData.js"

export default function RecentSearches({searched, recentSearches, setRecentSearches,
    setSearched, setLoading, setCountryInfo})
{    
    const handleRecentSearchClick = (name) => {
        fetchCountryData(
            name,
            setSearched,
            setLoading,
            setCountryInfo,
            setRecentSearches
        );
    }

    const handleDeleteRecent = (code) => {
        setRecentSearches((currentRecentSearches) => [
            ...currentRecentSearches
                .filter((obj) => obj.code !== code)
        ])
    }

    return (
        <div id="recent-searches" className={`${recentSearches.length && !searched ? "" : "hidden"} w-[200px] mx-auto`}>
            <h2 className="text-center text-slate-200 font-semibold text-xl my-3">Recent Searches</h2>
            {recentSearches.map((item) => (
                <div key={item.code} className="recent-search-item flex justify-center items-center">
                    <button className="text-center text-md text-slate-400 hover:cursor-pointer hover:scale-105"
                        onClick={() => handleRecentSearchClick(item.name)}>
                        [ {item.code} {item.name} ]
                    </button>
                    <button 
                        type="button"
                        className="bg-inherit text-slate-500 text-lg mx-3 pt-1 font-semibold 
                            hover:cursor-pointer hover:scale-105 hover:text-slate-300"
                        onClick={() => handleDeleteRecent(item.code)}>
                        X
                    </button>
                </div>
                )
            )}
        </div>
    )
}