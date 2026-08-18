import { SearchForm } from '../SearchForm.jsx'
import { PopulationHorizontalBarChart } from '../visualizations/Population'
import { AreaScatterPlot } from '../visualizations/Density'

export function InsightsView({countries, setCountries, setRecentSearches, countriesList, setNumberOfSlots}){
    

    return (
        <div className="flex gap-4 justify-around mt-10">

            <div className="w-[30%] max-w-[350px] max-h-[600px] flex flex-col overflow-y-auto gap-4 justify-start items-center p-1 bg-[#1E293B] rounded-lg">
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

            <div className="relative w-[69%] bg-[#1E293B] rounded-lg">

                <PopulationHorizontalBarChart 
                    countries = {countries}
                />

                <AreaScatterPlot 
                    countries = {countries}
                />

            </div>
        </div>
    )
}