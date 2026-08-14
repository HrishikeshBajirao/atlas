import { SearchForm } from '../SearchForm.jsx'
import { PopulationHorizontalBarChart } from '../visualizations/Population'
import { AreaScatterPlot } from '../visualizations/Area'

export function InsightsView({countries, setCountries, setRecentSearches, countriesList, setNumberOfSlots}){
    

    return (
        <div className="relative">

            <div className="max-w-[800px] mx-auto my-5 flex flex-wrap gap-4 justify-center">
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

            <PopulationHorizontalBarChart 
                countries = {countries}
            />

            <AreaScatterPlot 
                countries = {countries}
            />
        </div>
    )
}