import { Header } from './Header'
import { LeftPanelAside } from './LeftPanelAside'
import { TableView } from './views/TableView'
import { InsightsView } from './views/InsightsView'

export function ComparisonPlatform({
    countries, setCountries, recentSearches, setRecentSearches, countriesList, setNumberOfSlots, displayMode, setDisplayMode
}){

    return (
        <div className="h-screen bg-slate-900">
            
            <Header
                setDisplayMode = {setDisplayMode}
            />

            <div className="flex h-[90%]">

                <LeftPanelAside
                    setNumberOfSlots = {setNumberOfSlots}
                    setCountries = {setCountries}
                    countries = {countries}
                    recentSearches = {recentSearches}
                    setRecentSearches = {setRecentSearches}
                    countriesList = {countriesList}
                />

                <main className="w-4/5 bg-white">
                
                    {
                        displayMode === "cards" ?
                            <h1>cards</h1>
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