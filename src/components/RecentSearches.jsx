import { getCountry } from "../data/restcountries.js"

export function RecentSearches({recentSearches, setRecentSearches,
    countries, setCountries, setNumberOfSlots})
{    
    const handleRecentSearchItemClick = async (code) => {

        //see if the select recent search item is already in the view
        if(countries.find((country) => country.countryInfo.alpha3Code === code)){
            alert(`This country is already shown`)
            return
        }
        
        // get the index of a free slot
        let index = -1
        index = countries.findIndex((slot) => !slot.searched)
        //return if all slots are full
        if(index === -1){
            setNumberOfSlots((currSlots) => currSlots + 1)
            setCountries((currCountries) => {
                return [...currCountries,
                    {
                        countryInput: "",
                        loading: false,
                        searched: false,
                        countryInfo: null
                    }
                ]
            })
            index = countries.length
        }

        //set the loading, searched and countryInfo values of the free slot index to default values
        setCountries((currCountries) => {
            const newCountries = [...currCountries]
            newCountries[index] = {...newCountries[index], countryInput:name, searched:true, loading: true, countryInfo:null}
            return newCountries
        })
    
        //fetch the country data and set the countries[index] to the fetched data
        try {
            const foundCountry = await getCountry(code); 
            // console.log(foundCountry)
            setCountries((currCountries) => {
                const newCountries = [...currCountries]
                newCountries[index] = {...newCountries[index], countryInput: foundCountry.name, countryInfo: foundCountry}
                return newCountries
            })
            if(foundCountry){
                setRecentSearches((currentRecentSearches) => [
                    { name: foundCountry.name, code: foundCountry.alpha3Code },
                    ...currentRecentSearches
                    .filter((item) => item.name !== foundCountry.name)
                    .slice(0, 4),
                ]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCountries((currCountries) => {
                const newCountries = [...currCountries]
                newCountries[index] = {...newCountries[index], loading: false}
                return newCountries
            })
        }
    }

    const handleDeleteRecent = (code) => {
        setRecentSearches((currentRecentSearches) => [
            ...currentRecentSearches
                .filter((obj) => obj.code !== code)
        ])
    }

    return (
        <div id="recent-searches" className={` w-full mx-auto mt-2`}>
            <h2 className="text-center text-slate-300 font-semibold text-xl my-2">Recents  
                <button 
                    className={`${recentSearches.length ? "" : "hidden"} text-sm ml-2 font-normal text-red-300 hover:cursor-pointer hover:scale-105`}
                    onClick={() => setRecentSearches([])}
                >[ clear ]</button>
            </h2>
            {recentSearches.map((item) => (
                <div key={item.code} className="recent-search-item flex justify-center items-center">
                    <button className="text-center text-sm text-slate-300 hover:cursor-pointer hover:scale-105"
                        onClick={() => handleRecentSearchItemClick(item.code)}>
                        {item.code} {item.name.length > 20 ? item.name.slice(0, 21) + "..." : item.name}
                    </button>
                    <button 
                        type="button"
                        className="bg-inherit text-lg text-slate-500 mx-3 font-semibold 
                            hover:cursor-pointer hover:scale-105 hover:text-red-400"
                        onClick={() => handleDeleteRecent(item.code)}>
                        [X]
                    </button>
                </div>
                )
            )}
        </div>
    )
}