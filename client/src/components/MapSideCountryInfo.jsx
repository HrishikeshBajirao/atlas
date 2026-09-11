import { GdpOverTheYears } from './visualizations/GdpOverTheYears.jsx'

export function MapSideCountryInfo({setIsSelected, isCountryLoading, mapCountrySelected, setMapCountrySelected}){
    console.log(mapCountrySelected)
    return (
        <div className="absolute right-0 top-0 w-1/2 h-full bg-slate-800 overflow-y-auto">

        {isCountryLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 z-10">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Loading Data…</p>
                </div>
            </div>
        ) : (
            <>
            <button type="button" 
                className="text-red-500 text-md bg-red-200 py-1 px-2 rounded-md font-bold absolute top-2 left-2  
                    hover:scale-105 hover:text-red-800 hover:cursor-pointer"
                    onClick={() => {
                        setIsSelected(false)
                        setMapCountrySelected(null)
                    }}
                >X</button>

                <div className="mt-8 p-5 text-white text-sm">
                    <div className="w-60 h-30 flex items-center justify-center mx-auto">
                        <img 
                        src={mapCountrySelected.countryInfo.flag.svg} 
                        alt={`Flag of ${mapCountrySelected.countryInfo.name}`} 
                        className="max-w-full max-h-full object-contain mx-auto rounded-lg" 
                        />
                    </div>
                    <p className="text-center text-2xl mt-3">{mapCountrySelected.countryInfo.name}</p>
                    <p className="text-center text-md">{mapCountrySelected.countryInfo.region}</p>

                    <h2 className="text-xl font-semibold text-left tracking-wide mt-5 mb-3">AT A GLANCE</h2>
                    <p className="pl-3 my-1.5 tracking-wider">Capital: {mapCountrySelected.countryInfo.capital}</p>
                    <p className="pl-3 my-1.5 tracking-wider">Population: {mapCountrySelected.countryInfo.population.toLocaleString()}</p>
                    <p className="pl-3 my-1.5 tracking-wider">Area: {mapCountrySelected.countryInfo.area.toLocaleString()} sq.km</p>
                    <p className="pl-3 my-1.5 tracking-wider">Density: {(mapCountrySelected.countryInfo.population / mapCountrySelected.countryInfo.area).toFixed(2)}</p>
                    <p className="pl-3 my-1.5 tracking-wider">Currency: {mapCountrySelected.countryInfo.currency[0]}</p>
                    <p className="pl-3 my-1.5 tracking-wider">Languages: {mapCountrySelected.countryInfo.languages.join(", ")}</p>

                    <h2 className="text-xl font-semibold text-left tracking-wide mt-5 mb-3">ECONOMY</h2>
                    <p className="pl-3 my-1.5 tracking-wider">GDP ({mapCountrySelected.gdp.at(-1).Year}): {Number(mapCountrySelected.gdp.at(-1).GDP).toLocaleString()}</p>
                    <p className="pl-3 my-1.5 tracking-wider">GDP per capita ({mapCountrySelected.gdp.at(-1).Year}): {(mapCountrySelected.gdp.at(-1).GDP / mapCountrySelected.countryInfo.population).toLocaleString()}</p>

                    <div className="ml-3 my-3 py-3 text-black bg-white rounded-md flex justify-center items-center">
                    <GdpOverTheYears 
                        countries = {[mapCountrySelected]}
                    />
                    </div>

                    <h2 className="text-xl font-semibold text-left tracking-wide mt-5 mb-3 ">POPULATION</h2>

                </div>
                </>
        )}

        </div>
    )
}