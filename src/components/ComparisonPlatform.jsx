import { Header } from './Header'
import { LeftPanelAside } from './LeftPanelAside'
import { TableView } from './views/TableView'
import { InsightsView } from './views/InsightsView'
import { CardsView } from './views/CardsView'

export function ComparisonPlatform({
    countries, setCountries, recentSearches, setRecentSearches, countriesList, setNumberOfSlots, displayMode, setDisplayMode
}){

    return (
        <div className="h-screen bg-slate-900 flex flex-col">
            
            <Header
                setDisplayMode = {setDisplayMode}
            />

            <div className="flex flex-1 min-h-0 h-[90%]">

                <LeftPanelAside
                    setNumberOfSlots = {setNumberOfSlots}
                    setCountries = {setCountries}
                    countries = {countries}
                    recentSearches = {recentSearches}
                    setRecentSearches = {setRecentSearches}
                    countriesList = {countriesList}
                />

                <main className="w-4/5 bg-white overflow-y-auto">
                
                    {
                        displayMode === "cards" ?
                            <div className="country-blocks flex justify-center gap-10 flex-wrap">
                                {[...Array(countries.length)].map((_, index) => (
                                <CardsView
                                    key = {index}
                                    index = {index}
                                    countries = {countries}
                                    setCountries = {setCountries}
                                    setRecentSearches = {setRecentSearches}
                                    setNumberOfSlots = {setNumberOfSlots}
                                    countriesList = {countriesList}
                                />
                                ))}
                            </div>
                        : displayMode === "table" ?
                            <TableView 
                                countries = {countries}
                                setCountries = {setCountries}
                                setRecentSearches = {setRecentSearches}
                                countriesList = {countriesList}
                                setNumberOfSlots = {setNumberOfSlots}
                            />
                        :
                            <InsightsView
                                countries = {countries}
                                setCountries = {setCountries}
                                setRecentSearches = {setRecentSearches}
                                countriesList = {countriesList}
                                setNumberOfSlots = {setNumberOfSlots}
                            />
                    }

                </main>
            </div>
        </div>
    )

}