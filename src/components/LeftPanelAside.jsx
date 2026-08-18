import { SearchForm } from './SearchForm'
import { RecentSearches } from './RecentSearches'

export function LeftPanelAside({setNumberOfSlots, setCountries,countries, recentSearches, setRecentSearches, countriesList}){

    //add a new slot to the comparison panel
    const handleAddSlotClick = () => {
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
    }

    return (
        <aside className="shrink-0 w-1/5 border-r border-white">
            <div 
                className="w-full max-w-[350px] h-[70%] flex flex-col overflow-y-auto gap-4 
                justify-start items-center p-1 bg-[#1E293B]"
            >
                
                {/* "add comparison slot" button */}
                <button
                    className="block mx-auto my-3 bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium
                                transition duration-300 ease-in-out transform
                                hover:bg-emerald-500 hover:scale-105
                                active:scale-95 hover:cursor-pointer"
                    onClick={handleAddSlotClick}
                    >
                    + Add Country
                </button>

                {/* input search boxes */}
                {countries.map((country, index) => (
                    <SearchForm
                        key={index}
                        index={index}
                        setCountries={setCountries}
                        countryInput={country.countryInput}
                        setRecentSearches={setRecentSearches}
                        countriesList = {countriesList}
                        setNumberOfSlots={setNumberOfSlots}
                    />
                ))}
            </div>

            <RecentSearches 
                recentSearches = {recentSearches}
                setRecentSearches = {setRecentSearches}
                countries = {countries}
                setCountries = {setCountries}
                setNumberOfSlots = {setNumberOfSlots}
            />

        </aside>
    )
}