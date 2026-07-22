export default function RecentSearches({recentSearches, searched}){
    return (
        <div id="recent-searches" className={`${recentSearches.length && !searched ? "" : "hidden"} w-[200px] mx-auto`}>
            <h2 className="text-center text-slate-200 font-semibold text-xl my-3">Recent Searches</h2>
            {recentSearches.map((item) => 
            <p key={item.code} className="text-center text-md text-slate-400">[ {item.code} {item.name} ]</p>)}        </div>
    )
}