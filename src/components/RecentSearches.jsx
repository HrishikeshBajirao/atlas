import getCountry from "../api/restcountries"

export default function RecentSearches({searched, recentSearches, setRecentSearches,
    setSearched, setLoading, setCountryInfo})
{    
    const handleRecentSearchItemClick = async (name) => {
        setSearched(true);
        setLoading(true);
        setCountryInfo(null);
    
        try {
            const foundCountry = await getCountry(name); 
            setCountryInfo(foundCountry);
            console.log(foundCountry);
            if(foundCountry){
            setRecentSearches((currentRecentSearches) => [
                { name: foundCountry.names.common, code: foundCountry.codes.alpha_2 },
                ...currentRecentSearches
                .filter((item) => item.name !== foundCountry.names.common)
                .slice(0, 4),
            ]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
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
                        onClick={() => handleRecentSearchItemClick(item.name)}>
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